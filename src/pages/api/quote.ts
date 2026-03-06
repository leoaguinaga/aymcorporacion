import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();

        const {
            name,
            company,
            service,
            phone,
            message,
        } = body ?? {};

        if (!name || !phone) {
            return new Response(
                JSON.stringify({
                    ok: false,
                    error: "Faltan campos obligatorios",
                }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        const SHEETS_WEBAPP_URL = import.meta.env.SHEETS_WEBAPP_URL || process.env.SHEETS_WEBAPP_URL;
        const SHEETS_TOKEN = import.meta.env.SHEETS_TOKEN || process.env.SHEETS_TOKEN;

        // 1) Guardar en Google Sheets vía Apps Script
        if (SHEETS_WEBAPP_URL) {
            const url = new URL(SHEETS_WEBAPP_URL);
            if (SHEETS_TOKEN) url.searchParams.set("token", SHEETS_TOKEN);

            const sheetsRes = await fetch(url.toString(), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    createdAt: new Date().toISOString(),
                    name,
                    company,
                    service,
                    phone,
                    message,
                }),
            }).catch(e => {
                console.error("Sheets fetch network error:", e);
                return null;
            });

            if (sheetsRes && !sheetsRes.ok) {
                console.error("Sheets write failed:", sheetsRes.status, await sheetsRes.text());
                console.warn("Failed to save to Google Sheets, but continuing to email...");
            } else if (!sheetsRes) {
                console.warn("Failed to save to Google Sheets (no response), but continuing to email...");
            }
        }

        // 2) Enviar correo de notificación
        const EMAIL_SERVICE = import.meta.env.EMAIL_SERVICE || process.env.EMAIL_SERVICE;
        const EMAIL_USER = import.meta.env.EMAIL_USER || process.env.EMAIL_USER;
        const EMAIL_PASSWORD = import.meta.env.EMAIL_PASSWORD || process.env.EMAIL_PASSWORD;
        const EMAIL_FROM_NAME = import.meta.env.EMAIL_FROM_NAME || process.env.EMAIL_FROM_NAME;
        const EMAIL_FROM_ADDRESS = import.meta.env.EMAIL_FROM_ADDRESS || process.env.EMAIL_FROM_ADDRESS;
        const EMAIL_END_ADDRESS = import.meta.env.EMAIL_END_ADDRESS || process.env.EMAIL_END_ADDRESS || EMAIL_USER;

        if (EMAIL_SERVICE && EMAIL_USER && EMAIL_PASSWORD) {
            const transporter = nodemailer.createTransport({
                service: EMAIL_SERVICE,
                auth: {
                    user: EMAIL_USER,
                    pass: EMAIL_PASSWORD,
                },
            });

            await transporter.sendMail({
                from: `"${EMAIL_FROM_NAME}" <${EMAIL_FROM_ADDRESS}>`,
                to: EMAIL_END_ADDRESS,
                subject: "Nueva solicitud desde la web",
                html: `
            <h2>Nueva solicitud de cotización</h2>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Empresa:</strong> ${company || "-"}</p>
            <p><strong>Servicio:</strong> ${service || "-"}</p>
            <p><strong>Teléfono:</strong> ${phone}</p>
            <p><strong>Mensaje:</strong> ${message || "-"}</p>
            <hr />
            <p>Solicitud enviada desde el formulario web.</p>
          `,
            });
        } else {
            console.warn("Email credentials missing in .env - Skipping email delivery");
        }

        return new Response(
            JSON.stringify({
                ok: true,
                message: "Solicitud enviada correctamente",
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        console.error("API /api/quote error:", error);

        return new Response(
            JSON.stringify({
                ok: false,
                error: error instanceof Error ? error.message : "Error interno del servidor",
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
};
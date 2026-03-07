import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

export const prerender = false;

function required(v: unknown) {
    return typeof v === "string" && v.trim().length > 0;
}

function safeStr(v: unknown) {
    return typeof v === "string" ? v.trim() : String(v ?? "").trim();
}

export const POST: APIRoute = async ({ request }) => {
    try {
        const contentType = request.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
            return new Response(JSON.stringify({ ok: false, error: "Expected application/json" }), {
                status: 415,
                headers: { "Content-Type": "application/json" },
            });
        }

        const body = await request.json();

        const name = safeStr(body.name);
        const company = safeStr(body.company);
        const service = safeStr(body.service);
        const phone = safeStr(body.phone);
        const message = safeStr(body.message);

        if (!required(name) || !required(phone)) {
            return new Response(JSON.stringify({ ok: false, error: "Name and phone are required" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const EMAIL_SERVICE = import.meta.env.EMAIL_SERVICE;
        const EMAIL_USER = import.meta.env.EMAIL_USER;
        const EMAIL_PASSWORD = import.meta.env.EMAIL_PASSWORD;
        const EMAIL_FROM_ADDRESS = import.meta.env.EMAIL_FROM_ADDRESS;
        const EMAIL_FROM_NAME = import.meta.env.EMAIL_FROM_NAME;

        if (!EMAIL_SERVICE || !EMAIL_USER || !EMAIL_PASSWORD || !EMAIL_FROM_ADDRESS || !EMAIL_FROM_NAME) {
            return new Response(
                JSON.stringify({
                    ok: false,
                    error:
                        "Email env vars missing. Required: EMAIL_SERVICE, EMAIL_USER, EMAIL_PASSWORD, EMAIL_FROM_ADDRESS, EMAIL_FROM_NAME",
                }),
                { status: 500, headers: { "Content-Type": "application/json" } }
            );
        }

        const transporter = nodemailer.createTransport({
            service: EMAIL_SERVICE,
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASSWORD
            }
        });

        const from = `"${EMAIL_FROM_NAME}" <${EMAIL_FROM_ADDRESS}>`;

        await transporter.sendMail({
            from,
            to: EMAIL_USER,
            subject: "Nueva solicitud de cotización - AYM",
            text: `
            Nueva solicitud de cotización: \n\n
            Nombre: ${name}\n\
            Empresa: ${company}\n\
            Servicio: ${service}\n\
            Teléfono: ${phone}\n\
            Mensaje: ${message}
            `
        })

        const SHEETS_WEBAPP_URL = import.meta.env.SHEETS_WEBAPP_URL;
        const SHEETS_TOKEN = import.meta.env.SHEETS_TOKEN;

        if (SHEETS_WEBAPP_URL) {
            const url = new URL(SHEETS_WEBAPP_URL);
            if (SHEETS_TOKEN) url.searchParams.set("token", SHEETS_TOKEN);

            const res = await fetch(url.toString(), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    createdAt: new Date().toISOString(),
                    name,
                    company,
                    service,
                    phone,
                    message
                }),
            });
        }

        return new Response(JSON.stringify({ ok: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (err) {
        console.error("/api/quote error:", err);
        return new Response(JSON.stringify({ ok: false, error: "Server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
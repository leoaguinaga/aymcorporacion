import type { APIRoute } from "astro";

const site = "https://aymcorporacion.com";

const routes = [
	"/",
	"/venta-transporte-agregados",
	"/alquiler-maquinaria-pesada",
	"/movimiento-tierras",
	"/servicios-construccion",
];

export const GET: APIRoute = () => {
	const now = new Date().toISOString();

	const urls = routes
		.map(
			(route) => `
  <url>
    <loc>${site}${route}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === "/" ? "1.0" : "0.8"}</priority>
  </url>`
		)
		.join("");

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;

	return new Response(xml, {
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
		},
	});
};

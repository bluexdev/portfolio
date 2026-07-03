/**
 * Schema de Sanity — proyecto del portfolio.
 * Objetos planos compatibles con defineType; el paquete `sanity`
 * se añade al embeber el Studio (ver README del proyecto).
 */
const project = {
  name: "project",
  title: "Proyecto",
  type: "document",
  fields: [
    { name: "title", title: "Título", type: "string", validation: (r: { required: () => unknown }) => r.required() },
    { name: "titleEn", title: "Título (EN)", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
    { name: "tag", title: "Tag", type: "string" },
    {
      name: "status",
      title: "Estado",
      type: "string",
      options: { list: ["PRODUCCIÓN", "EN DESARROLLO", "EMPRESA", "PERSONAL"] },
    },
    { name: "summary", title: "Resumen", type: "text" },
    { name: "summaryEn", title: "Resumen (EN)", type: "text" },
    { name: "bullets", title: "Bullets", type: "array", of: [{ type: "string" }] },
    { name: "bulletsEn", title: "Bullets (EN)", type: "array", of: [{ type: "string" }] },
    { name: "stack", title: "Stack", type: "array", of: [{ type: "string" }] },
    { name: "hasDetail", title: "Con detalle (VER MÁS)", type: "boolean", initialValue: false },
    { name: "longDesc", title: "Descripción larga", type: "text" },
    { name: "longDescEn", title: "Descripción larga (EN)", type: "text" },
    { name: "features", title: "Características", type: "array", of: [{ type: "string" }] },
    { name: "featuresEn", title: "Características (EN)", type: "array", of: [{ type: "string" }] },
    {
      name: "metrics",
      title: "Métricas",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "k", title: "Clave", type: "string" },
            { name: "v", title: "Valor", type: "string" },
          ],
        },
      ],
    },
    {
      name: "impactMetrics",
      title: "Métricas de impacto opcionales",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "k", title: "Clave", type: "string" },
            { name: "v", title: "Valor", type: "string" },
          ],
        },
      ],
    },
    { name: "repoUrl", title: "Repo", type: "url" },
    { name: "demoUrl", title: "Demo", type: "url" },
    { name: "heroImage", title: "Imagen principal", type: "image", options: { hotspot: true } },
    { name: "gallery", title: "Galería", type: "array", of: [{ type: "image", options: { hotspot: true } }] },
    {
      name: "previewVariant",
      title: "Variante de preview",
      type: "string",
      options: { list: ["shop", "kanban", "chat", "dash", "rooms", "flow"] },
    },
    { name: "hue", title: "Hue (color del preview)", type: "number" },
    { name: "order", title: "Orden", type: "number" },
  ],
};

export default project;

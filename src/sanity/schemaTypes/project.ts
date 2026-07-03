import { defineArrayMember, defineField, defineType } from "sanity";

const metricField = defineArrayMember({
  type: "object",
  name: "metric",
  title: "Metrica",
  fields: [
    defineField({
      name: "k",
      title: "Etiqueta",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "v",
      title: "Valor",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "k", subtitle: "v" },
    prepare({ title, subtitle }) {
      return {
        title: title || "Metrica",
        subtitle: subtitle || "Sin valor",
      };
    },
  },
});

const project = defineType({
  name: "project",
  title: "Proyecto",
  type: "document",
  groups: [
    { name: "content", title: "Contenido", default: true },
    { name: "media", title: "Imagenes" },
    { name: "metrics", title: "Metricas" },
    { name: "english", title: "Ingles" },
    { name: "links", title: "Links" },
    { name: "system", title: "Sistema" },
  ],
  fieldsets: [
    {
      name: "drawer",
      title: "Drawer VER MAS",
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Titulo",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().min(3),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tag",
      title: "Tag corto",
      type: "string",
      group: "content",
      description: "Ejemplo: ECOMMERCE, IA, DEVOPS.",
      validation: (rule) => rule.required().max(18),
    }),
    defineField({
      name: "status",
      title: "Estado",
      type: "string",
      group: "content",
      options: {
        layout: "radio",
        direction: "horizontal",
        list: [
          { title: "Produccion", value: "PRODUCCIÓN" },
          { title: "En desarrollo", value: "EN DESARROLLO" },
          { title: "Empresa", value: "EMPRESA" },
          { title: "Personal", value: "PERSONAL" },
        ],
      },
      initialValue: "PERSONAL",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Resumen",
      type: "text",
      rows: 3,
      group: "content",
      validation: (rule) => rule.required().min(30).max(220),
    }),
    defineField({
      name: "bullets",
      title: "Bullets principales",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.required().min(2).max(5),
    }),
    defineField({
      name: "stack",
      title: "Stack",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: "hasDetail",
      title: "Activar drawer VER MAS",
      type: "boolean",
      group: "content",
      fieldset: "drawer",
      initialValue: false,
    }),
    defineField({
      name: "longDesc",
      title: "Descripcion larga",
      type: "text",
      rows: 5,
      group: "content",
      fieldset: "drawer",
      hidden: ({ parent }) => !parent?.hasDetail,
    }),
    defineField({
      name: "features",
      title: "Caracteristicas del drawer",
      type: "array",
      group: "content",
      fieldset: "drawer",
      of: [defineArrayMember({ type: "string" })],
      hidden: ({ parent }) => !parent?.hasDetail,
    }),
    defineField({
      name: "heroImage",
      title: "Screenshot principal",
      type: "image",
      group: "media",
      description: "Se muestra en la card y como preview principal del drawer.",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      title: "Galeria del drawer",
      type: "array",
      group: "media",
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: "metrics",
      title: "Metricas tecnicas visibles",
      type: "array",
      group: "metrics",
      of: [metricField],
      description: "Datos compactos tipo rol, stack o alcance.",
    }),
    defineField({
      name: "impactMetrics",
      title: "Metricas de impacto opcionales",
      type: "array",
      group: "metrics",
      of: [metricField],
      description: "Solo aparecen si Ajustes -> Mostrar metricas de impacto esta activo.",
    }),
    defineField({
      name: "repoUrl",
      title: "Repo",
      type: "url",
      group: "links",
    }),
    defineField({
      name: "demoUrl",
      title: "Demo",
      type: "url",
      group: "links",
    }),
    defineField({
      name: "titleEn",
      title: "Titulo (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "summaryEn",
      title: "Resumen (EN)",
      type: "text",
      rows: 3,
      group: "english",
    }),
    defineField({
      name: "bulletsEn",
      title: "Bullets (EN)",
      type: "array",
      group: "english",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "longDescEn",
      title: "Descripcion larga (EN)",
      type: "text",
      rows: 5,
      group: "english",
    }),
    defineField({
      name: "featuresEn",
      title: "Caracteristicas (EN)",
      type: "array",
      group: "english",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "previewVariant",
      title: "Variante de preview procedural",
      type: "string",
      group: "system",
      options: {
        layout: "radio",
        list: ["shop", "kanban", "chat", "dash", "rooms", "flow"],
      },
      initialValue: "dash",
    }),
    defineField({
      name: "hue",
      title: "Hue del preview",
      type: "number",
      group: "system",
      validation: (rule) => rule.min(0).max(360),
    }),
    defineField({
      name: "order",
      title: "Orden",
      type: "number",
      group: "system",
      validation: (rule) => rule.required().integer().min(0),
    }),
  ],
  orderings: [
    {
      title: "Orden del portfolio",
      name: "portfolioOrder",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      status: "status",
      tag: "tag",
      stack: "stack",
      order: "order",
      media: "heroImage",
    },
    prepare({ title, status, tag, stack, order, media }) {
      const tech = Array.isArray(stack) ? stack.slice(0, 3).join(" / ") : "";
      return {
        title: `${typeof order === "number" ? `${order + 1}. ` : ""}${title || "Proyecto sin titulo"}`,
        subtitle: [status, tag, tech].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});

export default project;

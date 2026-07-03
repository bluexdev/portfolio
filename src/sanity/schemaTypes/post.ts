import { defineArrayMember, defineField, defineType } from "sanity";

const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  groups: [
    { name: "content", title: "Contenido", default: true },
    { name: "media", title: "Imagen" },
    { name: "english", title: "Ingles" },
    { name: "publish", title: "Publicacion" },
    { name: "system", title: "Sistema" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Titulo",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().min(5),
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
      name: "glyph",
      title: "Glyph arcade",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "▚ Pixel", value: "▚" },
          { title: "◆ Diamante", value: "◆" },
          { title: "⚙ Gear", value: "⚙" },
          { title: "✦ Star", value: "✦" },
        ],
      },
      initialValue: "▚",
    }),
    defineField({
      name: "tag",
      title: "Tag",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(18),
    }),
    defineField({
      name: "excerpt",
      title: "Extracto",
      type: "text",
      rows: 3,
      group: "content",
      validation: (rule) => rule.required().min(40).max(220),
    }),
    defineField({
      name: "body",
      title: "Cuerpo",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "block" })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "coverImage",
      title: "Imagen de portada",
      type: "image",
      group: "media",
      options: { hotspot: true },
    }),
    defineField({
      name: "titleEn",
      title: "Titulo (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "excerptEn",
      title: "Extracto (EN)",
      type: "text",
      rows: 3,
      group: "english",
    }),
    defineField({
      name: "publishedAt",
      title: "Fecha de publicacion",
      type: "datetime",
      group: "publish",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "readingTime",
      title: "Tiempo de lectura",
      type: "string",
      group: "publish",
      description: "Ejemplo: 6 min.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Orden interno",
      type: "number",
      group: "system",
      validation: (rule) => rule.integer().min(0),
    }),
  ],
  preview: {
    select: {
      title: "title",
      tag: "tag",
      publishedAt: "publishedAt",
      readingTime: "readingTime",
      media: "coverImage",
    },
    prepare({ title, tag, publishedAt, readingTime, media }) {
      const date = publishedAt ? new Date(publishedAt).toISOString().slice(0, 10) : "sin fecha";
      return {
        title: title || "Post sin titulo",
        subtitle: [tag, date, readingTime].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});

export default post;

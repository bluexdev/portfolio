import { defineArrayMember, defineField, defineType } from "sanity";

const experience = defineType({
  name: "experience",
  title: "Experiencia",
  type: "document",
  groups: [
    { name: "content", title: "Contenido", default: true },
    { name: "english", title: "Ingles" },
    { name: "system", title: "Sistema" },
  ],
  fields: [
    defineField({
      name: "role",
      title: "Rol",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "org",
      title: "Organizacion",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Ubicacion",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "bullets",
      title: "Bullets",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.required().min(1).max(5),
    }),
    defineField({
      name: "roleEn",
      title: "Rol (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "locationEn",
      title: "Ubicacion (EN)",
      type: "string",
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
      role: "role",
      org: "org",
      location: "location",
      order: "order",
    },
    prepare({ role, org, location, order }) {
      return {
        title: `${typeof order === "number" ? `${order + 1}. ` : ""}${role || "Rol sin titulo"}`,
        subtitle: [org, location].filter(Boolean).join(" · "),
      };
    },
  },
});

export default experience;

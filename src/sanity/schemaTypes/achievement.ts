import { defineField, defineType } from "sanity";

const achievement = defineType({
  name: "achievement",
  title: "Logro",
  type: "document",
  groups: [
    { name: "content", title: "Contenido", default: true },
    { name: "system", title: "Sistema" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Nombre",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "issuer",
      title: "Emisor",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tier",
      title: "Rareza",
      type: "string",
      group: "content",
      options: {
        layout: "radio",
        direction: "horizontal",
        list: [
          { title: "Legendario", value: "legend" },
          { title: "Epico", value: "epic" },
          { title: "Comun", value: "std" },
        ],
      },
      initialValue: "std",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      group: "content",
      options: {
        layout: "dropdown",
        list: ["SEC", "IA", "UX", "CODE", "DATA", "NET", "OPS", "DB", "QA", "AGILE"],
      },
      initialValue: "CODE",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "inProgress",
      title: "En curso",
      type: "boolean",
      group: "content",
      initialValue: false,
    }),
    defineField({
      name: "progress",
      title: "Progreso (0-100)",
      type: "number",
      group: "content",
      hidden: ({ parent }) => !parent?.inProgress,
      validation: (rule) => rule.min(0).max(100),
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
      name: "name",
      issuer: "issuer",
      tier: "tier",
      category: "category",
      inProgress: "inProgress",
      progress: "progress",
      order: "order",
    },
    prepare({ name, issuer, tier, category, inProgress, progress, order }) {
      const state = inProgress ? `En curso ${progress ?? 0}%` : tier;
      return {
        title: `${typeof order === "number" ? `${order + 1}. ` : ""}${name || "Logro sin nombre"}`,
        subtitle: [issuer, category, state].filter(Boolean).join(" · "),
      };
    },
  },
});

export default achievement;

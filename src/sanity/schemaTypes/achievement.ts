const achievement = {
  name: "achievement",
  title: "Logro",
  type: "document",
  fields: [
    { name: "name", title: "Nombre", type: "string" },
    { name: "issuer", title: "Emisor", type: "string" },
    {
      name: "tier",
      title: "Rareza",
      type: "string",
      options: {
        list: [
          { title: "Legendario", value: "legend" },
          { title: "Épico", value: "epic" },
          { title: "Común", value: "std" },
        ],
      },
      initialValue: "std",
    },
    {
      name: "category",
      title: "Categoría",
      type: "string",
      options: { list: ["SEC", "IA", "UX", "CODE", "DATA", "NET", "OPS", "DB", "QA", "AGILE"] },
      initialValue: "CODE",
    },
    { name: "inProgress", title: "En curso", type: "boolean", initialValue: false },
    {
      name: "progress",
      title: "Progreso (0-100)",
      type: "number",
      hidden: ({ parent }: { parent?: { inProgress?: boolean } }) => !parent?.inProgress,
    },
    { name: "order", title: "Orden", type: "number" },
  ],
};

export default achievement;

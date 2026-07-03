const experience = {
  name: "experience",
  title: "Experiencia",
  type: "document",
  fields: [
    { name: "role", title: "Rol", type: "string" },
    { name: "org", title: "Organización", type: "string" },
    { name: "location", title: "Ubicación", type: "string" },
    { name: "bullets", title: "Bullets", type: "array", of: [{ type: "string" }] },
    { name: "order", title: "Orden", type: "number" },
  ],
};

export default experience;

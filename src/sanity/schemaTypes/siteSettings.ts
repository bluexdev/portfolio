const siteSettings = {
  name: "siteSettings",
  title: "Ajustes del sitio",
  type: "document",
  fields: [
    { name: "availabilityText", title: "Texto de disponibilidad", type: "string" },
    { name: "email", title: "Email", type: "string" },
    { name: "phone", title: "Teléfono", type: "string" },
    { name: "github", title: "GitHub (URL)", type: "url" },
    { name: "linkedin", title: "LinkedIn (URL)", type: "url" },
    { name: "location", title: "Ubicación", type: "string" },
    { name: "photo", title: "Foto de perfil", type: "image", options: { hotspot: true } },
    { name: "showBlog", title: "Mostrar blog", type: "boolean", initialValue: true },
    { name: "showTrayecto", title: "Mostrar trayecto", type: "boolean", initialValue: true },
  ],
};

export default siteSettings;

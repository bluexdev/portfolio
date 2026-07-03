const siteSettings = {
  name: "siteSettings",
  title: "Ajustes del sitio",
  type: "document",
  fields: [
    { name: "availabilityText", title: "Texto de disponibilidad", type: "string" },
    { name: "availabilityTextEn", title: "Texto de disponibilidad (EN)", type: "string" },
    { name: "email", title: "Email", type: "string" },
    { name: "phone", title: "Teléfono", type: "string" },
    { name: "phoneDisplay", title: "Teléfono visible", type: "string" },
    { name: "github", title: "GitHub (URL)", type: "url" },
    { name: "linkedin", title: "LinkedIn (URL)", type: "url" },
    { name: "location", title: "Ubicación", type: "string" },
    { name: "locationEn", title: "Ubicación (EN)", type: "string" },
    { name: "photo", title: "Foto de perfil", type: "image", options: { hotspot: true } },
    { name: "showBlog", title: "Mostrar blog", type: "boolean", initialValue: false },
    { name: "showTrayecto", title: "Mostrar trayecto", type: "boolean", initialValue: true },
    { name: "showCv", title: "Mostrar botón Descargar CV", type: "boolean", initialValue: true },
    { name: "cvUrl", title: "URL del CV PDF", type: "url" },
    {
      name: "showProjectMetrics",
      title: "Mostrar métricas de impacto de proyectos",
      type: "boolean",
      initialValue: false,
    },
    { name: "soundEnabled", title: "Sonido 8-bit activo por defecto", type: "boolean", initialValue: false },
  ],
};

export default siteSettings;

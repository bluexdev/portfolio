import { defineField, defineType } from "sanity";

const siteSettings = defineType({
  name: "siteSettings",
  title: "Ajustes del sitio",
  type: "document",
  groups: [
    { name: "control", title: "Control", default: true },
    { name: "contact", title: "Contacto" },
    { name: "assets", title: "Assets" },
    { name: "english", title: "Ingles" },
  ],
  fields: [
    defineField({
      name: "showBlog",
      title: "Mostrar blog",
      type: "boolean",
      group: "control",
      initialValue: false,
      description: "Mantenlo apagado hasta tener posts reales listos.",
    }),
    defineField({
      name: "showTrayecto",
      title: "Mostrar trayecto",
      type: "boolean",
      group: "control",
      initialValue: true,
    }),
    defineField({
      name: "showCv",
      title: "Mostrar boton Descargar CV",
      type: "boolean",
      group: "control",
      initialValue: true,
    }),
    defineField({
      name: "showProjectMetrics",
      title: "Mostrar metricas de impacto de proyectos",
      type: "boolean",
      group: "control",
      initialValue: false,
      description: "Activa esto cuando las metricas de impacto esten revisadas.",
    }),
    defineField({
      name: "soundEnabled",
      title: "Sonido 8-bit activo por defecto",
      type: "boolean",
      group: "control",
      initialValue: false,
    }),
    defineField({
      name: "availabilityText",
      title: "Texto de disponibilidad",
      type: "string",
      group: "contact",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "email",
      group: "contact",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Telefono para WhatsApp",
      type: "string",
      group: "contact",
      description: "Usa formato internacional sin espacios para wa.me, ejemplo +51938847564.",
      validation: (rule) => rule.required().regex(/^\+?\d{8,15}$/),
    }),
    defineField({
      name: "phoneDisplay",
      title: "Telefono visible",
      type: "string",
      group: "contact",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "github",
      title: "GitHub",
      type: "url",
      group: "contact",
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn",
      type: "url",
      group: "contact",
    }),
    defineField({
      name: "location",
      title: "Ubicacion",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "photo",
      title: "Foto/avatar de perfil",
      type: "image",
      group: "assets",
      options: { hotspot: true },
    }),
    defineField({
      name: "cvFile",
      title: "CV PDF subido",
      type: "file",
      group: "assets",
      description: "Opcion recomendada: sube el PDF aqui y no dependes de una URL manual.",
      options: { accept: "application/pdf" },
      hidden: ({ parent }) => parent?.showCv === false,
    }),
    defineField({
      name: "cvUrl",
      title: "URL manual del CV PDF",
      type: "string",
      group: "assets",
      description: "Fallback opcional si prefieres usar /archivo.pdf o una URL externa.",
      hidden: ({ parent }) => parent?.showCv === false,
    }),
    defineField({
      name: "availabilityTextEn",
      title: "Texto de disponibilidad (EN)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "locationEn",
      title: "Ubicacion (EN)",
      type: "string",
      group: "english",
    }),
  ],
  preview: {
    select: {
      title: "availabilityText",
      showBlog: "showBlog",
      showCv: "showCv",
      showProjectMetrics: "showProjectMetrics",
      media: "photo",
    },
    prepare({ title, showBlog, showCv, showProjectMetrics, media }) {
      const toggles = [
        showCv ? "CV ON" : "CV OFF",
        showBlog ? "Blog ON" : "Blog OFF",
        showProjectMetrics ? "Metricas ON" : "Metricas OFF",
      ].join(" · ");

      return {
        title: title || "Ajustes del sitio",
        subtitle: toggles,
        media,
      };
    },
  },
});

export default siteSettings;

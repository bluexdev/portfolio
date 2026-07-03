const post = {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    { name: "title", title: "Título", type: "string" },
    { name: "titleEn", title: "Título (EN)", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
    { name: "glyph", title: "Glyph (▚ ◆ ⚙ …)", type: "string" },
    { name: "tag", title: "Tag", type: "string" },
    { name: "excerpt", title: "Extracto", type: "text" },
    { name: "excerptEn", title: "Extracto (EN)", type: "text" },
    { name: "coverImage", title: "Imagen de portada", type: "image", options: { hotspot: true } },
    { name: "body", title: "Cuerpo", type: "array", of: [{ type: "block" }] },
    { name: "publishedAt", title: "Fecha de publicación", type: "datetime" },
    { name: "readingTime", title: "Tiempo de lectura", type: "string" },
  ],
};

export default post;

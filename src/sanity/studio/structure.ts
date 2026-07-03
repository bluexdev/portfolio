import type {StructureResolver} from "sanity/structure";

const singletonTypes = new Set(["siteSettings"]);

export const structure: StructureResolver = (S) =>
  S.list()
    .title("CARLXSDEV CMS")
    .items([
      S.listItem()
        .title("⚙ Ajustes del sitio")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Ajustes del sitio")
        ),
      S.divider(),
      S.documentTypeListItem("project").title("▦ Proyectos"),
      S.documentTypeListItem("post").title("▚ Blog posts"),
      S.documentTypeListItem("experience").title("◆ Experiencia"),
      S.documentTypeListItem("achievement").title("✦ Logros"),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId();
        return id ? !singletonTypes.has(id) : true;
      }),
    ]);

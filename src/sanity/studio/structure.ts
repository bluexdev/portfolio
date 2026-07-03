import type { StructureResolver } from "sanity/structure";

const settingsDocument = (S: Parameters<StructureResolver>[0]) =>
  S.document().schemaType("siteSettings").documentId("siteSettings").title("Panel de control");

export const structure: StructureResolver = (S) =>
  S.list()
    .title("CARLXSDEV CMS")
    .items([
      S.listItem()
        .title("▣ Panel de control")
        .id("controlPanel")
        .child(settingsDocument(S)),
      S.divider(),
      S.listItem()
        .title("⚠ Pendientes")
        .id("pending")
        .child(
          S.list()
            .title("Pendientes")
            .items([
              S.listItem()
                .title("Proyectos sin screenshot")
                .id("pendingProjectsMedia")
                .child(
                  S.documentList()
                    .title("Proyectos sin screenshot")
                    .filter("_type == 'project' && !defined(heroImage)")
                ),
              S.listItem()
                .title("Proyectos sin ingles")
                .id("pendingProjectsEnglish")
                .child(
                  S.documentList()
                    .title("Proyectos sin ingles")
                    .filter(
                      "_type == 'project' && (!defined(titleEn) || !defined(summaryEn) || !defined(bulletsEn[0]))"
                    )
                ),
              S.listItem()
                .title("Proyectos sin metricas de impacto")
                .id("pendingProjectImpact")
                .child(
                  S.documentList()
                    .title("Proyectos sin metricas de impacto")
                    .filter("_type == 'project' && !defined(impactMetrics[0])")
                ),
              S.listItem()
                .title("Posts sin portada")
                .id("pendingPostsMedia")
                .child(
                  S.documentList()
                    .title("Posts sin portada")
                    .filter("_type == 'post' && !defined(coverImage)")
                ),
              S.listItem()
                .title("Posts incompletos")
                .id("pendingPostsContent")
                .child(
                  S.documentList()
                    .title("Posts incompletos")
                    .filter(
                      "_type == 'post' && (!defined(title) || !defined(excerpt) || !defined(body[0]) || !defined(publishedAt))"
                    )
                ),
              S.listItem()
                .title("CV pendiente")
                .id("pendingCv")
                .child(
                  S.documentList()
                    .title("CV pendiente")
                    .filter("_type == 'siteSettings' && showCv == true && !defined(cvFile) && !defined(cvUrl)")
                ),
            ])
        ),
      S.divider(),
      S.documentTypeListItem("project").title("▦ Proyectos"),
      S.documentTypeListItem("post").title("▚ Blog posts"),
      S.documentTypeListItem("experience").title("◆ Experiencia"),
      S.documentTypeListItem("achievement").title("✦ Logros"),
    ]);

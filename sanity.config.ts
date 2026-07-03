import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { StudioLayout, StudioLogo, StudioNavbar } from "./src/sanity/studio/components";
import { structure } from "./src/sanity/studio/structure";
import { carlxsdevTheme } from "./src/sanity/studio/theme";

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ?? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset =
  process.env.SANITY_STUDIO_DATASET ?? process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  name: "carlxsdev",
  title: "CARLXSDEV Portfolio",
  projectId,
  dataset,
  theme: carlxsdevTheme,
  plugins: [structureTool({ structure }), visionTool()],
  studio: {
    components: {
      layout: StudioLayout,
      logo: StudioLogo,
      navbar: StudioNavbar,
    },
  },
  schema: {
    types: schemaTypes,
  },
});

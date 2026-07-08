import { createReadStream } from "node:fs";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "6sjdc10f",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN,
});

const cvPath = "public/carlos-alvarez-ponce-cv.pdf";
const cvFilename = "carlos-alvarez-ponce-cv.pdf";

async function main() {
  const settings = await client.fetch<{ _id: string } | null>(
    `*[_type == "siteSettings"][0]{_id}`
  );

  if (!settings?._id) {
    throw new Error("No se encontro el documento siteSettings en Sanity.");
  }

  const patch = client.patch(settings._id).set({
    showCv: true,
    cvUrl: `/${cvFilename}`,
  });

  let asset: { _id: string; url?: string } | null = null;

  try {
    asset = await client.assets.upload("file", createReadStream(cvPath), {
      filename: cvFilename,
      contentType: "application/pdf",
    });

    patch.set({
      cvFile: {
        _type: "file",
        asset: { _type: "reference", _ref: asset._id },
      },
    });
  } catch (error) {
    console.warn(
      "No se pudo subir el PDF como asset de Sanity; se actualizara solo la URL publica.",
      error instanceof Error ? error.message : error
    );
  }

  await patch.commit();

  console.log(
    JSON.stringify(
      {
        settingsId: settings._id,
        assetId: asset?._id ?? null,
        assetUrl: asset?.url ?? null,
        cvUrl: `/${cvFilename}`,
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

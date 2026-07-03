import { createClient, type SanityClient } from "@sanity/client";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2026-01-01";

/** true cuando hay un proyecto de Sanity configurado vía env vars */
export const sanityEnabled = Boolean(projectId);

let _client: SanityClient | null = null;

export function getClient(): SanityClient {
  if (!projectId) {
    throw new Error(
      "Sanity no está configurado: define NEXT_PUBLIC_SANITY_PROJECT_ID y NEXT_PUBLIC_SANITY_DATASET"
    );
  }
  _client ??= createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
    token: process.env.SANITY_API_READ_TOKEN,
    perspective: "published",
  });
  return _client;
}

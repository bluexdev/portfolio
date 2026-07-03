import groq from "groq";

export const HOME = groq`{
  "projects": *[_type=="project"]|order(order asc){
    ...,
    "heroUrl": heroImage.asset->url,
    "galleryUrls": gallery[].asset->url,
    "slugStr": slug.current
  },
  "posts": *[_type=="post"]|order(publishedAt desc)[0...3]{
    ...,
    "coverUrl": coverImage.asset->url,
    "slugStr": slug.current
  },
  "experience": *[_type=="experience"]|order(order asc),
  "achievements": *[_type=="achievement"]|order(order asc),
  "settings": *[_type=="siteSettings"][0]{
    ...,
    "photoUrl": photo.asset->url,
    "cvFileUrl": cvFile.asset->url
  }
}`;

export const POST_SLUGS = groq`*[_type=="post" && defined(slug.current)].slug.current`;

export const POST_BY_SLUG = groq`*[_type=="post" && slug.current==$slug][0]{
  ...,
  "coverUrl": coverImage.asset->url,
  "slugStr": slug.current
}`;

import HorizontalTrack from "@/components/layout/HorizontalTrack";
import Arcade from "@/components/sections/Arcade";
import Blog from "@/components/sections/Blog";
import Contacto from "@/components/sections/Contacto";
import Hero from "@/components/sections/Hero";
import Perfil from "@/components/sections/Perfil";
import Proyectos from "@/components/sections/Proyectos";
import Stack from "@/components/sections/Stack";
import Trayecto from "@/components/sections/Trayecto";
import { getHomeData } from "@/lib/data";

export const revalidate = 60;

export default async function Home() {
  const { projects, posts, experience, achievements, settings } = await getHomeData();

  // secciones opcionales (showTrayecto / showBlog) desplazan los índices
  const names = [
    "INICIO",
    "PERFIL",
    ...(settings.showTrayecto ? ["TRAYECTO"] : []),
    "STACK",
    "PROYECTOS",
    "ARCADE",
    ...(settings.showBlog ? ["BLOG"] : []),
    "CONTACTO",
  ];
  const idx = (n: string) => names.indexOf(n);

  return (
    <HorizontalTrack names={names}>
      <Hero />
      <Perfil index={idx("PERFIL")} photoUrl={settings.photoUrl} />
      {settings.showTrayecto && (
        <Trayecto index={idx("TRAYECTO")} experience={experience} achievements={achievements} />
      )}
      <Stack index={idx("STACK")} />
      <Proyectos index={idx("PROYECTOS")} projects={projects} />
      <Arcade index={idx("ARCADE")} />
      {settings.showBlog && <Blog index={idx("BLOG")} posts={posts} />}
      <Contacto index={idx("CONTACTO")} settings={settings} />
    </HorizontalTrack>
  );
}

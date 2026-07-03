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
import { getDict } from "@/lib/i18n";
import {
  getVisibleSections,
  localizeHomeData,
  type Locale,
} from "@/lib/portfolioConfig";

export default async function HomeScreen({ locale }: { locale: Locale }) {
  const home = localizeHomeData(await getHomeData(), locale);
  const { projects, posts, experience, achievements, settings } = home;
  const dict = getDict(locale);
  const names = getVisibleSections(settings, locale);
  const idx = (n: string) => names.indexOf(n);

  return (
    <HorizontalTrack names={names} locale={locale} dict={dict} soundInitiallyEnabled={settings.soundEnabled}>
      <Hero dict={dict} settings={settings} />
      <Perfil index={idx(dict.names.perfil)} photoUrl={settings.photoUrl} dict={dict} />
      {settings.showTrayecto && (
        <Trayecto
          index={idx(dict.names.trayecto)}
          experience={experience}
          achievements={achievements}
          dict={dict}
        />
      )}
      <Stack index={idx(dict.names.stack)} dict={dict} />
      <Proyectos index={idx(dict.names.proyectos)} projects={projects} dict={dict} />
      <Arcade index={idx(dict.names.arcade)} dict={dict} />
      {settings.showBlog && <Blog index={idx(dict.names.blog)} posts={posts} dict={dict} locale={locale} />}
      <Contacto index={idx(dict.names.contacto)} settings={settings} dict={dict} />
    </HorizontalTrack>
  );
}

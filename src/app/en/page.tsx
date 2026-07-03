import HomeScreen from "../HomeScreen";

export const revalidate = 60;

export default async function EnglishHome() {
  return <HomeScreen locale="en" />;
}

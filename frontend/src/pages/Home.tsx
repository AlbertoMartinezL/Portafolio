import { api } from "../api/client";
import { ErrorMessage, Loading } from "../components/ui/Status";
import { useFetch } from "../hooks/useFetch";
import About from "../sections/About";
import Contact from "../sections/Contact";
import Education from "../sections/Education";
import Experience from "../sections/Experience";
import Hero from "../sections/Hero";
import Projects from "../sections/Projects";
import Skills from "../sections/Skills";

export default function Home() {
  const { data: profile, error, loading } = useFetch(api.getProfile);

  if (loading) return <Loading />;
  if (error || !profile) return <ErrorMessage message={error ?? "sin datos"} />;

  return (
    <>
      <Hero profile={profile} />
      <About profile={profile} />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Contact email={profile.email} />
    </>
  );
}

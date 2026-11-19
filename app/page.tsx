import Arrival from "@/components/Arrival";
import CallToAction from "@/components/CallToAction";
import Experiences from "@/components/Experiences";
import Hero from "@/components/Hero";
import Materiality from "@/components/Materiality";
import Philosophy from "@/components/Philosophy";
import Sanctuaries from "@/components/Sanctuaries";
import Testimonial from "@/components/Testimonial";

export default function Home() {
  return (
    <>
      <Hero />
      <div id="philosophy" className="scroll-mt-20">
        <Philosophy />
      </div>
      <Sanctuaries />
      <div id="experiences" className="scroll-mt-20">
        <Experiences />
      </div>
      <Materiality />
      <Testimonial />
      <Arrival />
      <CallToAction />
    </>
  );
}

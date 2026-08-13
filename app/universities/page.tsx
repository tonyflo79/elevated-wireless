import { Nav } from "@/components/Nav";
import { Access } from "@/components/Access";
import { Footer } from "@/components/Footer";
import {
  UniversityHero,
  UniversityMath,
  UniversityFit,
  UniversityLaunch,
} from "@/components/University";

const UNIVERSITY_LANES = [
  {
    n: "01",
    title: "You promote.",
    body: "Broadcast, in-venue signage, email, social, ticketing, alumni networks, NIL and collective activations. All the channels you already own.",
  },
  {
    n: "02",
    title: "We operate.",
    body: "Network, activation, billing, support, compliance. The entire wireless company, under your brand. Zero operational lift on campus.",
  },
  {
    n: "03",
    title: "You earn.",
    body: "A monthly royalty on every subscriber. Revenue your program controls.",
  },
];

export default function Universities() {
  return (
    <>
      <Nav />
      <UniversityHero />
      <UniversityMath />
      <Access
        id="deal"
        screenLabel="U3 The Deal"
        lanes={UNIVERSITY_LANES}
      />
      <UniversityFit />
      <UniversityLaunch />
      <Footer />
    </>
  );
}

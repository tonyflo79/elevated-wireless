import { Nav } from "@/components/Nav";
import { Team } from "@/components/Team";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "About Us | Elevated Wireless",
  description:
    "The operators behind Elevated Wireless. Telecom, brand, product, data, and marketing.",
};

export default function About() {
  return (
    <>
      <Nav />
      {/* Anchor target for the wordmark and the Home nav item. */}
      <div id="top" />
      <Team />
      <Footer />
    </>
  );
}

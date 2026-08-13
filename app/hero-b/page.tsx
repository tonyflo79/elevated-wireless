import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Category } from "@/components/Category";
import { Access } from "@/components/Access";
import { Platform } from "@/components/Platform";
import { TwoPaths } from "@/components/TwoPaths";
import { Footer } from "@/components/Footer";

// Preview-only route. Identical to the homepage except the hero variant, so
// Joe can compare A and B on the same page. Delete once he has picked.
export default function HeroBPreview() {
  return (
    <>
      <Nav />
      <Hero variant="band" />
      <Category />
      <Access />
      <Platform />
      <TwoPaths />
      <Footer />
    </>
  );
}

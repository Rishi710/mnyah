import { BAGS, COLLECTIONS, ESSENTIALS, LATEST_DROP, STORES } from "./data";
import { CollectionSlider } from "./components/CollectionSlider";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ProductGrid } from "./components/ProductGrid";
import { ProductRail } from "./components/ProductRail";
import { Stores } from "./components/Stores";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProductRail id="latest-drop" title="Latest drop" products={LATEST_DROP} />
        <ProductRail id="bags" title="Mnyah Bags" products={BAGS} />
        <CollectionSlider collections={COLLECTIONS} />
        <ProductGrid id="essentials" title="Essentials" products={ESSENTIALS} />
        <Stores stores={STORES} />
      </main>
      <Footer />
    </>
  );
}

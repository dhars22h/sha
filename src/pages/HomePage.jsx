import Hero from '../components/Hero';
import Categories from '../components/Categories';
import Products from '../components/Products';
import OfferBanner from '../components/OfferBanner';
import Reviews from '../components/Reviews';
import Brands from '../components/Brands';

const SectionDivider = () => (
  <div className="relative h-px overflow-hidden">
    <div
      className="absolute inset-0"
      style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.4), rgba(124,58,237,0.4), rgba(219,39,119,0.4), transparent)' }}
    />
  </div>
);

export default function HomePage() {
  return (
    <>
      <Hero />
      <SectionDivider />
      <div id="categories-section">
        <Categories />
      </div>
      <SectionDivider />
      <div id="products-section">
        <Products />
      </div>
      <SectionDivider />
      <div id="offers-section">
        <OfferBanner />
      </div>
      <SectionDivider />
      <div id="reviews-section">
        <Reviews />
      </div>
      <SectionDivider />
      <div id="brands-section">
        <Brands />
      </div>
    </>
  );
}

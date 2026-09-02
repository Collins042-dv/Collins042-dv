import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import brand from '../config/brand';
import { categories, products } from '../data/products';
import ProductCard from '../components/ProductCard';
import SectionHeading from '../components/SectionHeading';

const labelMap = {
  all: 'All',
  clothing: 'Clothing',
  bags: 'Bags',
  perfumes: 'Perfumes',
  accessories: 'Accessories',
};

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = (searchParams.get('category') || 'all').toLowerCase();

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return products;
    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="page-shell">
      <section className="page-hero slim">
        <div className="container page-hero-inner">
          <span className="eyebrow">{brand.monogram} Boutique</span>
          <h1>Shop the Collection</h1>
          <p>Curated luxury essentials in {brand.currency.code}, crafted for elevated everyday dressing.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            align="left"
            eyebrow="Browse"
            title="Every category, one refined destination."
            subtitle="Filter through the latest in clothing, bags, fragrance, and accessories."
          />
          <div className="filter-row">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`filter-chip ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setSearchParams(category === 'all' ? {} : { category })}
              >
                {labelMap[category]}
              </button>
            ))}
          </div>
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

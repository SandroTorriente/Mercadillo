import { Button } from "@/components/ui/button";
import Hero from "@/components/home/hero";
import Categories from "@/components/home/categories";
import { ProductsList } from "@/components/products/products-list";
import { ProductFilters } from "@/components/products/product-filters";
import { PageHeader } from "@/components/common/page-header";

export default function Home() {
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <Hero />
        <Categories />
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <PageHeader 
          title="Nuestros Productos" 
          description="Explora nuestra selección de productos de tiendas locales"
        />
        
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          <aside className="w-full md:w-64 shrink-0">
            <ProductFilters />
          </aside>
          
          <main className="flex-1">
            <ProductsList />
          </main>
        </div>
      </div>
    </div>
  );
}
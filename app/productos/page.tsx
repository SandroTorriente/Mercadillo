import { Suspense } from 'react';
import { ProductsList } from '@/components/products/products-list';
import { ProductFilters } from '@/components/products/product-filters';
import { PageHeader } from '@/components/common/page-header';

export default function ProductsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <PageHeader 
        title="Nuestros Productos" 
        description="Explora nuestra selección de productos de tiendas locales"
      />
      
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <aside className="w-full md:w-64 shrink-0">
          <ProductFilters />
        </aside>
        
        <main className="flex-1">
          <Suspense fallback={<ProductsLoadingSkeleton />}>
            <ProductsList />
          </Suspense>
        </main>
      </div>
    </div>
  );
}

function ProductsLoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-10 w-full bg-muted rounded-md animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="rounded-lg overflow-hidden">
            <div className="h-48 bg-muted animate-pulse" />
            <div className="p-4 space-y-2">
              <div className="h-4 w-1/3 bg-muted rounded animate-pulse" />
              <div className="h-6 w-4/5 bg-muted rounded animate-pulse" />
              <div className="h-4 w-1/5 bg-muted rounded animate-pulse" />
              <div className="h-4 w-2/4 bg-muted rounded animate-pulse" />
              <div className="h-10 w-full bg-muted rounded animate-pulse mt-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
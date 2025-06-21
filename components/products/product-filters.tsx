"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { dummyCategories, dummyStores } from "@/lib/dummy-data";

export function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStores, setSelectedStores] = useState<number[]>([]);
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const handleStoreChange = (storeId: number) => {
    setSelectedStores(prev => 
      prev.includes(storeId) 
        ? prev.filter(s => s !== storeId)
        : [...prev, storeId]
    );
  };
  
  const applyFilters = () => {
    // In a real app, you'd build the query string and navigate
    // For demo, we're just showing how to navigate with params
    if (selectedCategories.length > 0) {
      const category = selectedCategories[0].toLowerCase();
      router.push(`/productos?category=${category}`);
    } else {
      router.push("/productos");
    }
  };
  
  const resetFilters = () => {
    setPriceRange([0, 100]);
    setSelectedCategories([]);
    setSelectedStores([]);
    router.push("/productos");
  };
  
  return (
    <div className="space-y-6">
      <div className="font-medium text-lg">Filtros</div>
      
      <Accordion type="multiple" defaultValue={["categories", "price", "stores"]}>
        <AccordionItem value="categories">
          <AccordionTrigger className="text-sm font-medium">
            Categorías
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {dummyCategories.map(category => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.name)}
                    onCheckedChange={() => handleCategoryChange(category.name)}
                  />
                  <Label 
                    htmlFor={`category-${category.id}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {category.name} ({category.count})
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-medium">
            Rango de Precio
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2 px-1">
              <Slider
                value={priceRange}
                min={0}
                max={100}
                step={1}
                onValueChange={setPriceRange}
              />
              <div className="flex justify-between text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="stores">
          <AccordionTrigger className="text-sm font-medium">
            Tiendas
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {dummyStores.map(store => (
                <div key={store.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`store-${store.id}`}
                    checked={selectedStores.includes(store.id)}
                    onCheckedChange={() => handleStoreChange(store.id)}
                  />
                  <Label 
                    htmlFor={`store-${store.id}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {store.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="availability">
          <AccordionTrigger className="text-sm font-medium">
            Disponibilidad
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              <div className="flex items-center space-x-2">
                <Checkbox id="in-stock" />
                <Label 
                  htmlFor="in-stock"
                  className="text-sm font-normal cursor-pointer"
                >
                  En stock
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <div className="flex gap-2 pt-4">
        <Button onClick={applyFilters} className="flex-1">Aplicar</Button>
        <Button variant="outline" onClick={resetFilters} size="icon">
          ×
        </Button>
      </div>
    </div>
  );
}
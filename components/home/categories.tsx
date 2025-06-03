import { Card, CardContent } from "@/components/ui/card";
import { Utensils, Gift, ShoppingBag, Home, Shirt, BookOpen } from "lucide-react";
import Link from "next/link";

interface CategoryProps {
  title: string;
  icon: React.ReactNode;
  href: string;
  color: string;
}

const Category = ({ title, icon, href, color }: CategoryProps) => (
  <Link href={href}>
    <Card className="group transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div 
          className={`p-3 rounded-full mb-4 ${color} transition-all duration-300 group-hover:scale-110`}
        >
          {icon}
        </div>
        <h3 className="font-medium">{title}</h3>
      </CardContent>
    </Card>
  </Link>
);

export default function Categories() {
  const categories = [
    {
      title: "Alimentos",
      icon: <Utensils className="h-6 w-6 text-white" />,
      href: "/productos/categoria/alimentos",
      color: "bg-amber-500",
    },
    {
      title: "Regalos",
      icon: <Gift className="h-6 w-6 text-white" />,
      href: "/productos/categoria/regalos",
      color: "bg-red-500",
    },
    {
      title: "Moda",
      icon: <Shirt className="h-6 w-6 text-white" />,
      href: "/productos/categoria/moda",
      color: "bg-blue-500",
    },
    {
      title: "Hogar",
      icon: <Home className="h-6 w-6 text-white" />,
      href: "/productos/categoria/hogar",
      color: "bg-green-500",
    },
    {
      title: "Libros",
      icon: <BookOpen className="h-6 w-6 text-white" />,
      href: "/productos/categoria/libros",
      color: "bg-purple-500",
    },
    {
      title: "Más",
      icon: <ShoppingBag className="h-6 w-6 text-white" />,
      href: "/productos",
      color: "bg-gray-500",
    },
  ];

  return (
    <section className="py-12">
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Categorías</h2>
        <p className="text-muted-foreground text-center max-w-md">
          Explora nuestra amplia variedad de productos por categorías
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Category key={category.title} {...category} />
        ))}
      </div>
    </section>
  );
}
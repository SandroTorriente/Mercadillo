"use client";

import { useState } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ShoppingBag, 
  Store, 
  Truck, 
  CheckCircle,
  Package
} from "lucide-react";

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isActive: boolean;
}

const Step = ({ icon, title, description, isActive }: StepProps) => (
  <div className={`flex items-start gap-4 p-4 rounded-lg transition-all duration-300 ${
    isActive ? "bg-primary/10" : "bg-transparent"
  }`}>
    <div className={`p-3 rounded-full ${
      isActive ? "bg-primary text-white" : "bg-muted text-muted-foreground"
    }`}>
      {icon}
    </div>
    <div>
      <h3 className={`font-medium mb-1 ${
        isActive ? "text-primary" : "text-foreground"
      }`}>
        {title}
      </h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  </div>
);

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState("cliente");
  
  const clientSteps = [
    {
      icon: <ShoppingBag className="h-5 w-5" />,
      title: "Explora productos",
      description: "Navega entre nuestras categorías y encuentra lo que necesitas de tiendas locales."
    },
    {
      icon: <Store className="h-5 w-5" />,
      title: "Elige tienda y mensajero",
      description: "Selecciona el punto de venta y un mensajero disponible para tu entrega."
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: "Confirma tu pedido",
      description: "Recibe un número de reserva y contacta a tu mensajero para coordinar."
    },
    {
      icon: <Package className="h-5 w-5" />,
      title: "Recibe tus productos",
      description: "El mensajero te entregará tu pedido en la ubicación acordada."
    }
  ];
  
  const courierSteps = [
    {
      icon: <Truck className="h-5 w-5" />,
      title: "Regístrate como mensajero",
      description: "Completa tu perfil con tus datos, medio de transporte y tarifas."
    },
    {
      icon: <Store className="h-5 w-5" />,
      title: "Recibe pedidos",
      description: "Los clientes te seleccionarán según tu disponibilidad y tarifas."
    },
    {
      icon: <ShoppingBag className="h-5 w-5" />,
      title: "Recoge productos",
      description: "Visita el punto de venta para recoger los artículos del pedido."
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: "Realiza la entrega",
      description: "Coordina con el cliente y entrega los productos en su ubicación."
    }
  ];

  return (
    <section className="py-12 bg-muted/30 rounded-2xl p-8">
      <div className="flex flex-col items-center mb-10 text-center">
        <h2 className="text-3xl font-bold mb-2">¿Cómo Funciona?</h2>
        <p className="text-muted-foreground max-w-xl">
          Mercadillo conecta a clientes, tiendas y mensajeros para una experiencia de compra única
        </p>
      </div>
      
      <Tabs 
        defaultValue="cliente" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="max-w-4xl mx-auto"
      >
        <div className="flex justify-center mb-8">
          <TabsList className="grid grid-cols-2 w-[400px]">
            <TabsTrigger value="cliente">Para Clientes</TabsTrigger>
            <TabsTrigger value="mensajero">Para Mensajeros</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="cliente" className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2 space-y-4">
            {clientSteps.map((step, index) => (
              <Step 
                key={index} 
                {...step} 
                isActive={index === Math.floor(clientSteps.length / 2)}
              />
            ))}
          </div>
          <div className="md:w-1/2 relative h-64 md:h-80 overflow-hidden rounded-lg">
            <Image
              src="https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg"
              alt="Cliente recibiendo productos"
              fill
              className="object-cover"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="mensajero" className="flex flex-col-reverse md:flex-row gap-8 items-center">
          <div className="md:w-1/2 relative h-64 md:h-80 overflow-hidden rounded-lg">
            <Image
              src="https://images.pexels.com/photos/5045039/pexels-photo-5045039.jpeg"
              alt="Mensajero entregando productos"
              fill
              className="object-cover"
            />
          </div>
          <div className="md:w-1/2 space-y-4">
            {courierSteps.map((step, index) => (
              <Step 
                key={index} 
                {...step} 
                isActive={index === Math.floor(courierSteps.length / 2)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
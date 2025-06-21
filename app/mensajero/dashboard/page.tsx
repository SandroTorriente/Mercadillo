"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PageHeader } from "@/components/common/page-header";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  Clock, 
  CheckCircle,
  ArrowRight,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CourierDashboard() {
  const { data: session, status } = useSession();
  const [isAvailable, setIsAvailable] = useState(true);
  const [courierProfile, setCourierProfile] = useState<null | {
    name: string;
    phone: string;
    transport_type: string;
    rate: string;
    max_weight: number;
    email?: string;
    avatar: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg",
    earnings: { today: 350, week: 1850, month: 7400 }
  }>(null);

  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user.role !== "courier") {
      console.log("Redireccionado papo");
      router.replace("/"); // Redirige si no es mensajero
    }
  }, [status, session, router]);

  useEffect(() => {
    if (status === "authenticated" && session?.user.role === "courier") {
      const fetchProfile = async () => {
        const res = await fetch("/api/mensajero/perfil");
        const data = await res.json();
        setCourierProfile(data);
      };
      fetchProfile();
    }
  }, [status, session]);

  if (status === "loading" || !courierProfile) return <p>Cargando perfil...</p>;
  if (!session || session.user.role !== "courier") {
    return <p>Redirigiendo...</p>;
  }

  
  const pendingDeliveries = [
    {
      id: "ORD-4231",
      customer: "María López",
      store: "Mercado Central",
      date: "2025-05-20",
      items: [
        { name: "Café Orgánico Premium", quantity: 2 },
        { name: "Mermelada Artesanal", quantity: 1 }
      ],
      status: "Pendiente"
    },
    {
      id: "ORD-4235",
      customer: "Roberto Díaz",
      store: "Tienda Gourmet",
      date: "2025-05-20",
      items: [
        { name: "Set de Té Japonés", quantity: 1 }
      ],
      status: "En proceso"
    }
  ];
  
  const completedDeliveries = [
    {
      id: "ORD-4228",
      customer: "Ana Martínez",
      store: "Boutique Moderna",
      date: "2025-05-19",
      items: [
        { name: "Bolso de Cuero", quantity: 1 }
      ],
      status: "Entregado"
    },
    {
      id: "ORD-4225",
      customer: "Jorge Gutiérrez",
      store: "Casa & Decoración",
      date: "2025-05-18",
      items: [
        { name: "Lámpara de Mesa", quantity: 1 },
        { name: "Planta de Interior", quantity: 2 }
      ],
      status: "Entregado"
    },
    {
      id: "ORD-4220",
      customer: "Laura Sánchez",
      store: "Mercado Central",
      date: "2025-05-17",
      items: [
        { name: "Chocolates Surtidos", quantity: 3 },
        { name: "Aceite de Oliva Extra Virgen", quantity: 1 }
      ],
      status: "Entregado"
    }
  ];

  const toggleAvailability = () => {
    setIsAvailable(!isAvailable);
    toast.success(`Ahora estás ${!isAvailable ? 'disponible' : 'no disponible'} para entregas`);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <PageHeader
        title="Panel de Mensajero"
        description="Administra tus entregas y disponibilidad"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Perfil</CardTitle>
            <CardDescription>Tu información personal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 rounded-full overflow-hidden">
                <Image
                  src={courierProfile.avatar}
                  alt={courierProfile.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium text-lg">{courierProfile.name}</h3>
                <p className="text-sm text-muted-foreground">{courierProfile.phone}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline">{courierProfile.transport_type}</Badge>
                  <Badge variant="outline">Hasta {courierProfile.max_weight}kg</Badge>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex items-center space-x-2">
              <Switch
                id="available"
                checked={isAvailable}
                onCheckedChange={toggleAvailability}
              />
              <Label htmlFor="available">
                {isAvailable ? "Disponible" : "No disponible"} para entregas
              </Label>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/mensajero/perfil">Editar Perfil</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Ganancias</CardTitle>
            <CardDescription>Resumen de tus ingresos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Hoy</p>
                <p className="text-2xl font-bold mt-1">${courierProfile.earnings.today}</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Semana</p>
                <p className="text-2xl font-bold mt-1">${courierProfile.earnings.week}</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Mes</p>
                <p className="text-2xl font-bold mt-1">${courierProfile.earnings.month}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Ver Detalles
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Estadísticas</CardTitle>
            <CardDescription>Rendimiento de tus entregas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Entregas Completadas</span>
                  <span className="text-sm font-medium">24</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full" style={{ width: "80%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Calificación</span>
                  <span className="text-sm font-medium">4.8/5.0</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full" style={{ width: "96%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Tiempo Promedio</span>
                  <span className="text-sm font-medium">28 min</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full" style={{ width: "70%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Ver Historial
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-8">
        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Clock className="h-4 w-4" /> Pendientes ({pendingDeliveries.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" /> Completadas
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending" className="mt-4">
            <div className="space-y-4">
              {pendingDeliveries.length > 0 ? (
                pendingDeliveries.map((delivery) => (
                  <DeliveryCard 
                    key={delivery.id} 
                    delivery={delivery} 
                    isCompleted={false} 
                  />
                ))
              ) : (
                <EmptyState
                  icon={<Package className="h-12 w-12" />}
                  title="No hay entregas pendientes"
                  description="Actualmente no tienes entregas pendientes"
                />
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="mt-4">
            <div className="space-y-4">
              {completedDeliveries.length > 0 ? (
                completedDeliveries.map((delivery) => (
                  <DeliveryCard 
                    key={delivery.id} 
                    delivery={delivery} 
                    isCompleted={true} 
                  />
                ))
              ) : (
                <EmptyState
                  icon={<Package className="h-12 w-12" />}
                  title="No hay entregas completadas"
                  description="Aún no has completado ninguna entrega"
                />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

interface DeliveryCardProps {
  delivery: {
    id: string;
    customer: string;
    store: string;
    date: string;
    items: { name: string; quantity: number }[];
    status: string;
  };
  isCompleted: boolean;
}

function DeliveryCard({ delivery, isCompleted }: DeliveryCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-lg flex items-center gap-2">
            Pedido {delivery.id} 
            <Badge 
              className={cn(
                delivery.status === "Entregado" ? "bg-green-500" :
                delivery.status === "En proceso" ? "bg-blue-500" :
                "bg-amber-500"
              )}
            >
              {delivery.status}
            </Badge>
          </CardTitle>
          <CardDescription>
            {new Date(delivery.date).toLocaleDateString()} • {delivery.store}
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          {isCompleted ? (
            <Button variant="outline" size="sm">
              Detalles
            </Button>
          ) : (
            <>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <User className="h-4 w-4" />
                Contactar
              </Button>
              <Button size="sm" className="flex items-center gap-1">
                {delivery.status === "Pendiente" ? (
                  <>Aceptar <ArrowRight className="h-4 w-4 ml-1" /></>
                ) : (
                  <>Completar <CheckCircle className="h-4 w-4 ml-1" /></>
                )}
              </Button>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>Cliente: <span className="font-medium">{delivery.customer}</span></span>
          </div>
          <h4 className="font-medium mt-3 mb-1">Productos:</h4>
          <ul className="space-y-1">
            {delivery.items.map((item, index) => (
              <li key={index} className="flex justify-between">
                <span>{item.name}</span>
                <span className="text-muted-foreground">x{item.quantity}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-muted-foreground">{icon}</div>
        <h3 className="mt-4 text-lg font-medium">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-sm">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

function Link({ href, className, children, ...props }: React.ComponentProps<"a"> & { href: string }) {
  return (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  );
}
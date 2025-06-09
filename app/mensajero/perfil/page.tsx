"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Phone, 
  Mail, 
  Truck, 
  Weight,
  DollarSign,
  ArrowLeft
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

const courierProfileSchema = z.object({
  name: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().min(10, { message: "El teléfono debe tener al menos 10 dígitos" }),
  transportType: z.string({ required_error: "Por favor selecciona un medio de transporte" }),
  maxWeight: z.coerce.number().min(1, { message: "El peso máximo debe ser al menos 1kg" }),
  rateTable: z.string().min(10, { message: "Por favor ingresa tu tabla de tarifas" }),
});

export default function CourierProfile() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Simulated current courier data
  const currentCourier = {
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@email.com",
    phone: "+52 55 1234 5678",
    transportType: "motocicleta",
    maxWeight: 10,
    rateTable: "1-5 km: $30\n6-10 km: $50\n11-15 km: $70\nPeso máximo: 10kg",
    avatar: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg",
    joinDate: "2024-01-15",
    totalDeliveries: 156,
    rating: 4.8
  };

  const form = useForm<z.infer<typeof courierProfileSchema>>({
    resolver: zodResolver(courierProfileSchema),
    defaultValues: {
      name: currentCourier.name,
      email: currentCourier.email,
      phone: currentCourier.phone,
      transportType: currentCourier.transportType,
      maxWeight: currentCourier.maxWeight,
      rateTable: currentCourier.rateTable,
    },
  });

  function onSubmit(values: z.infer<typeof courierProfileSchema>) {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);
      toast.success("Perfil actualizado exitosamente");
    }, 1500);
  }

  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/mensajero/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <PageHeader
          title="Mi Perfil"
          description="Administra tu información personal y configuración"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <div className="relative h-32 w-32 mx-auto rounded-full overflow-hidden">
                <Image
                  src={currentCourier.avatar}
                  alt={currentCourier.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardTitle className="mt-4">{currentCourier.name}</CardTitle>
              <CardDescription>Mensajero desde {new Date(currentCourier.joinDate).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">{currentCourier.totalDeliveries}</p>
                  <p className="text-sm text-muted-foreground">Entregas</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">{currentCourier.rating}</p>
                  <p className="text-sm text-muted-foreground">Calificación</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{currentCourier.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{currentCourier.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-muted-foreground" />
                  <Badge variant="outline" className="capitalize">
                    {currentCourier.transportType}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Weight className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Hasta {currentCourier.maxWeight}kg</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancelar Edición" : "Editar Perfil"}
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
              <CardDescription>
                {isEditing ? "Actualiza tu información personal" : "Tu información personal actual"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre completo</FormLabel>
                            <FormControl>
                              <Input placeholder="Juan Pérez" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Correo electrónico</FormLabel>
                            <FormControl>
                              <Input placeholder="tu@ejemplo.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Teléfono</FormLabel>
                            <FormControl>
                              <Input placeholder="+52 55 1234 5678" {...field} />
                            </FormControl>
                            <FormDescription>
                              Este número se usará para WhatsApp
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="transportType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Medio de transporte</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecciona tu medio de transporte" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="bicicleta">Bicicleta</SelectItem>
                                <SelectItem value="motocicleta">Motocicleta</SelectItem>
                                <SelectItem value="automovil">Automóvil</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="maxWeight"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Peso máximo (kg)</FormLabel>
                            <FormControl>
                              <Input type="number" min="1" {...field} />
                            </FormControl>
                            <FormDescription>
                              Límite de peso que puedes transportar
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="rateTable"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tabla de tarifas</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Detalla tus tarifas por distancia y otros criterios"
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Especifica tus tarifas por distancia, peso u otros criterios
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex gap-4">
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Guardando..." : "Guardar Cambios"}
                      </Button>
                      <Button type="button" variant="outline" onClick={handleCancel}>
                        Cancelar
                      </Button>
                    </div>
                  </form>
                </Form>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Nombre completo</Label>
                      <p className="mt-1">{currentCourier.name}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Correo electrónico</Label>
                      <p className="mt-1">{currentCourier.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Teléfono</Label>
                      <p className="mt-1">{currentCourier.phone}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Medio de transporte</Label>
                      <p className="mt-1 capitalize">{currentCourier.transportType}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Peso máximo</Label>
                      <p className="mt-1">{currentCourier.maxWeight} kg</p>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Tabla de tarifas</Label>
                    <div className="mt-1 p-4 bg-muted rounded-lg">
                      <pre className="text-sm whitespace-pre-wrap">{currentCourier.rateTable}</pre>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
      {...props}
    />
  );
}
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { toast } from "sonner";
import { Truck, Recycle as Bicycle, Car } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";

const courierSchema = z.object({
  name: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().min(10, { message: "El teléfono debe tener al menos 10 dígitos" }),
  transportType: z.string({ required_error: "Por favor selecciona un medio de transporte" }),
  maxWeight: z.coerce.number().min(1, { message: "El peso máximo debe ser al menos 1kg" }),
  rateTable: z.string().min(10, { message: "Por favor ingresa tu tabla de tarifas" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export default function CourierRegistration() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof courierSchema>>({
    resolver: zodResolver(courierSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      transportType: "",
      maxWeight: 10,
      rateTable: "1-5 km: $XX\n6-10 km: $XX\n11-15 km: $XX\nPeso máximo: 10kg",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof courierSchema>) {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Success notification
      toast.success("Registro exitoso como mensajero");
      
      // Redirect to login
      router.push("/auth/login?role=mensajero");
    }, 1500);
  }

  return (
    <div className="container max-w-3xl mx-auto py-12 px-4">
      <PageHeader
        title="Regístrate como Mensajero"
        description="Únete a nuestra red de mensajeros independientes y comienza a ganar dinero extra"
      />
      
      <Card className="mt-8">
        <CardContent className="pt-6">
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
                          <SelectItem value="bicicleta">
                            <div className="flex items-center gap-2">
                              <Bicycle className="h-4 w-4" /> Bicicleta
                            </div>
                          </SelectItem>
                          <SelectItem value="motocicleta">
                            <div className="flex items-center gap-2">
                              <Truck className="h-4 w-4" /> Motocicleta
                            </div>
                          </SelectItem>
                          <SelectItem value="automovil">
                            <div className="flex items-center gap-2">
                              <Car className="h-4 w-4" /> Automóvil
                            </div>
                          </SelectItem>
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmar Contraseña</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Registrando..." : "Registrarse como Mensajero"}
              </Button>
            </form>
          </Form>
          
          <div className="mt-4 text-center text-sm">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/auth/login?role=mensajero" className="text-primary hover:underline font-medium">
              Iniciar Sesión
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}
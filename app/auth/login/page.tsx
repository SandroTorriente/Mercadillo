"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const userSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("cliente");

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof userSchema>) {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Success notification
      toast.success(`Inicio de sesión exitoso como ${activeTab === "cliente" ? "cliente" : activeTab === "mensajero" ? "mensajero" : "administrador"}`);
      
      // Redirect based on role
      if (activeTab === "cliente") {
        router.push("/");
      } else if (activeTab === "mensajero") {
        router.push("/mensajero/dashboard");
      } else {
        router.push("/admin/dashboard");
      }
    }, 1500);
  }

  return (
    <div className="container max-w-md mx-auto py-12 px-4">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Iniciar Sesión</h1>
          <p className="text-muted-foreground">
            Ingresa tus credenciales para acceder a tu cuenta
          </p>
        </div>
        
        <Tabs 
          defaultValue="cliente" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="cliente">Cliente</TabsTrigger>
            <TabsTrigger value="mensajero">Mensajero</TabsTrigger>
            <TabsTrigger value="admin">Administrador</TabsTrigger>
          </TabsList>
          
          {["cliente", "mensajero", "admin"].map((role) => (
            <TabsContent key={role} value={role} className="space-y-4 mt-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                  </Button>
                </form>
              </Form>
              
              <div className="text-center text-sm">
                <Link href="/auth/recuperar-contrasena" className="text-primary hover:underline">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    o
                  </span>
                </div>
              </div>
              
              <div className="text-center text-sm">
                ¿No tienes una cuenta?{" "}
                <Link 
                  href={role === "mensajero" ? "/mensajeros/registro" : "/auth/registro"} 
                  className="text-primary hover:underline font-medium"
                >
                  Regístrate
                </Link>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
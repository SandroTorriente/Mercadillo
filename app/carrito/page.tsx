"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { dummyStores, dummyCouriers } from "@/lib/dummy-data";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Store, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, total, clearCart } = useCart();
  const [selectedStore, setSelectedStore] = useState<string | undefined>();
  const [selectedCourier, setSelectedCourier] = useState<string | undefined>();
  const [step, setStep] = useState<'cart' | 'delivery' | 'confirm'>('cart');
  
  const subtotal = total;
  const deliveryFee = selectedCourier ? 5.99 : 0;
  const finalTotal = subtotal + deliveryFee;
  
  const proceedToDelivery = () => {
    if (items.length === 0) {
      toast.error("Tu carrito está vacío");
      return;
    }
    setStep('delivery');
  };
  
  const proceedToConfirm = () => {
    if (!selectedStore) {
      toast.error("Por favor selecciona una tienda");
      return;
    }
    if (!selectedCourier) {
      toast.error("Por favor selecciona un mensajero");
      return;
    }
    setStep('confirm');
  };
  
  const placeOrder = () => {
    // In a real app, this would submit the order to an API
    toast.success("¡Pedido realizado con éxito! Tu número de reserva es: #" + Math.floor(10000 + Math.random() * 90000));
    clearCart();
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <PageHeader 
        title="Tu Carrito" 
        description={step === 'cart' ? "Revisa tus productos seleccionados" : step === 'delivery' ? "Elige tienda y mensajero" : "Confirma tu pedido"}
      />
      
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <div className="flex-1">
          {step === 'cart' && (
            <Card>
              <CardHeader>
                <CardTitle>Productos ({items.length})</CardTitle>
                <CardDescription>Productos en tu carrito de compras</CardDescription>
              </CardHeader>
              <CardContent>
                {items.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">Imagen</TableHead>
                        <TableHead>Producto</TableHead>
                        <TableHead className="text-right">Precio</TableHead>
                        <TableHead className="text-center">Cantidad</TableHead>
                        <TableHead className="text-right">Subtotal</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="relative h-16 w-16 rounded overflow-hidden">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                          <TableCell>
                            <div className="flex justify-center items-center">
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="text-muted-foreground hover:text-destructive"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-12">
                    <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">Tu carrito está vacío</h3>
                    <p className="mt-1 text-muted-foreground">
                      Parece que aún no has agregado productos a tu carrito
                    </p>
                    <Button className="mt-6" asChild>
                      <Link href="/productos">Explorar Productos</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
              {items.length > 0 && (
                <CardFooter className="flex justify-between">
                  <Link href="/productos">
                    <Button variant="outline">Seguir Comprando</Button>
                  </Link>
                  <Button onClick={proceedToDelivery}>
                    Continuar <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              )}
            </Card>
          )}
          
          {step === 'delivery' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Store className="h-5 w-5" /> Selecciona una Tienda
                  </CardTitle>
                  <CardDescription>
                    Elige desde qué tienda quieres que se recojan tus productos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={selectedStore} onValueChange={setSelectedStore}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccionar tienda" />
                    </SelectTrigger>
                    <SelectContent>
                      {dummyStores.map((store) => (
                        <SelectItem key={store.id} value={store.id.toString()}>
                          {store.name} - {store.address}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {selectedStore && (
                    <div className="mt-4">
                      <div className="relative h-36 w-full rounded-lg overflow-hidden">
                        <Image
                          src={dummyStores[Number(selectedStore) - 1].image}
                          alt={dummyStores[Number(selectedStore) - 1].name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                          <div className="p-4 text-white">
                            <h3 className="font-bold">{dummyStores[Number(selectedStore) - 1].name}</h3>
                            <p className="text-sm">{dummyStores[Number(selectedStore) - 1].address}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" /> Selecciona un Mensajero
                  </CardTitle>
                  <CardDescription>
                    Elige quién entregará tu pedido
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dummyCouriers
                      .filter(courier => courier.status === "active")
                      .map((courier) => (
                        <div 
                          key={courier.id}
                          className={cn(
                            "border rounded-lg p-4 cursor-pointer transition-all",
                            selectedCourier === courier.id.toString()
                              ? "border-primary bg-primary/5"
                              : "hover:border-muted-foreground/50"
                          )}
                          onClick={() => setSelectedCourier(courier.id.toString())}
                        >
                          <div className="flex items-center gap-4">
                            <div className="relative h-12 w-12 rounded-full overflow-hidden">
                              <Image 
                                src={courier.avatar} 
                                alt={courier.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">{courier.name}</div>
                              <div className="text-sm text-muted-foreground flex items-center gap-1">
                                <Badge variant="outline" className="text-xs">
                                  {courier.transportType}
                                </Badge>
                                <span className="mx-1">•</span>
                                <span>Hasta {courier.maxWeight}kg</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep('cart')}>
                    Volver
                  </Button>
                  <Button onClick={proceedToConfirm}>
                    Continuar <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
          
          {step === 'confirm' && (
            <Card>
              <CardHeader>
                <CardTitle>Confirma tu Pedido</CardTitle>
                <CardDescription>
                  Revisa los detalles de tu pedido antes de finalizar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Productos</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Producto</TableHead>
                        <TableHead className="text-right">Cantidad</TableHead>
                        <TableHead className="text-right">Precio</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell className="text-right">{item.quantity}</TableCell>
                          <TableCell className="text-right">
                            ${(item.price * item.quantity).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-2">Tienda</h3>
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 rounded-lg overflow-hidden">
                        <Image 
                          src={dummyStores[Number(selectedStore) - 1].image} 
                          alt={dummyStores[Number(selectedStore) - 1].name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">
                          {dummyStores[Number(selectedStore) - 1].name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {dummyStores[Number(selectedStore) - 1].address}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Mensajero</h3>
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden">
                        <Image 
                          src={dummyCouriers[Number(selectedCourier) - 1].avatar} 
                          alt={dummyCouriers[Number(selectedCourier) - 1].name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">
                          {dummyCouriers[Number(selectedCourier) - 1].name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <Badge variant="outline" className="mr-1">
                            {dummyCouriers[Number(selectedCourier) - 1].transportType}
                          </Badge>
                          <Link 
                            href={`https://wa.me/${dummyCouriers[Number(selectedCourier) - 1].phone.replace(/\s+/g, '')}`}
                            target="_blank"
                            className="text-primary hover:underline"
                          >
                            Contactar por WhatsApp
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setStep('delivery')}>
                  Volver
                </Button>
                <Button onClick={placeOrder}>
                  Finalizar Pedido
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
        
        <div className="w-full md:w-80">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Tarifa de entrega</span>
                <span>{selectedCourier ? `$${deliveryFee.toFixed(2)}` : "Por definir"}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
              
              <div className="pt-4 text-xs text-muted-foreground">
                * La tarifa final de entrega se confirmará con el mensajero seleccionado.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
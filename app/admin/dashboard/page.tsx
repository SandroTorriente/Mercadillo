"use client";

import { useState } from "react";
import { PageHeader } from "@/components/common/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Pencil, 
  Trash2, 
  Plus,
  ShoppingBag,
  Store,
  Tag,
  Ticket,
  Users,
  Truck,
  BarChart4
} from "lucide-react";

import { dummyProducts, dummyStores, dummyCouriers, dummyCategories, dummyOffers } from "@/lib/dummy-data";
import Link from "next/link";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto py-8 px-4">
      <PageHeader
        title="Panel de Administración"
        description="Gestiona productos, tiendas, ofertas y mensajeros"
        action={<Button size="sm">Nueva Entrada</Button>}
      />
      
      <Tabs 
        defaultValue="overview" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="mt-8"
      >
        <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full mb-8">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart4 className="h-4 w-4" />
            <span className="hidden md:inline">Resumen</span>
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden md:inline">Productos</span>
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            <span className="hidden md:inline">Categorías</span>
          </TabsTrigger>
          <TabsTrigger value="stores" className="flex items-center gap-2">
            <Store className="h-4 w-4" />
            <span className="hidden md:inline">Tiendas</span>
          </TabsTrigger>
          <TabsTrigger value="offers" className="flex items-center gap-2">
            <Ticket className="h-4 w-4" />
            <span className="hidden md:inline">Ofertas</span>
          </TabsTrigger>
          <TabsTrigger value="couriers" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            <span className="hidden md:inline">Mensajeros</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <AdminOverviewCard 
              title="Productos" 
              value={dummyProducts.length} 
              icon={<ShoppingBag className="h-5 w-5" />}
              href="/admin/productos"
            />
            <AdminOverviewCard 
              title="Categorías" 
              value={dummyCategories.length} 
              icon={<Tag className="h-5 w-5" />}
              href="/admin/categorias"
            />
            <AdminOverviewCard 
              title="Tiendas" 
              value={dummyStores.length} 
              icon={<Store className="h-5 w-5" />}
              href="/admin/tiendas"
            />
            <AdminOverviewCard 
              title="Mensajeros" 
              value={dummyCouriers.length} 
              icon={<Truck className="h-5 w-5" />}
              href="/admin/mensajeros"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Últimos Pedidos</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Tienda</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>#34521</TableCell>
                      <TableCell>María González</TableCell>
                      <TableCell>Mercado Central</TableCell>
                      <TableCell>
                        <Badge className="bg-amber-500">En proceso</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>#34520</TableCell>
                      <TableCell>José Pérez</TableCell>
                      <TableCell>Tienda Gourmet</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Entregado</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>#34519</TableCell>
                      <TableCell>Ana Ramírez</TableCell>
                      <TableCell>Boutique Moderna</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Entregado</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Mensajeros Activos</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Transporte</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyCouriers
                      .filter(courier => courier.status === "active")
                      .map((courier) => (
                        <TableRow key={courier.id}>
                          <TableCell>{courier.name}</TableCell>
                          <TableCell>{courier.transportType}</TableCell>
                          <TableCell>
                            <Badge className="bg-green-500">Activo</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="products">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Productos</CardTitle>
              <Button size="sm" className="flex items-center gap-1">
                <Plus className="h-4 w-4" /> Nuevo Producto
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div className="relative w-64">
                  <Input placeholder="Buscar producto..." className="pl-8" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead className="text-right">Precio</TableHead>
                      <TableHead>Tiendas</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyProducts.slice(0, 10).map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                        <TableCell>{product.stores.length}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="categories">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Categorías</CardTitle>
              <Button size="sm" className="flex items-center gap-1">
                <Plus className="h-4 w-4" /> Nueva Categoría
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Productos</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyCategories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell className="font-medium">{category.name}</TableCell>
                        <TableCell>{category.count}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="stores">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Tiendas</CardTitle>
              <Button size="sm" className="flex items-center gap-1">
                <Plus className="h-4 w-4" /> Nueva Tienda
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Dirección</TableHead>
                      <TableHead>Coordenadas</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyStores.map((store) => (
                      <TableRow key={store.id}>
                        <TableCell className="font-medium">{store.name}</TableCell>
                        <TableCell>{store.address}</TableCell>
                        <TableCell>
                          {store.location.lat.toFixed(4)}, {store.location.lng.toFixed(4)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="couriers">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Mensajeros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Teléfono</TableHead>
                      <TableHead>Transporte</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyCouriers.map((courier) => (
                      <TableRow key={courier.id}>
                        <TableCell className="font-medium">{courier.name}</TableCell>
                        <TableCell>{courier.phone}</TableCell>
                        <TableCell>{courier.transportType}</TableCell>
                        <TableCell>
                          <Badge className={courier.status === "active" ? "bg-green-500" : "bg-muted"}>
                            {courier.status === "active" ? "Activo" : "Inactivo"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="offers">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Ofertas</CardTitle>
              <Button size="sm" className="flex items-center gap-1">
                <Plus className="h-4 w-4" /> Nueva Oferta
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Descuento</TableHead>
                      <TableHead>Productos</TableHead>
                      <TableHead>Válido Hasta</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyOffers.map((offer) => (
                      <TableRow key={offer.id}>
                        <TableCell className="font-medium">{offer.title}</TableCell>
                        <TableCell>
                          {offer.discount > 0 ? (
                            <Badge>{offer.discount}% OFF</Badge>
                          ) : (
                            <Badge variant="outline">Especial</Badge>
                          )}
                        </TableCell>
                        <TableCell>{offer.products.length} productos</TableCell>
                        <TableCell>{new Date(offer.validUntil).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface AdminOverviewCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  href: string;
}

function AdminOverviewCard({ title, value, icon, href }: AdminOverviewCardProps) {
  return (
    <Link href={href}>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="text-3xl font-bold">{value}</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-full">
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
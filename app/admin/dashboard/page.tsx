"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/common/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  BarChart4,
  Image as ImageIcon,
  MapPin
} from "lucide-react";
import { dummyProducts, dummyStores, dummyCouriers, dummyCategories, dummyOffers } from "@/lib/dummy-data";
import Link from "next/link";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface CreateDialogProps {
  type: 'product' | 'category' | 'store' | 'offer' | 'couriers';
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
   defaultData?: any;
}

function CreateDialog({ type, open, onOpenChange, onSubmit, defaultData }: CreateDialogProps) {
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (defaultData) {
      setFormData(defaultData);
    } else {
      setFormData({}); // limpia si es nuevo
    }
  }, [defaultData]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({});
  };

  const dialogContent = {
    product: {
      title: "Nuevo Producto",
      fields: [
        { name: "name", label: "Nombre", type: "text" },
        { name: "price", label: "Precio", type: "number" },
        { name: "description", label: "Descripción", type: "textarea" },
        { name: "category", label: "Categoría", type: "select", options: dummyCategories },
        { name: "image", label: "URL de la imagen", type: "text" }
      ]
    },
    category: {
      title: "Nueva Categoría",
      fields: [
        { name: "name", label: "Nombre", type: "text" },
        { name: "image", label: "URL de la imagen", type: "text" }
      ]
    },
    store: {
      title: "Nueva Tienda",
      fields: [
        { name: "name", label: "Nombre", type: "text" },
        { name: "address", label: "Dirección", type: "text" },
        { name: "image", label: "URL de la imagen", type: "text" },
        { name: "lat", label: "Latitud", type: "number" },
        { name: "lng", label: "Longitud", type: "number" }
      ]
    },
    offer: {
      title: "Nueva Oferta",
      fields: [
        { name: "title", label: "Título", type: "text" },
        { name: "description", label: "Descripción", type: "textarea" },
        { name: "discount", label: "Descuento (%)", type: "number" },
        { name: "validUntil", label: "Válido hasta", type: "date" },
        { name: "image", label: "URL de la imagen", type: "text" }
      ]
    },
    couriers: {
      title: "Nuevo Mensajero",
      fields: [
    { name: "email", label: "Correo", type: "email" },
    { name: "password", label: "Contraseña", type: "password" },
    { name: "name", label: "Nombre", type: "text" },
    { name: "phone", label: "Teléfono", type: "text" },
    { name: "transport_type", label: "Medio de Transporte", type: "text" },
    { name: "rate", label: "Tarifa", type: "text" },
    { name: "max_weight", label: "Peso Máximo", type: "number" }
  ]
}
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{dialogContent[type].title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {dialogContent[type].fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name}>{field.label}</Label>
              {field.type === "textarea" ? (
                <Textarea
                  id={field.name}
                  value={formData[field.name] || ""}
                  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                />
              ) : field.type === "select" ? (
                <Select
                  value={formData[field.name]}
                  onValueChange={(value) => setFormData({ ...formData, [field.name]: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options.map((option: any) => (
                      <SelectItem key={option.id} value={option.name}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  id={field.name}
                  type={field.type}
                  value={formData[field.name] || ""}
                  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                />
              )}
            </div>
          ))}
          <DialogFooter>
            <Button type="submit">Crear {dialogContent[type].title.split(" ")[1]}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminDashboard() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(tab ?? "couriers"); // sin hooks rotos

  const [createDialog, setCreateDialog] = useState<{
    type: 'product' | 'category' | 'store' | 'offer' | 'couriers' | null;
    open: boolean;
  }>({ type: null, open: false });
  const { data: session, status } = useSession();
  const [couriers, setCouriers] = useState<any[]>([]);
  const [editData, setEditData] = useState<any | null>(null);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  useEffect(() => {
    fetch("/api/admin/mensajeros")
      .then((res) => res.json())
      .then(setCouriers)
      .catch(() => setCouriers([]));
  }, []);

  if (status === "loading") {
    return <p className="text-center">Cargando...</p>;
  }

    // ✅ Este redirect debería ejecutarse dentro de useEffect
  useEffect(() => {
    if (status === "authenticated" && session?.user.role !== "admin") {
      redirect("/");
    }
  }, [session, status]);

  const handleCreate = async (data: any) => {
    if (editData?.id) {
      await fetch(`/api/admin/mensajeros/${editData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      toast.success("Mensajero actualizado");
    } else {
      await fetch("/api/admin/crear-mensajero", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      toast.success("Mensajero creado con éxito");
    }

    setCreateDialog({ type: null, open: false });
    setEditData(null);

    fetch("/api/admin/mensajeros")
      .then((res) => res.json())
      .then(setCouriers);
  };

  const handleDeleteCourier = async (id: number) => {
    if (confirm("¿Estás seguro de que deseas eliminar este mensajero?")) {
      const res = await fetch(`/api/admin/mensajeros/${id}`, { method: "DELETE" });

      if (!res.ok) {
        toast.error("Error al eliminar");
        return;
      }

      toast.success("Mensajero eliminado");
      setCouriers((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <PageHeader
        title="Panel de Administración"
        description="Gestiona productos, tiendas, ofertas y mensajeros"
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
              href="/admin/dashboard?tab=products"
            />
            <AdminOverviewCard 
              title="Categorías" 
              value={dummyCategories.length} 
              icon={<Tag className="h-5 w-5" />}
              href="/admin/dashboard?tab=categories"
            />
            <AdminOverviewCard 
              title="Tiendas" 
              value={dummyStores.length} 
              icon={<Store className="h-5 w-5" />}
              href="/admin/dashboard?tab=stores"
            />
            <AdminOverviewCard 
              title="Mensajeros" 
              value={dummyCouriers.length} 
              icon={<Truck className="h-5 w-5" />}
              href="/admin/dashboard?tab=couriers"
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
              <Button 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => setCreateDialog({ type: 'product', open: true })}
              >
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
              <Button 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => setCreateDialog({ type: 'category', open: true })}
              >
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
              <Button 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => setCreateDialog({ type: 'store', open: true })}
              >
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
              <Button 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => setCreateDialog({ type: 'couriers', open: true })}
              >
                <Plus className="h-4 w-4" /> Nuevo Mensajero
              </Button>
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
                    {couriers.map((courier) => (
                      <TableRow key={courier.id}>
                        <TableCell className="font-medium">{courier.name}</TableCell>
                        <TableCell>{courier.phone}</TableCell>
                        <TableCell>{courier.transport_type}</TableCell>
                        <TableCell>
                          <Badge className={courier.is_available ? "bg-green-500" : "bg-muted"}>
                            {courier.is_available ? "Activo" : "Inactivo"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setEditData(courier);
                                setCreateDialog({ type: "couriers", open: true });
                                      }}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteCourier(courier.id)}>
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
              <Button 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => setCreateDialog({ type: 'offer', open: true })}
              >
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

      {createDialog.type && (
        <CreateDialog
          type={createDialog.type}
          open={createDialog.open}
          onOpenChange={(open) => setCreateDialog({ ...createDialog, open })}
          onSubmit={handleCreate}
          defaultData={editData}
        />
      )}
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
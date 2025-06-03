import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { dummyOffers } from "@/lib/dummy-data";

interface OfferCardProps {
  offer: {
    id: number;
    title: string;
    description: string;
    validUntil: string;
    image: string;
    discount: number;
  };
}

const OfferCard = ({ offer }: OfferCardProps) => {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }).format(date);
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48">
        <Image
          src={offer.image}
          alt={offer.title}
          fill
          className="object-cover"
        />
        {offer.discount > 0 && (
          <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
            {offer.discount}% OFF
          </Badge>
        )}
      </div>
      <CardContent className="p-4 flex-grow flex flex-col">
        <h3 className="text-xl font-bold">{offer.title}</h3>
        <p className="text-muted-foreground mt-2 flex-grow">{offer.description}</p>
        <div className="mt-4 text-sm text-muted-foreground">
          Válido hasta: {formatDate(offer.validUntil)}
        </div>
        <Link href={`/ofertas/${offer.id}`} className="mt-4">
          <Button className="w-full">Ver Oferta</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default function SpecialOffers() {
  return (
    <section className="py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Ofertas Especiales</h2>
        <Link href="/ofertas">
          <Button variant="outline">Ver Todas</Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dummyOffers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
    </section>
  );
}
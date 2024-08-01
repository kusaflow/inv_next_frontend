"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAppContext } from "@mycontext/AppContext";
import DeleteConfirmation from "@components/DeleteConfirmation";


const Prop_card = ({ property, isPropertyCreator}) => {
  const userId = "kunal";

  const context = useAppContext();

  var canBookTour = false;

  if (context.Luser.user && context.Luser.user.role === "customer"){
    canBookTour = true;
  }

  const formatIndianCurrency = (amount) => {
    return amount.toLocaleString('en-IN');
  };

  return (
    <>
    
      <div className="my-20 mx-5 group relative flex min-h-[380px] max-h-[500] w-full max-w-[700px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
        {/* Carousel for Property Images */}
        <Carousel className="w-full max-w-xl mx-auto">
          <CarouselContent>
            {property.images.map((img, index) => (
              <CarouselItem key={index}>
                <Link href={property.tourLink}>
                  <Image
                    src={img}
                    alt={`Property Image ${index}`}
                    width={400}
                    height={300}
                    layout="responsive"
                    objectFit="cover"
                  />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        {isPropertyCreator && (
          <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
            <Link href={`/admin/${property._id}`} passHref>
              <Image
                src="/assets/icons/edit.svg"
                alt="edit"
                width={20}
                height={20}
              />
            </Link>
            <DeleteConfirmation Property_ID={property._id} />
          </div>
        )}

        <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
          <p className="logo_text">{property.name}</p>
          <p className="p-medium-16 text-grey-500">{property.description}</p>
          <p className="text-sm text-gray-600">Size: {property.size} sqft</p>
          <p className="text-sm text-gray-600">Location: {property.location}</p>
          <div className="flex flex-wrap gap-2">
            {property.amenities.map((amenity, index) => (
              <span
                key={index}
              >
                <Badge variant="outline">{amenity}</Badge>                
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-600">
            ₹{formatIndianCurrency(property.price)}
            </span>
          </div>
            
        {canBookTour ?( 
          <div className="flex-between w-full">
            {/*<Link href={`/booking/${property._id}`}>*/}
            <Link href={`/booking/addBooking/${property._id}`}>
              <p className="flex items-center gap-2 text-primary-500"></p>
              <Button variant="link" className = "flex items-center gap-4 text-primary-500">
                Book Tour
                <Image
                  src="/assets/icons/arrow.svg"
                  alt="booking"
                  width={10}
                  height={10}
                />
                </Button>
                
            </Link>
          </div>
          ):(<></>)}
        </div>
      </div>
    </>
  );
};

export default Prop_card;

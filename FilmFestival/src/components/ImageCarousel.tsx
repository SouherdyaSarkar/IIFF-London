import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import kolkata1 from "@/assets/kolkata-1.png";
import kolkata2 from "@/assets/kolkata-2.png";
import kolkata3 from "@/assets/kolkata-3.png";
import kolkata4 from "@/assets/kolkata-4.png";

const images = [
  { src: kolkata1, alt: "Victoria Memorial with Reflection" },
  { src: kolkata2, alt: "Kolkata Cityscape with Trams" },
  { src: kolkata3, alt: "Kolkata Tram and Architecture" },
  { src: kolkata4, alt: "Indian Festival Sweets" },
];

const ImageCarousel = () => {
  return (
    <section className="bg-primary py-12 pb-16">
      <div className="container mx-auto px-4">
        <Carousel className="w-full max-w-6xl mx-auto">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-2">
                  <div className="bg-foreground/90 p-4 rounded-sm shadow-2xl border-8 border-foreground">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-64 object-cover rounded-sm"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>
    </section>
  );
};

export default ImageCarousel;

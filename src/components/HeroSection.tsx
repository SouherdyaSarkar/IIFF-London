import filmCamera from "@/assets/film-camera.png";

const HeroSection = () => {
  return (
    <section className="bg-primary text-primary-foreground py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative flex items-center justify-center">
            <img
              src={filmCamera}
              alt="Vintage Film Camera"
              className="w-64 h-64 md:w-80 md:h-80 object-contain filter drop-shadow-2xl"
            />
            <div className="absolute top-8 left-8 bg-foreground text-background px-6 py-3 font-bold text-xl tracking-wider">
              10TH JANUARY
            </div>
          </div>
          <div className="text-center md:text-left space-y-6">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black uppercase tracking-tight leading-tight">
              Consortium of Film and Content Creators Festival Kolkata Chapter
            </h1>
            <div className="inline-block">
              <div className="bg-background text-primary px-8 py-4 rounded-lg shadow-2xl">
                <div className="text-accent font-heading font-black text-2xl md:text-3xl uppercase tracking-wide">
                  Our Venue
                </div>
                <div className="text-accent font-heading font-black text-3xl md:text-4xl uppercase tracking-wider">
                  Nandan
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

import {
  Mail,
  Instagram,
  Phone,
  MapPin,
  Calendar,
  Users,
  Award,
  ExternalLink,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#be1111] text-secondary-foreground">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-heading font-black uppercase mb-6 tracking-tight text-white">
              About CFCC
            </h3>
            <p className="text-sm leading-relaxed opacity-90 font-body">
              Cosmo Smart Society brings together innovators, creators, and
              thinkers for an unforgettable celebration of science, technology,
              and culture.
            </p>
            <div className="flex gap-4 pt-4">
              <a
                href="#"
                className="w-10 h-10 bg-primary/10 hover:bg-primary hover:text-primary-foreground rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 border-2 border-primary/20"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary/10 hover:bg-primary hover:text-primary-foreground rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 border-2 border-primary/20"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary/10 hover:bg-primary hover:text-primary-foreground rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 border-2 border-primary/20"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
            <p className="text-xs">
              Made with love by{" "}
              <strong>
                Souherdya Sarkar, Debangshu Chatterjee, Debangkita Saha, Aranya
                Rath, Sylvia Barick, Debojyoti Dey Majumder
              </strong>
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-2xl font-heading font-black uppercase mb-6 tracking-tight text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                "Events",
                "Schedule",
                "Registration",
                "Sponsors",
                "Gallery",
                "FAQs",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="hover:text-primary hover:translate-x-2 
                    inline-flex items-center gap-2 transition-all duration-300 
                    text-sm font-body font-bold group"
                  >
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-heading font-black uppercase mb-6 tracking-tight text-white">
              Get in Touch
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <Mail className="w-5 h-5 text-primary mt-1 group-hover:scale-110 transition-transform" />
                <div className="text-sm font-body font-semibold">
                  <p className="hover:text-primary transition-colors cursor-pointer">
                    cfccosmartsciety.org
                  </p>
                  <p className="hover:text-primary transition-colors cursor-pointer">
                    sanghamitraicm.edu.in
                  </p>
                  <p className="hover:text-primary transition-colors cursor-pointer">
                    malav.gangulyeiem.edu.in
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 group">
                <Phone className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                <p className="text-sm font-body font-semibold hover:text-primary transition-colors cursor-pointer">
                  +91 8240005041
                </p>
              </div>
              <div className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                <p className="text-sm font-body font-semibold">
                  The House of Lords, London
                  <br />
                  United Kingdom
                </p>
              </div>
            </div>
          </div>

          {/* Venue & Stats */}
          <div className="space-y-6">
            <h3 className="text-2xl font-heading font-black uppercase mb-6 tracking-tight text-white">
              Event Info
            </h3>

            {/* Mini Map */}
            <div className="rounded-xl overflow-hidden border-4 border-primary/30 shadow-2xl h-64 relative group">
              <iframe
                title="Nandan Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.1960741614856!2d88.34449307595653!3d22.542260979521548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02773d082e49c5%3A0x696d25c1090aa5bc!2sNandan!5e0!3m2!1sen!2sin!4v1729172345678!5m2!1sen!2sin"
                className="w-full h-full border-0 scale-100"
                style={{ minHeight: "100%", minWidth: "100%" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="absolute top-3 left-3 bg-background/95 backdrop-blur-sm px-3 py-1.5 rounded-lg border-2 border-primary shadow-lg">
                <p className="text-xs font-heading font-black text-primary">
                  📍 View Larger Map
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-4 border-background/20 bg-background/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-6 text-xs font-body font-bold">
              <a href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <span>•</span>
              <a href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
              <span>•</span>
              <a href="#" className="hover:text-primary transition-colors">
                Support
              </a>
            </div>
            <p className="text-sm font-body font-bold">
              © CFCCF 2026<span className="text-accent"></span> in Kolkata
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

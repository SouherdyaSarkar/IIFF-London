import {
  Mail,
  Instagram,
  Phone,
  MapPin,
  ExternalLink,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#be1111] text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">

          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-heading font-black uppercase mb-6 tracking-tight text-white">
              About CFCC
            </h3>

            <p className="text-sm leading-relaxed text-white/90">
              Cosmo Smart Society brings together innovators, creators, and
              thinkers for an unforgettable celebration of science, technology,
              and culture.
            </p>

            <div className="flex gap-4 pt-4">
              {[Instagram, Mail, Phone].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-white/10 hover:bg-[#FFD166] hover:text-black
                  rounded-lg flex items-center justify-center
                  transition-all duration-300 hover:scale-110 border border-white/30"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            <p className="text-xs text-white/80">
              Made with love by{" "}
              <strong>
                Souherdya Sarkar,Debangkita Saha,
                Aranya Rath
              </strong>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-heading font-black uppercase mb-6 text-white">
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
                    className="inline-flex items-center gap-2
                    text-sm font-bold text-white/90
                    hover:text-[#FFD166] transition-all duration-300"
                  >
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-heading font-black uppercase mb-6 text-white">
              Get in Touch
            </h3>

            <div className="space-y-4 text-white/90">

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#FFD166] mt-1" />
                <div className="text-sm font-semibold">
                  <p className="hover:text-[#FFD166] cursor-pointer">
                    cfccosmartsciety.org
                  </p>
                  <p className="hover:text-[#FFD166] cursor-pointer">
                    sanghamitraicm.edu.in
                  </p>
                  <p className="hover:text-[#FFD166] cursor-pointer">
                    malav.gangulyeiem.edu.in
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#FFD166]" />
                <p className="text-sm font-semibold hover:text-[#FFD166] cursor-pointer">
                  +91 8240005041
                </p>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#FFD166]" />
                <p className="text-sm font-semibold">
                  The House of Lords, London
                  <br />
                  United Kingdom
                </p>
              </div>

            </div>
          </div>

          {/* Venue */}
          <div>
            <h3 className="text-2xl font-heading font-black uppercase mb-6 text-white">
              Event Info
            </h3>

            <div className="rounded-xl overflow-hidden border-2 border-white/30 shadow-xl h-64 relative">
              <iframe
                title="Nandan Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.1960741614856!2d88.34449307595653!3d22.542260979521548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02773d082e49c5%3A0x696d25c1090aa5bc!2sNandan!5e0!3m2!1sen!2sin!4v1729172345678!5m2!1sen!2sin"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 bg-black/10">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <div className="flex gap-6 text-xs font-bold text-white/80">
            <a href="#" className="hover:text-[#FFD166]">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-[#FFD166]">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-[#FFD166]">Support</a>
          </div>

          <p className="text-sm font-bold text-white/90">
            © CFCCF 2026 in Kolkata
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import {
  Mail,
  Phone,
  Instagram,
  Loader2,
  ArrowUpRight,
  MessageCircle,
  MapPin,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FOOTER } from "@/content";

const BACKEND = process.env.REACT_APP_BACKEND_URL || "";
const API = BACKEND ? `${BACKEND}/api` : "";
const WHATSAPP_NUMBER = "918287738890";

// Simple service list for the dropdown — kept inline so content.js stays clean.
const SERVICE_OPTIONS = [
  "Motion Graphics & Editing",
  "Outdoor Shoot & Event Shoots",
  "Podcast Shoot",
  "SEO & Social Media Management",
  "Thumbnail Design",
  "Corporate & Commercial Video",
  "Other",
];

const buildWhatsAppUrl = (form) => {
  const lines = [
    "Hi Dhanusha Production! I'd like to book a shoot.",
    "",
    `Name: ${form.name || "-"}`,
    `Phone: ${form.phone || "-"}`,
    `Email: ${form.email || "-"}`,
    form.service ? `Service: ${form.service}` : null,
    "",
    `Project details: ${form.message || "-"}`,
  ].filter(Boolean);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
};

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [loading, setLoading] = useState(false);
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.message) {
      toast.error("Please fill in name, email, phone and message.");
      return;
    }
    setLoading(true);

    const openWhatsApp = () => {
      const url = buildWhatsAppUrl(form);
      window.open(url, "_blank", "noopener,noreferrer");
    };

    if (!API) {
      toast.success("Opening WhatsApp with your details...");
      openWhatsApp();
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${API}/leads`, form, { timeout: 8000 });
      toast.success("Thanks! We'll get back to you within 24 hours.");
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
    } catch (err) {
      toast.success("Opening WhatsApp so we can chat directly...");
      openWhatsApp();
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
    } finally {
      setLoading(false);
    }
  };

  const whatsappUrl = buildWhatsAppUrl(form);

  return (
    <section
      id="book"
      className="relative bg-[#050505] py-14 md:py-20 overflow-hidden"
      data-testid="contact-section"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 md:px-10 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        {/* Left column — copy + quick contact */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-poster uppercase tracking-[0.28em] text-[11px] sm:text-xs text-gold mb-4">
            Get In Touch
          </p>
          <h2 className="font-poster uppercase text-4xl sm:text-5xl md:text-6xl leading-[0.95] text-white">
            Ready To
            <br />
            <span className="text-gold">Press Record?</span>
          </h2>
          <p className="mt-4 md:mt-5 text-white/70 text-[15px] sm:text-base md:text-lg max-w-md leading-relaxed">
            Tell us about your channel, brand or next episode. We shoot anywhere across{" "}
            {FOOTER.region} and reply within 24 hours.
          </p>

          <div className="mt-7 grid grid-cols-1 gap-2.5 max-w-md">
            <a
              href={`tel:${FOOTER.phone}`}
              data-testid="contact-phone"
              className="flex items-center gap-3 font-medium text-white min-h-[48px] bg-white/[0.04] hover:bg-gold/10 hover:text-gold border border-white/10 hover:border-gold/40 rounded-lg px-4 py-2.5 transition-colors"
            >
              <Phone size={17} className="text-gold" /> <span>{FOOTER.phoneDisplay}</span>
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Dhanusha%20Production!%20I'd%20like%20to%20book%20a%20shoot.`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 font-medium text-white min-h-[48px] bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/40 rounded-lg px-4 py-2.5 transition-colors"
            >
              <MessageCircle size={17} className="text-[#25D366]" /> <span>WhatsApp us</span>
            </a>
            <a
              href={`mailto:${FOOTER.email}`}
              data-testid="contact-email"
              className="flex items-center gap-3 font-medium text-white min-h-[48px] bg-white/[0.04] hover:bg-gold/10 hover:text-gold border border-white/10 hover:border-gold/40 rounded-lg px-4 py-2.5 transition-colors"
            >
              <Mail size={17} className="text-gold" />{" "}
              <span className="break-all text-[14px]">{FOOTER.email}</span>
            </a>
            <a
              href={FOOTER.instagram}
              target="_blank"
              rel="noreferrer"
              data-testid="contact-instagram"
              className="flex items-center gap-3 font-medium text-white min-h-[48px] bg-white/[0.04] hover:bg-gold/10 hover:text-gold border border-white/10 hover:border-gold/40 rounded-lg px-4 py-2.5 transition-colors"
            >
              <Instagram size={17} className="text-gold" /> <span>@dhanusha_production</span>
            </a>
            <div className="flex items-center gap-3 font-medium text-white/70 min-h-[44px] px-4 py-2 mt-1">
              <MapPin size={17} className="text-gold" />{" "}
              <span className="text-[14px]">Delhi based studio · Serving {FOOTER.region}</span>
            </div>
          </div>
        </motion.div>

        {/* Right column — form */}
        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl overflow-hidden bg-[#0c0c0c] border border-gold/20 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]"
          data-testid="contact-form"
        >
          <div className="p-5 sm:p-6 md:p-7 space-y-3.5 sm:space-y-4">
            <p className="font-poster uppercase tracking-[0.2em] text-gold text-xs sm:text-sm">
              Project Enquiry
            </p>
            <div className="grid sm:grid-cols-2 gap-3.5 sm:gap-4">
              <Input
                data-testid="input-name"
                name="name"
                autoComplete="name"
                placeholder="Your name"
                value={form.name}
                onChange={update("name")}
                className="bg-white/5 border-white/10 h-12 text-white placeholder:text-white/40 focus-visible:ring-gold text-base"
              />
              <Input
                data-testid="input-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="Phone"
                value={form.phone}
                onChange={update("phone")}
                className="bg-white/5 border-white/10 h-12 text-white placeholder:text-white/40 focus-visible:ring-gold text-base"
              />
            </div>
            <Input
              data-testid="input-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="Email address"
              value={form.email}
              onChange={update("email")}
              className="bg-white/5 border-white/10 h-12 text-white placeholder:text-white/40 focus-visible:ring-gold text-base"
            />
            <select
              data-testid="input-service"
              value={form.service}
              onChange={update("service")}
              className="w-full h-12 rounded-md bg-white/5 border border-white/10 px-3 text-base text-white focus:outline-none focus:ring-2 focus:ring-gold"
            >
              <option value="" className="bg-[#0c0c0c]">
                Which service are you after?
              </option>
              {SERVICE_OPTIONS.map((s) => (
                <option key={s} value={s} className="bg-[#0c0c0c]">
                  {s}
                </option>
              ))}
            </select>
            <Textarea
              data-testid="input-message"
              placeholder="Tell us about your project..."
              value={form.message}
              onChange={update("message")}
              rows={4}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-gold resize-none text-base"
            />
            <button
              type="submit"
              disabled={loading}
              data-testid="contact-submit"
              className="w-full h-12 rounded-full bg-gold text-[#050505] font-poster uppercase tracking-[0.12em] text-base sm:text-lg flex items-center justify-center gap-2 hover:brightness-110 transition disabled:opacity-70 active:scale-[0.98] shadow-[0_6px_20px_-6px_rgba(253,255,12,0.55)]"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  Send via WhatsApp <ArrowUpRight size={18} />
                </>
              )}
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="block w-full h-12 rounded-full bg-[#25D366] text-[#050505] font-poster uppercase tracking-[0.12em] text-sm flex items-center justify-center gap-2 hover:brightness-110 transition active:scale-[0.98]"
            >
              <MessageCircle size={16} /> Quick WhatsApp Chat
            </a>
            <p className="text-[11px] text-white/40 text-center leading-relaxed pt-1">
              Fill the form and tap the button — it'll open WhatsApp with your details
              pre-filled so we can reply instantly.
            </p>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;

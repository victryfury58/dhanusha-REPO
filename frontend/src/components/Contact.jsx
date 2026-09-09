import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { Mail, Phone, Instagram, Loader2, ArrowDownRight, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CONTACT, SERVICES } from "@/data";
import { SlateLabel, Sticker, Sparkle } from "@/components/FilmKit";

const BACKEND = process.env.REACT_APP_BACKEND_URL || "";
const API = BACKEND ? `${BACKEND}/api` : "";
const WHATSAPP_NUMBER = "918287738890";

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

    // Optimistic: try backend first if configured, but always fall back to WhatsApp
    // (site is deployed frontend-only right now).
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
      // Backend unreachable — fall back to WhatsApp so the customer still reaches us.
      toast.success("Opening WhatsApp so we can chat directly...");
      openWhatsApp();
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
    } finally {
      setLoading(false);
    }
  };

  const whatsappUrl = buildWhatsAppUrl(form);

  const inputCls = "hidden";
  void inputCls;

  return (
    <section id="book" className="relative bg-gold text-[#050505] py-14 md:py-20 overflow-hidden" data-testid="contact-section">
      <SlateLabel side="left" tone="dark" testid="book-slate-left">Take 10</SlateLabel>
      <SlateLabel side="right" tone="dark" testid="book-slate-right">Action!</SlateLabel>
      <Sparkle className="absolute top-24 right-[12%] opacity-70 hidden md:block" color="#050505" size={20} />

      <div className="max-w-5xl mx-auto px-5 sm:px-6 md:px-10 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }}>
          <Sticker rotate={-3} className="mb-5">Let&apos;s Roll</Sticker>
          <h2 className="font-poster uppercase text-4xl sm:text-5xl md:text-6xl leading-[0.95]">Ready To <br />Press Record?</h2>
          <p className="mt-4 text-[#050505]/80 text-[15px] sm:text-base md:text-lg max-w-md font-medium leading-relaxed">
            Tell us about your channel, brand or next episode. We shoot anywhere across {CONTACT.region} and reply within 24 hours.
          </p>

          <div className="mt-7 grid grid-cols-1 gap-2.5">
            <a href={`tel:${CONTACT.phone}`} data-testid="contact-phone"
               className="flex items-center gap-3 font-medium min-h-[44px] bg-[#050505]/5 hover:bg-[#050505]/10 rounded-md px-3 py-2 transition-colors">
              <Phone size={18} /> <span>{CONTACT.phoneDisplay}</span>
            </a>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Dhanusha%20Production!%20I'd%20like%20to%20book%20a%20shoot.`}
               target="_blank" rel="noreferrer"
               className="flex items-center gap-3 font-medium min-h-[44px] bg-[#050505]/5 hover:bg-[#050505]/10 rounded-md px-3 py-2 transition-colors">
              <MessageCircle size={18} /> <span>WhatsApp us</span>
            </a>
            <a href={`mailto:${CONTACT.email}`} data-testid="contact-email"
               className="flex items-center gap-3 font-medium min-h-[44px] bg-[#050505]/5 hover:bg-[#050505]/10 rounded-md px-3 py-2 transition-colors">
              <Mail size={18} /> <span className="break-all">{CONTACT.email}</span>
            </a>
            <a href={CONTACT.instagram} target="_blank" rel="noreferrer" data-testid="contact-instagram"
               className="flex items-center gap-3 font-medium min-h-[44px] bg-[#050505]/5 hover:bg-[#050505]/10 rounded-md px-3 py-2 transition-colors">
              <Instagram size={18} /> <span>@dhanusha_production</span>
            </a>
          </div>
        </motion.div>

        <motion.form onSubmit={submit} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay: 0.1 }}
                     className="rounded-lg overflow-hidden bg-[#050505] shadow-2xl" data-testid="contact-form">
          <div className="clapper-stripe h-4 md:h-5" />
          <div className="p-5 sm:p-6 md:p-7 space-y-3.5 sm:space-y-4">
            <p className="font-poster uppercase tracking-[0.2em] text-gold text-xs sm:text-sm">Production Call Sheet</p>
            <div className="grid sm:grid-cols-2 gap-3.5 sm:gap-4">
              <Input data-testid="input-name" name="name" autoComplete="name" placeholder="Your name" value={form.name} onChange={update("name")} className="bg-white/5 border-white/10 h-12 text-white placeholder:text-white/40 focus-visible:ring-gold text-base" />
              <Input data-testid="input-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="Phone" value={form.phone} onChange={update("phone")} className="bg-white/5 border-white/10 h-12 text-white placeholder:text-white/40 focus-visible:ring-gold text-base" />
            </div>
            <Input data-testid="input-email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="Email address" value={form.email} onChange={update("email")} className="bg-white/5 border-white/10 h-12 text-white placeholder:text-white/40 focus-visible:ring-gold text-base" />
            <select data-testid="input-service" value={form.service} onChange={update("service")}
                    className="w-full h-12 rounded-md bg-white/5 border border-white/10 px-3 text-base text-white focus:outline-none focus:ring-2 focus:ring-gold">
              <option value="" className="bg-[#0c0c0c]">Which service are you after?</option>
              {SERVICES.map((s) => <option key={s.title} value={s.title} className="bg-[#0c0c0c]">{s.title}</option>)}
            </select>
            <Textarea data-testid="input-message" placeholder="Tell us about your project..." value={form.message} onChange={update("message")} rows={4}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-gold resize-none text-base" />
            <button type="submit" disabled={loading} data-testid="contact-submit"
                    className="w-full h-12 sm:h-13 rounded-full bg-gold text-[#050505] font-poster uppercase tracking-[0.12em] text-base sm:text-lg flex items-center justify-center gap-2 hover:brightness-110 transition disabled:opacity-70 active:scale-[0.98]">
              {loading ? <Loader2 className="animate-spin" size={18} /> : <>Send via WhatsApp <ArrowDownRight size={18} /></>}
            </button>
            <a href={whatsappUrl} target="_blank" rel="noreferrer"
               className="block w-full h-12 rounded-full bg-[#25D366] text-[#050505] font-poster uppercase tracking-[0.12em] text-sm flex items-center justify-center gap-2 hover:brightness-110 transition active:scale-[0.98]">
              <MessageCircle size={16} /> Quick WhatsApp Chat
            </a>
            <p className="text-[11px] text-white/40 text-center leading-relaxed pt-1">
              Fill the form and tap the button — it'll open WhatsApp with your details pre-filled so we can reply instantly.
            </p>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;

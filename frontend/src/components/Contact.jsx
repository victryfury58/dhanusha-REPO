import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { Mail, Phone, Instagram, Loader2, ArrowDownRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CONTACT, SERVICES } from "@/data";
import { SlateLabel, Sticker, Sparkle } from "@/components/FilmKit";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

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
    try {
      await axios.post(`${API}/leads`, form);
      toast.success("Thanks! We'll get back to you within 24 hours.");
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
    } catch (err) {
      toast.error("Something went wrong. Please try again or WhatsApp us.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "hidden";
  void inputCls;

  return (
    <section id="book" className="relative bg-gold text-[#050505] py-16 md:py-20 overflow-hidden" data-testid="contact-section">
      <SlateLabel side="left" tone="dark" testid="book-slate-left">Take 10</SlateLabel>
      <SlateLabel side="right" tone="dark" testid="book-slate-right">Action!</SlateLabel>
      <Sparkle className="absolute top-24 right-[12%] opacity-70" color="#050505" size={20} />

      <div className="max-w-5xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }}>
          <Sticker rotate={-3} className="mb-6">Let&apos;s Roll</Sticker>
          <h2 className="font-poster uppercase text-5xl md:text-6xl leading-[0.95]">Ready To <br />Press Record?</h2>
          <p className="mt-5 text-[#050505]/80 text-base md:text-lg max-w-md font-medium">
            Tell us about your channel, brand or next episode. We shoot anywhere across {CONTACT.region} and reply within 24 hours.
          </p>

          <div className="mt-8 space-y-3">
            <a href={`mailto:${CONTACT.email}`} data-testid="contact-email" className="flex items-center gap-3 font-medium hover:opacity-70 transition-opacity"><Mail size={18} /> {CONTACT.email}</a>
            <a href={`tel:${CONTACT.phone}`} data-testid="contact-phone" className="flex items-center gap-3 font-medium hover:opacity-70 transition-opacity"><Phone size={18} /> {CONTACT.phoneDisplay}</a>
            <a href={CONTACT.instagram} target="_blank" rel="noreferrer" data-testid="contact-instagram" className="flex items-center gap-3 font-medium hover:opacity-70 transition-opacity"><Instagram size={18} /> @dhanusha_production</a>
          </div>
        </motion.div>

        <motion.form onSubmit={submit} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay: 0.1 }}
                     className="rounded-lg overflow-hidden bg-[#050505] shadow-2xl" data-testid="contact-form">
          <div className="clapper-stripe h-5" />
          <div className="p-6 md:p-7 space-y-4">
            <p className="font-poster uppercase tracking-[0.2em] text-gold text-sm">Production Call Sheet</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input data-testid="input-name" placeholder="Your name" value={form.name} onChange={update("name")} className="bg-white/5 border-white/10 h-12 text-white placeholder:text-white/40 focus-visible:ring-gold" />
              <Input data-testid="input-phone" placeholder="Phone" value={form.phone} onChange={update("phone")} className="bg-white/5 border-white/10 h-12 text-white placeholder:text-white/40 focus-visible:ring-gold" />
            </div>
            <Input data-testid="input-email" type="email" placeholder="Email address" value={form.email} onChange={update("email")} className="bg-white/5 border-white/10 h-12 text-white placeholder:text-white/40 focus-visible:ring-gold" />
            <select data-testid="input-service" value={form.service} onChange={update("service")}
                    className="w-full h-12 rounded-md bg-white/5 border border-white/10 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold">
              <option value="" className="bg-[#0c0c0c]">Which service are you after?</option>
              {SERVICES.map((s) => <option key={s.title} value={s.title} className="bg-[#0c0c0c]">{s.title}</option>)}
            </select>
            <Textarea data-testid="input-message" placeholder="Tell us about your project..." value={form.message} onChange={update("message")} rows={4}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-gold resize-none" />
            <button type="submit" disabled={loading} data-testid="contact-submit"
                    className="w-full h-12 rounded-full bg-gold text-[#050505] font-poster uppercase tracking-[0.12em] text-lg flex items-center justify-center gap-2 hover:brightness-110 transition disabled:opacity-70">
              {loading ? <Loader2 className="animate-spin" size={18} /> : <>Book a Shoot <ArrowDownRight size={18} /></>}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;

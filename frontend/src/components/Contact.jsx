import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { Mail, Phone, Instagram, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CONTACT, SERVICES } from "@/data";

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

  return (
    <section id="contact" className="relative py-28 md:py-36 bg-background overflow-hidden" data-testid="contact-section">
      <div className="spotlight absolute inset-0" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs tracking-[0.35em] text-gold uppercase mb-4">Let&apos;s Talk</p>
          <h2 className="heading-xl text-5xl md:text-7xl">Ready To<br />Press Record?</h2>
          <p className="text-muted-foreground text-base md:text-lg mt-6 max-w-md leading-relaxed">
            Tell us about your channel, brand or next episode. We&apos;ll craft a plan that fits.
          </p>

          <div className="mt-10 space-y-4">
            <a href={`mailto:${CONTACT.email}`} data-testid="contact-email" className="flex items-center gap-4 group">
              <span className="h-11 w-11 rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center text-gold group-hover:bg-primary group-hover:text-primary-foreground transition-colors"><Mail size={18} /></span>
              <span className="text-foreground/90 group-hover:text-gold transition-colors">{CONTACT.email}</span>
            </a>
            <a href={`tel:${CONTACT.phone}`} data-testid="contact-phone" className="flex items-center gap-4 group">
              <span className="h-11 w-11 rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center text-gold group-hover:bg-primary group-hover:text-primary-foreground transition-colors"><Phone size={18} /></span>
              <span className="text-foreground/90 group-hover:text-gold transition-colors">{CONTACT.phoneDisplay}</span>
            </a>
            <a href={CONTACT.instagram} target="_blank" rel="noreferrer" data-testid="contact-instagram" className="flex items-center gap-4 group">
              <span className="h-11 w-11 rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center text-gold group-hover:bg-primary group-hover:text-primary-foreground transition-colors"><Instagram size={18} /></span>
              <span className="text-foreground/90 group-hover:text-gold transition-colors">@dhanusha_production</span>
            </a>
          </div>
        </motion.div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass rounded-3xl p-8 space-y-5"
          data-testid="contact-form"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <Input data-testid="input-name" placeholder="Your name" value={form.name} onChange={update("name")} className="bg-white/5 border-white/10 h-12 focus-visible:ring-primary" />
            <Input data-testid="input-phone" placeholder="Phone" value={form.phone} onChange={update("phone")} className="bg-white/5 border-white/10 h-12 focus-visible:ring-primary" />
          </div>
          <Input data-testid="input-email" type="email" placeholder="Email address" value={form.email} onChange={update("email")} className="bg-white/5 border-white/10 h-12 focus-visible:ring-primary" />
          <select
            data-testid="input-service"
            value={form.service}
            onChange={update("service")}
            className="w-full h-12 rounded-md bg-white/5 border border-white/10 px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="" className="bg-[#0c0c0c]">Which service are you after?</option>
            {SERVICES.map((s) => (
              <option key={s.title} value={s.title} className="bg-[#0c0c0c]">{s.title}</option>
            ))}
          </select>
          <Textarea data-testid="input-message" placeholder="Tell us about your project..." value={form.message} onChange={update("message")} rows={4} className="bg-white/5 border-white/10 focus-visible:ring-primary resize-none" />
          <Button
            type="submit"
            disabled={loading}
            data-testid="contact-submit"
            className="w-full h-12 bg-primary text-primary-foreground font-semibold hover:brightness-110 text-base"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : "Send Enquiry"}
          </Button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;

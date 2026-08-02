import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useSettings } from "@/hooks/useSettings";

export default function Admin() {
  const { settings, loading, updateSettings } = useSettings();
  const [saving, setSaving] = useState(false);

  const toggle = async (val) => {
    setSaving(true);
    try {
      await updateSettings({ ...settings, show_testimonials: val });
      toast.success(val ? "Testimonials are now visible on the site." : "Testimonials are now hidden.");
    } catch (e) {
      toast.error("Could not save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center px-6 py-16">
      <div className="w-full max-w-xl">
        <Link to="/" data-testid="admin-back" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors mb-10">
          <ArrowLeft size={16} /> Back to site
        </Link>

        <p className="text-xs tracking-[0.35em] text-gold uppercase mb-3">Site Controls</p>
        <h1 className="heading-xl text-4xl md:text-5xl mb-3">Section Visibility</h1>
        <p className="text-muted-foreground mb-10 leading-relaxed">
          Toggle sections on or off. Hidden sections simply disappear — no blank spaces on your live site.
        </p>

        <div className="glass rounded-2xl p-6 flex items-center justify-between" data-testid="admin-testimonials-row">
          <div className="flex items-start gap-4">
            <div className="h-11 w-11 rounded-xl bg-white/5 ring-1 ring-white/10 flex items-center justify-center text-gold">
              {settings.show_testimonials ? <Eye size={20} /> : <EyeOff size={20} />}
            </div>
            <div>
              <h3 className="font-display uppercase text-lg tracking-tight">Testimonials</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                {settings.show_testimonials ? "Currently shown on the homepage." : "Currently hidden. Turn on once you've added real client quotes."}
              </p>
            </div>
          </div>
          {loading ? (
            <Loader2 className="animate-spin text-muted-foreground" size={20} />
          ) : (
            <Switch
              checked={settings.show_testimonials}
              onCheckedChange={toggle}
              disabled={saving}
              data-testid="admin-testimonials-switch"
            />
          )}
        </div>

        <p className="text-xs text-muted-foreground mt-8">
          Tip: bookmark this page (<span className="text-gold">/admin</span>) so you can flip sections anytime.
        </p>
      </div>
    </div>
  );
}

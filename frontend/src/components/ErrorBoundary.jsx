import { Component } from "react";

/**
 * ErrorBoundary — catches render errors in child components so the whole
 * app doesn't crash. Shows a graceful fallback with a WhatsApp escape hatch.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Log to console (dev) — in production this could be sent to a monitor.
    // Kept silent in the UI to avoid leaking stack traces.
     
    console.error("[ErrorBoundary]", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6">
          <div className="max-w-md text-center">
            <p className="font-poster uppercase tracking-[0.3em] text-[11px] text-gold mb-3">
              Something went wrong
            </p>
            <h1 className="font-poster uppercase text-3xl md:text-4xl leading-tight mb-4">
              We hit a small glitch.
            </h1>
            <p className="text-white/70 text-[15px] leading-relaxed mb-6">
              Please reload the page. If it keeps happening, you can reach us on
              WhatsApp — we'll reply within minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={this.handleReset}
                className="inline-flex items-center justify-center bg-gold text-[#050505] font-poster uppercase tracking-[0.12em] text-sm px-5 py-3 rounded-full"
              >
                Try Again
              </button>
              <a
                href="https://wa.me/918287738890?text=Hi%20Dhanusha%20Production!%20I'd%20like%20to%20book%20a%20shoot."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#25D366] text-[#050505] font-poster uppercase tracking-[0.12em] text-sm px-5 py-3 rounded-full"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

import "@/App.css";
import { ReactLenis } from "lenis/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { SettingsProvider } from "@/hooks/useSettings";
import Home from "@/pages/Home";
import Admin from "@/pages/Admin";

function App() {
  return (
    <SettingsProvider>
      <div className="App relative bg-background text-foreground min-h-screen overflow-x-hidden">
        <div className="grain-overlay" aria-hidden="true" />
        <Toaster position="top-center" theme="dark" richColors />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ReactLenis root options={{ lerp: 0.09, smoothWheel: true, anchors: { offset: -64 } }}>
                  <Home />
                </ReactLenis>
              }
            />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </BrowserRouter>
      </div>
    </SettingsProvider>
  );
}

export default App;

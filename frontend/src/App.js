import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { SettingsProvider } from "@/hooks/useSettings";
import ErrorBoundary from "@/components/ErrorBoundary";
import Home from "@/pages/Home";
import Admin from "@/pages/Admin";

function App() {
  return (
    <ErrorBoundary>
      <SettingsProvider>
        <div className="App relative bg-background text-foreground min-h-screen overflow-x-hidden">
          <Toaster position="top-center" theme="dark" richColors />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </BrowserRouter>
        </div>
      </SettingsProvider>
    </ErrorBoundary>
  );
}

export default App;

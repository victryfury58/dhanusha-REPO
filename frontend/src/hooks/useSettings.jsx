import { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const SettingsContext = createContext({ settings: { show_testimonials: false }, loading: true, updateSettings: async () => {} });

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({ show_testimonials: false });
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API}/settings`);
      setSettings(data);
    } catch (e) {
      // keep defaults
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const updateSettings = useCallback(async (next) => {
    const { data } = await axios.put(`${API}/settings`, next);
    setSettings(data);
    return data;
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);

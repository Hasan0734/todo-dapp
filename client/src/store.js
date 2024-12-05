import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useSessionStore = create(
  persist(
    (set, get) => ({
      loading: false,
      nonce: null,
      error: null,
      auth: null,
      setLoading: (loading) => {
        set({ loading });
      },
      setNonce: (nonce) => set({ nonce }),
      setError: (error) => {
        set({ error });
      },
      setAuth: (address) => set({ auth: address }),
    }),
    {
      name: "food-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

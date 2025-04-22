// store/orderStore.ts
import { create } from "zustand";
import { Order } from "@/app/cart/page";

interface OrderState {
  order: Order | null;
  setOrder: (order: Order) => void;
  clearOrder: () => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  order: null,
  setOrder: (order) => set({ order }),
  clearOrder: () => set({ order: null }),
}));

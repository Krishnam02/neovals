"use client";
import { useCart } from "@/lib/cartContext";
import Toast from "./Toast";

export default function ToastContainer() {
  const { toast, hideToast } = useCart();

  return (
    <Toast
      message={toast?.message || ""}
      type={toast?.type || "success"}
      isVisible={!!toast}
      onClose={hideToast}
    />
  );
}

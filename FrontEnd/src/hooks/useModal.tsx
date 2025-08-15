import { useState } from "react";

export function useModal() {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  function openUserModal() {
    setIsUserModalOpen(true);
  }
  function closeUserModal() {
    setIsUserModalOpen(false);
  }

  function openProductModal() {
    setIsProductModalOpen(true);
  }
  function closeProductModal() {
    setIsProductModalOpen(false);
  }

  return {
    isUserModalOpen,
    openUserModal,
    closeUserModal,
    isProductModalOpen,
    openProductModal,
    closeProductModal,
  };
}
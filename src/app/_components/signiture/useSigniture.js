import { useState } from "react";

const useSigniture = (onSave) => {
  const [isOpen, setIsOpen] = useState(false);

  const openSheet = () => setIsOpen(true);
  const closeSheet = () => setIsOpen(false);

  const handleSave = (blob) => {
    const url = URL.createObjectURL(blob);
    if (onSave) onSave({ blob, url });
    closeSheet();
  };

  return { isOpen, openSheet, closeSheet, handleSave };
};

export default useSigniture;

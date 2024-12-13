import { useState } from "react";

export function useCard() {
    const [isModalOpen, setIsModalOpen] = useState(false);

 

  return {isModalOpen, setIsModalOpen};
}

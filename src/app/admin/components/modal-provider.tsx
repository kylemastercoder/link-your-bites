"use client";

import { useEffect, useState } from "react";
import { BranchModal } from "./branch-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <BranchModal />
    </>
  );
};

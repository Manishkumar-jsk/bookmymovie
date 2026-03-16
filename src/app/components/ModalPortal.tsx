"use client";

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  children?: ReactNode;
  passThrough?: boolean;
}

const ModalPortal = ({ children, passThrough = false }: Props) => {
  const [modalRoot, setModalRoot] = useState<Element | null>(null);

  useEffect(() => {
    const root = document.querySelector("#modalRoot");

    if (!root) {
      console.warn("ModalPortal: #modalRoot element not found in DOM");
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setModalRoot((prev) => (prev === root ? prev : root));
  }, []);

  if (passThrough) return <>{children}</>;
  if (!modalRoot) return null;

  return createPortal(children, modalRoot);
};

export default ModalPortal;
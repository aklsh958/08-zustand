'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

type ModalContextType = {
  modal: ReactNode | null;
  setModal: (node: ReactNode | null) => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<ReactNode | null>(null);

  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      {children}
      {modal}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within ModalProvider');
  return ctx;
};
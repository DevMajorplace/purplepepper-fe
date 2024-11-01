"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useState,
  ReactElement,
} from "react";

import Modal from "@/components/modal";

type context = {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalContents: ReactElement;
  setModalContents: React.Dispatch<React.SetStateAction<ReactElement>>;
};

interface ModalContextProviderProps {
  children: ReactNode;
}

const ModalContext = createContext<context | undefined>(undefined);

export function ModalProvider({ children }: ModalContextProviderProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContents, setModalContents] = useState(<></>);

  return (
    <ModalContext.Provider
      value={{ modalOpen, setModalOpen, modalContents, setModalContents }}
    >
      {children}
      {modalOpen && <Modal>{modalContents}</Modal>}
    </ModalContext.Provider>
  );
}

export function useModalOpen() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("반드시 ModalProvider 안에서 사용해야 합니다");
  }

  const { modalOpen } = context;

  return modalOpen;
}

export function useSetModalOpen() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("반드시 ModalProvider 안에서 사용해야 합니다");
  }

  const { setModalOpen } = context;

  return setModalOpen;
}

export function useModalContents() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("반드시 ModalProvider 안에서 사용해야 합니다");
  }

  const { modalContents } = context;

  return modalContents;
}

export function useSetModalContents() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("반드시 ModalProvider 안에서 사용해야 합니다");
  }

  const { setModalContents } = context;

  return setModalContents;
}

"use client";
import { createContext, useState, useContext, ReactNode } from "react";

export type ModalType = "confirm";

export interface ModalContextType {
	openModal: (type: ModalType, data?: any) => void;
	closeModal: () => void;
	modalType: ModalType | null;
	modalData: any;
}

export const ModalContext = createContext<ModalContextType | undefined>(
	undefined
);

export function ModalProvider({ children }: { children: ReactNode }) {
	const [modalType, setModalType] = useState<ModalType | null>(null);
	const [modalData, setModalData] = useState<any>(null);

	const openModal = (type: ModalType, data?: any) => {
		setModalType(type);
		setModalData(data);
	};

	const closeModal = () => {
		setModalType(null);
		setModalData(null);
	};

	return (
		<ModalContext.Provider
			value={{ openModal, closeModal, modalType, modalData }}
		>
			{children}
		</ModalContext.Provider>
	);
}

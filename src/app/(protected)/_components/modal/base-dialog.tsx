"use client";
import { Dialog } from "@/components/ui/dialog";
import { useModal } from "@/context/hook/useModal";
import { lazy, Suspense } from "react";
import { ModalType } from "@/context/modal-provider";

const ConfirmModal = lazy(() => import("./confirm-dialog"));

const ModalComponent: { [key in ModalType]: React.ElementType } = {
	confirm: ConfirmModal,
};

export const BaseDialog = () => {
	const { modalType, modalData, closeModal } = useModal();

	const RenderModal = ModalComponent[modalType as ModalType];

	return (
		<Dialog open={modalType !== null} onOpenChange={closeModal} modal>
			<Suspense>
				{RenderModal ? (
					<RenderModal {...modalData} closeModal={closeModal} />
				) : null}
			</Suspense>
		</Dialog>
	);
};

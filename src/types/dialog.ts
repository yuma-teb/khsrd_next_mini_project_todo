export interface DialogData<T> {
	type: T;
	title: string;
	content?: React.ReactNode;
	confirmText?: string;
	cancelText?: string;
	onConfirm?: () => void;
	onCancel?: () => void;
	extraProps?: Record<string, any>;
}

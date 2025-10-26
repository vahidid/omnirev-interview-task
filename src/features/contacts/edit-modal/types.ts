export interface EditContactModalProps {
	open: boolean;
	onClose: () => void;
	selected?: ContactResponse;
	onSuccessEdit: () => void;
}

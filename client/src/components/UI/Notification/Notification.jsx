import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Notification = ({ type, show, setShow, autoCloseTime = 1500 }) => {
	const handleCloseNotif = () => {
		setShow(false);
	};

	const handleCreateNotif = () => {
		switch (type) {
			case 'REFRESH_SUCCESS':
				if (show) {
					toast.success('Refresh data successfully', {
						toastId: 'REFRESH_SUCCESS',
						onClose: () => {
							handleCloseNotif();
						},
					});
				}
				break;
			case 'ADD_TO_FAV_SUCCESS':
				if (show) {
					toast.success('Add to favourite list successfully', {
						toastId: 'ADD_TO_FAV_SUCCESS',
						onClose: () => {
							handleCloseNotif();
						},
					});
				}
				break;
			default:
				break;
		}
	};

	handleCreateNotif();

	return (
		<ToastContainer
			position='top-right'
			autoClose={autoCloseTime}
			hideProgressBar={true}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss={false}
			draggable
			pauseOnHover
		/>
	);
};

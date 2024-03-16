// Dependencies
import { Backdrop } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';

//Assets
import { themBackdrop } from '../config/theme';
import { RootState } from '../store';
import styles from './styles/loading-styles.component.module.css';

const ModalLoading = () => {
	const { loading } = useSelector((state: RootState) => state.loading);
	return (
		<ThemeProvider theme={themBackdrop}>
			<Backdrop open={loading}>
				<div className={styles.containerLoading}>
					<p className={styles.textLoading}>Cargando...</p>
				</div>
			</Backdrop>
		</ThemeProvider>
	);
};

export default ModalLoading;

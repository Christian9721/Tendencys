import * as React from 'react';
import Box from '@mui/material/Box';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '../store/modules/alert';
import { RootState } from '../store';
import Slide, { SlideProps } from '@mui/material/Slide';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import ConfettiExplosion from 'react-confetti-explosion';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="up" />;
}

export default function PositionedSnackbar() {
    const dispatch = useDispatch();
    const open = useSelector((root: RootState) => root.alert);

    const handleClick = () => {
        dispatch(setAlert(false));
    };

  return (
    <Box sx={{ width: 500 }}>
        <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={open}
            TransitionComponent={SlideTransition}
            onClose={handleClick}
            autoHideDuration={8000}        
            sx={{ width: '100%' }}
            key={`toast`}
        >
            <Alert
                action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={handleClick}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                severity="success"
                variant="filled"
                sx={{ sm:{ width: '100%' }, md: { width: '25%' }, display: 'flex', textAlign: 'start', alignItems: 'flex-start', color: '#fff' }}
            >
            {open && <ConfettiExplosion duration={6000} particleCount={90} particleSize={14} zIndex={1000}/>}
            <AlertTitle sx={{ fontWeight: 'bold'}}>Felicidades</AlertTitle>
            Tu compra se realizó con éxito!
            </Alert>
        </Snackbar>
    </Box>
  );
}
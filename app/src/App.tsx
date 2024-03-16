import './App.css'
import Index from './pages';
import { Provider } from 'react-redux';
import store from './store';
import { ThemeProvider } from '@mui/material/styles';
import theme from './config/theme';
import ModalLoading from './components/loading.component';
import AlertComponent from './components/Alert.component';

function App() {

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Index />
        <ModalLoading />
        <AlertComponent />
      </ThemeProvider>
    </Provider>
  )
}

export default App

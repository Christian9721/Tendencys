import '../components/styles/table-styles.component.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useApiRequest } from '../hooks/useApiRequest';
import { IResponsePayload } from '../interfaces/request-response';
import { setOrders, addOrder } from '../store/modules/orders';
import TableComponent from '../components/table.component';
import { RootState } from '../store';
import { useState, useMemo } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import {  Grid, Stack, Typography } from '@mui/material';
import {TextFieldComponent } from '../components/text-field.component';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { TTableData } from '../interfaces/table-data.component';
import { styled } from '@mui/material/styles';
import { isEmpty } from '../utils/validators';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { setAlert } from '../store/modules/alert';

const initialStateForm:TTableData = {
  sku: '',
  name: '',
  quantity: 1,
  price: 1,
  id: '-',
  number: '-',
};

const AddButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  height: '3rem',
  '&:hover, &.Mui-focusVisible': {
    background: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.main,
  },
}));

const PayButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  height: '3rem',
  '&:hover, &.Mui-focusVisible': {
    background: theme.palette.success,
    backgroundColor: theme.palette.success,
  },
}));

const Index = () => {

    const dispatch = useDispatch();
    const [formData, setFormData] = useState<TTableData>(initialStateForm);

    const isAddAllowed = useMemo(() => {
      const isAll = !Object.values(formData).every(i => !isEmpty(i));
      console.log( Object.values(formData));
      return isAll;
    }, [formData]);

    const { status } = useApiRequest< any, IResponsePayload>({
        path: "/orders",
        onFetched: onFetched,
    });
    const orders = useSelector((root: RootState) => root.orders);

    function onFetched(data: IResponsePayload) {
      dispatch(setOrders(data.orders));
    }

    function handleForm(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
      const { value, name } = e.target;
      setFormData(prev => ({...prev, [name]: value }));
    }

    function handleAdd () {
      dispatch(addOrder(formData));
      setFormData(initialStateForm);
    }

    function handlePay () {
      dispatch(setAlert(true));
    }

  if (status === "error") return <div>Error: </div>;

    return ( 
        <Stack display="flex" gap={5}>
          <Grid container display="flex" justifyContent="center" padding={1} borderRadius={1} sx={{ background: '#0c0c0c0f' }}>
            <Typography variant="h5">Nuevo producto</Typography>
          </Grid>
          <Grid container spacing={2}>         
            <Grid item md={3} sm={6} xs={12}>
                <TextFieldComponent name="sku" onChange={handleForm} value={String(formData.sku)} placeholder="Sku ejemplo" />
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
                <TextFieldComponent name="name" onChange={handleForm} value={formData.name} placeholder="Camisa manga" />
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
                <TextFieldComponent name="quantity" onChange={handleForm} value={formData.quantity} placeholder="1"/>
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
                <TextFieldComponent name="price" onChange={handleForm} value={formData.price} placeholder="1000" startAdornment={<InputAdornment position="start">$</InputAdornment>} />
            </Grid>
            <Grid item md={3} sm={12} xs={12} marginLeft="auto">
              <AddButton disabled={isAddAllowed} disableTouchRipple sx={{ transition: '0.5ms'}} color='primary' variant="contained"  endIcon={<AddIcon />} fullWidth onClick={handleAdd}>
                Agregar
              </AddButton>
            </Grid>
          </Grid>
          <Grid item padding={1} borderRadius={1} sx={{ background: '#0c0c0c0f' }}>
            <Typography variant="h5">Ordenes</Typography>
          </Grid>
          <Grid item className=''>
            <TableComponent data={orders} headers={["#Orden","sku", "name", "quantity", "price"]}/>
          </Grid>
          <Grid item md={3} sm={6} xs={12} marginLeft="auto">
              <PayButton sx={{ transition: '0.5ms'}} color='success' variant="contained"  endIcon={<ShoppingBagIcon />} fullWidth onClick={handlePay}>
                Pagar
              </PayButton>
            </Grid>
        </Stack>
     );
}
 
export default Index;
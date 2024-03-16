import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import QuantityInput from '../components/number-input.component';

interface IProps {
    name: string;
    required?: boolean;
    placeholder: string;
    value: string | number;
    startAdornment?: React.ReactNode;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}
const TextFieldComponent = (props: IProps) => {
    const { name, onChange, value, startAdornment, placeholder, required = true } = props;
    return ( 
        <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-start'}}>
            <span style={{ textTransform: 'capitalize' }}>{name}<span style={{color: 'red'}}>*</span></span>
            <TextField
                sx={{ '& legend': { display: 'none' }, '& fieldset': { top: 0 }}}
                value={value}
                required={required}
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                variant="outlined"
                fullWidth
            />
        </FormControl>
     );
}

const QuantityFieldComponent = (props: IProps) => {
    const { name, onChange, value } = props;
    return (
        <FormControl>
            <span style={{ textTransform: 'capitalize' }}>{name}</span>
            <QuantityInput
                value={Number(value)}
                name={name}
                onChange={onChange}
            />
        </FormControl>
    )
}
 
export {TextFieldComponent, QuantityFieldComponent};
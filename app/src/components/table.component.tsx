import {memo} from 'react';
import {  styled, useTheme  } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TTableData } from '../interfaces/table-data.component';

interface StyledTableCellProps {
  textSize?: string;
}

const StyledTableCell = styled(TableCell)<StyledTableCellProps>(({ textSize }: StyledTableCellProps) => {
    const theme = useTheme(); // Obtener el tema utilizando useTheme

    return {
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: textSize || 14,
      },
    }
  });
  
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  

interface ITable {
  data: TTableData[];
  headers: string[];
}

let USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const TableCellComponent = (row: TTableData) => {
  return (
    <StyledTableRow sx={{ width: 'auto' }}>
      <StyledTableCell component="th" scope="row">
        {row.number}
      </StyledTableCell>
      <StyledTableCell align="left">{row.sku || "-"}</StyledTableCell>
      <StyledTableCell align="left">{row.name}</StyledTableCell>
      <StyledTableCell align="left">{row.quantity}</StyledTableCell>
      <StyledTableCell align="left" sx={{ fontWeight: 'bold' }} textSize={'1.1rem'}>{USDollar.format(Number(row.price))}</StyledTableCell>
    </StyledTableRow>
  )
}

const TableComponent = (props: ITable) => {
  
  const { data, headers } = props;
  const theme = useTheme();

  return (
    <TableContainer className={""} component={Paper} sx={{ maxHeight: '45rem', overflow: 'auto' }}>
      <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            {
              headers.map((header, idx) => (
                <StyledTableCell key={`header-${idx}`} align="left" sx={{ textTransform: 'capitalize', background: '#000000bd', backdropFilter: 'blur(3px)' }}>{header}</StyledTableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody className={""}>
          {
            data.map((row) => (
              <TableCellComponent key={row.id} {...row}/>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const customComparator = (prevProps: ITable, nextProps: ITable) => {
  return nextProps.data.length === prevProps.data.length;
};
 
export default memo(TableComponent, customComparator);
//export default TableComponent;
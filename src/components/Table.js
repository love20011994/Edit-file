import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/DeleteIcon';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { green } from '@mui/material/colors';

function TableData({ data, handleDelete, handleEdit }) {

  // const createData = (name, calories, fat, carbs, protein) => {
  //     return { name, calories, fat, carbs, protein };
  //   }
  // const rows = [
  // createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  //     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  //     createData('Eclair', 262, 16.0, 24, 6.0),
  //     createData('Cupcake', 305, 3.7, 67, 4.3),
  //     createData('Gingerbread', 356, 16.0, 49, 3.9),
  //   ];
  // console.log(data);

  const styleText = {
    mr: 5
    
  }


  return <div>
    <TableContainer component={Paper}>
    <h1 >Love kalsangrah</h1>
      <Table sx={{ minWidth: 100 }} aria-label="simple table">
        <TableHead style={{backgroundColor:"yellow"}}>
          
          <TableRow >
            <TableCell>Sl. No.</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="center">Phone&nbsp;</TableCell>
            <TableCell align="center">Email&nbsp;</TableCell>
            <TableCell align="center">Action&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody  style={{color:"blue"}}>
          {data.map((item, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="right">{item.fullName}</TableCell>
              <TableCell align="center">{item.phone}</TableCell>
              <TableCell align="center">{item.email}</TableCell>
              <TableCell align="center"><Button variant='contained'
                color='primary'
                sx={styleText}
                onClick={() => handleEdit(index)}>
                <EditIcon />
              </Button>
                <Button variant='contained' color='error'
                  onClick={() => handleDelete(index)}>
                  <DeleteForeverIcon />
                </Button></TableCell>


            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  </div>
}

export default TableData
//npm install xlsx file-saver --save

import React from 'react'
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Button } from '@mui/material';

const excelBtn = {
    m:1
}

function ToExcel({data}) {
    // what is this fileType for ?
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const fileName = 'love kalsangrah'

    //explain
    const exportToCSV = (data, fileName) => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data1 = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data1, fileName + fileExtension);
    }

    console.log(data);
  return (
    <div>
        <Button variant='contained'
                color='success'
                sx={excelBtn}
                onClick={(e) => exportToCSV(data,fileName)}>
               Download File
              </Button>
              
    </div>
  )
}

export default ToExcel
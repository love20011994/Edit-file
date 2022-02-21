import { Box, Modal } from '@mui/material'
import React, { useState } from 'react'

const style = {
    width: 300,
    bgcolor: 'white',
    border: '1px solid black',
    borderRadius: 2,
    p: 2,
    px: 4,
    pb: 3,
  };

function Uploadimg() {
    const [sopen, setsopen] = useState(false);
    const [img, setimg] = useState({ name: '' });
    const [imgName, setimgName] = useState({ name: '' });
    

    //get imag file path -> use FileReader, go to (e.target.files[0])
  const handleFile = (e) => {
    setsopen(true)
    var input = e.target;
    var reader = new FileReader();
    reader.onload = function () {
      var dataURL = reader.result;
      var output = document.getElementById('output');
      output.src = dataURL;
      console.log(output.src);
      setimgName({
        name: dataURL
      })
      console.log(imgName.name);
      // picVal(dataURL)
    };
    // if (imgName.includes('jpeg')) {
    //   setsopen(true)
    reader.readAsDataURL(input.files[0]);
    // } else {
    //   setsopen(false)
    //   alert('select only image file')
    // }

  };

  return (
    <div><Modal
    open={sopen}
    onClose={() => { setsopen(false) }}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style} className='col-7'>
      <img id='output' src={img.name} width='600px' alt='img' />
    </Box>
  </Modal></div>
  )
}

export default Uploadimg
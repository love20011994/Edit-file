import React, { useState } from 'react';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import { Button, Grid, Modal, TextField } from '@mui/material';
import TableData from './Table';
import ToExcel from './ToExcel';
import Uploadimg from './Uploadimg';

//mui styling
const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 550,
  bgcolor: 'white',
  border: '1px solid white',
  borderRadius: 2,
  p: 2,
  px: 4,
  pb: 3,
};
const styleText = {
  m: 2
}

function ModalPop() {
  const [img, setimg] = useState({ name: '' });
  const [sopen, setsopen] = useState(false);
  const [imgName, setimgName] = useState({ name: '' });
  
  
  const [open, setOpen] = useState(false);
  const [inputObj, setinputObj] = useState({
    fullName: '',
    phone: '',
    email: ''
  })
  const [tableArr, settableArr] = useState([])
  const [toggle, setToggle] = useState(false)
  const [tableId, settableId] = useState(-1)
  const [isNameValid, setisNameValid] = useState(true)
  const [nameError, setnameError] = useState('')
  const [isEmailValid, setisEmailValid] = useState(true)
  const [emailError, setemailError] = useState('')
  const [isPhoneNumberValid, setisPhoneNumberValid] = useState(true)
  const [phoneNumberError, setphoneNumberError] = useState('')
  // const [showImg, setshowImg] = useState(false);

  //opening and closing of modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //to make inputs controled component
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setinputObj((values) => ({ ...values, [name]: value }))
    console.log(inputObj);
  }

  //name validation
  const validateFirstName = (Name) => {
    if (Name) {
      let fName = (/^[a-zA-Z]+$/);
      if (Name.match(fName)) {
        setisNameValid(true)
        setnameError('')
        return true
      } else {
        setisNameValid(false)
        setnameError('*Please enter valid name')
        return false
      }
    } else {
      setisNameValid(false)
      setnameError('*Name cannot be empty')
      return false
    }
  }

  //email validation
  const validateEmail = (email) => {
    if (email) {
      let mail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (email.match(mail)) {
        setisEmailValid(true)
        setemailError('')
        return true
      } else {
        setisEmailValid(false)
        setemailError('*Please enter valid email')
        return false
      }
    } else {
      setisEmailValid(false)
      setemailError('*Email cannot be empty')
      return false
    }
  }

  //to add 04 update the data with validation check
  const handleSave = () => {
    const isFullNameValid = validateFirstName(inputObj.fullName)
    const isEmailValid = validateEmail(inputObj.email)
    const isPhoneNumberValid = validatePhoneNumber(inputObj.phone)
    //for edit 
    if (isFullNameValid && isPhoneNumberValid && isEmailValid && tableId > -1) {
      var temp = tableArr;
      temp.splice(tableId, 1, inputObj);
      settableArr(temp);
      setToggle(false)
      settableId(-1)
    }
    else if (isFullNameValid && isPhoneNumberValid && isEmailValid) {
      settableArr([...tableArr, inputObj])
      setToggle(true)
      setinputObj({
        fullName: '',
        phone: '',
        email: ''
      })
    } else {
      alert('not valid')
      setOpen(true)
    }

  }

  //deleting
  const handleDelete = (id) => {
    if (id > -1) {
      const updateddata = tableArr.filter((_, index) => {
        return index !== id;
      });
      settableArr(updateddata);
    }
  };

  //editing
  const handleEdit = (id) => {
    setToggle(true);
    setinputObj(tableArr[id]);
    settableId(id);
    setOpen(true)
  };

  const handleAdd = () => {
    handleOpen()
    setinputObj({
      fullName: '',
      phone: '',
      email: ''
    })
    setnameError('')
    setphoneNumberError('')
    setemailError('')
  }

  //phone number validation
  const validatePhoneNumber = (pnumber) => {
    if (pnumber) {
      let num = /^\d{10}$/;
      if (pnumber.match(num)) {
        setisPhoneNumberValid(true)
        setphoneNumberError('')
        return true
      } else {
        setisPhoneNumberValid(false)
        setphoneNumberError('*Please enter valid phone-number')
        return false
      }
    } else {
      setisPhoneNumberValid(false)
      setphoneNumberError('*Phone-number cannot be empty')
      return false
    }
  }

  // const picVal = (file) => {    
  //   if (file.includes('jpg')) {
  //     setsopen(true)
  //   } else {
  //     alert('select only image file')
  //   }
  // }
  // console.log(img)


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

  const handleClear=(e)=>{
    setinputObj({
      fullName: '',
      phone: '',
      email: ''
    })
  }

  return (
    <div>
      <Grid item sx={{ display: "flex", justifyContent: "end" }} ><Button sx={{
        p: 1,
        m: 1,
        bgcolor: 'primary',
        maxWidth: 380,
        // justifyContent: 'end',
        borderRadius: 1,
      }} variant={'contained'} type="button"
        onClick={handleAdd}>
        Add Data
      </Button>
        <ToExcel data={tableArr} />
      </Grid>

      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style} className='col-7'>
          <h2 id="unstyled-modal-title">{toggle ? '' : 'Add data'}</h2>
          <hr />
          <div className='col-12 d-inline-flex ml-3' >
            <div>
              <TextField
                sx={styleText}
                onChange={(e) => handleChange(e)}
                required
                type={'text'}
                id="outlined-required"
                label="Name"
                name='fullName'
                value={inputObj.fullName}
                placeholder="Enter your name"
              />
              {isNameValid ? null : <p className='errMsg'><small>{nameError}</small></p>}
            </div>

            <div className='col-6 d-inline'>
              <TextField
                sx={styleText}
                onChange={(e) => handleChange(e)}
                required
                type={'number'}
                id="outlined-required"
                label="Phone No."
                name='phone'
                value={inputObj.phone}
                placeholder="Enter your phone number"
              />
              {isPhoneNumberValid ? null : <p className='errMsg'><small>{phoneNumberError}</small></p>}
            </div>
          </div>

          <div className='col-12 d-inline-flex'>
            <div className='col-6 d-inline'>
              <TextField
                sx={styleText}
                onChange={(e) => handleChange(e)}
                required
                id="outlined-required"
                label="Email-Id"
                name='email'
                value={inputObj.email}
                placeholder="Enter your email-id"
              />
              {isEmailValid ? null : <p className='errMsg'><small>{emailError}</small></p>}
            </div>

            <div className='col-3 d-inline mt-3'>
              <input type='file' accept="image/png, image/jpg, image/jpeg" onChange={(e) => handleFile(e)} />
            </div>

          </div>

          <div className='text-center'>
            <Button variant='contained'
              color='success'
              className='m-auto'
              type={'submit'}
              onClick={(e) => {
                handleClose()
                handleSave(e)
              }}
            >{toggle ? 'Update' : 'Save'}</Button>
          </div>
          <div className=''>
            <Button variant='contained'
              color='success'
              className='m-auto'
              type={'submit'}
              onClick={(e) => {
                // handleClose()
                // handleSave(e)
                handleClear(e)
              }}
            >{toggle ? 'reset' : 'reset'}</Button>
          </div>

        </Box>
      </StyledModal>
      <Modal
        open={sopen}
        onClose={() => { setsopen(false) }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className='col-7'>
          <img id='output' src={img.name} width='500px' alt='img' />
        </Box>
      </Modal>
      <Uploadimg/>

      <TableData
        data={tableArr}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  )
}

export default ModalPop
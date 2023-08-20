import { Alert } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useUserInfoHooks } from './userInfoHook';

export default function UserInfoCmp() {
  const { info, handleInfoDetails, handleSubmit, message, nameRef, emailRef, phoneRef } = useUserInfoHooks();

  return (
    <Box sx={{ display: "flex", height: "90vh", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      {message !== null ? <Alert severity="warning">{message}</Alert> : null}
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 3, width: "32ch", display: "flex", flexDirection: "column" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          required
          id="outlined-required"
          label="Name"
          onChange={handleInfoDetails}
          value={info.name}
          name='name'
          inputRef={nameRef}
        />
        <TextField
          required
          id="outlined-required"
          label="Phone number"
          onChange={handleInfoDetails}
          value={info.phone}
          name='phone'
          inputRef={phoneRef}
          type="number"
        />
        <TextField
          required
          id="outlined-required"
          label="Email"
          onChange={handleInfoDetails}
          value={info.email}
          name='email'
          inputRef={emailRef}
          type='e-mail'
        />
      </Box>
      <Button onClick={handleSubmit} sx={{ width: "20ch" }} variant="contained">LOGIN</Button>
    </Box>
  )
}
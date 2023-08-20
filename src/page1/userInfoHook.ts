import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginInfoType, getLoginDetails, setLoginDetails } from '../utils/storageHandler';

interface UserInfoHookInterface {
  info: LoginInfoType,
  handleInfoDetails: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  message: string | null,
  nameRef: React.RefObject<HTMLInputElement>,
  emailRef: React.RefObject<HTMLInputElement>,
  phoneRef: React.RefObject<HTMLInputElement>,
}


export const useUserInfoHooks = (): UserInfoHookInterface => {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Local states
  const [info, setInfo] = React.useState<LoginInfoType>({
    name: "",
    phone: "",
    email: ""
  });
  const [message, setMessage] = React.useState<string | null>(null);
  const nameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const phoneRef = React.useRef<HTMLInputElement>(null);

  // load saved info from local storage to state
  React.useEffect(() => {
    setInfo(getLoginDetails());
    if (state?.message) {
      setMessage(state.message);
    }
  }, [])

  const handleInfoDetails = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInfo((prevInfo: LoginInfoType) => ({
      ...prevInfo,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (info.name === "") {
      setMessage("Enter Name");
      nameRef.current?.focus();
      return
    }

    if (info.phone === "") {
      setMessage("Enter Phone");
      phoneRef.current?.focus();
      return
    }

    if (info.phone.length !== 10) {
      setMessage("Enter correct Phone");
      phoneRef.current?.focus();
      return
    }

    if (info.email === "") {
      setMessage("Enter Email");
      emailRef.current?.focus();
      return
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(info.email)) {
      setMessage("Enter a valid Email");
      emailRef.current?.focus();
      return
    }

    setInfo(getLoginDetails());
    event.preventDefault();
    setLoginDetails(info);
    navigate("/page2");

  }

  return { info, handleInfoDetails, handleSubmit, message, nameRef, emailRef, phoneRef }
}
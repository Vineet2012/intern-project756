export type LoginInfoType = {
  name: string,
  phone: string,
  email: string,
}

export const getLoginDetails = (): LoginInfoType => {
  const storedData = localStorage.getItem('list');
  if (storedData !== null) return JSON.parse(storedData) as LoginInfoType;
  else return { name: '', phone: '', email: '' };
}

export const setLoginDetails = (data: LoginInfoType) => {
  localStorage.setItem('list', JSON.stringify(data));
}
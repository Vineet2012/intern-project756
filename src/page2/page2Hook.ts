import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoginDetails } from '../utils/storageHandler';

export type TableRowDataType = {
  userId: Number;
  id: Number;
  title: String;
  body: String;
}

interface Page2HookInterface {
  rowData: Array<TableRowDataType>,
  isLoggedIn: boolean,
  isLoading: boolean,
}

export const page2Hook = (): Page2HookInterface => {
  const [rowData, setRowData] = React.useState<Array<TableRowDataType>>([]);
  const [isLoggedIn, setLoggedin] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  const bootFunction = React.useCallback(async () => {
    // First authenticate
    const loginData = getLoginDetails();
    if (loginData.email !== "" && loginData.name !== "" && loginData.phone !== "") {
      setLoggedin(true);
    } else {
      // send back to page 1
      navigate("/", { state: { message: "Please login first" } });
    }

    // Then get table row data
    try {
      const { data } = await axios.get(baseURL);
      setRowData(data.map((el: any) => el as TableRowDataType));
      setLoading(false);
    } catch (error) {
      alert("failed to load table data");
    }
  }, []);

  React.useEffect(() => {
    bootFunction();
  }, [])

  const baseURL = "https://jsonplaceholder.typicode.com/posts";

  return { rowData, isLoading, isLoggedIn }
}
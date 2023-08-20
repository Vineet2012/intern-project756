import React from 'react';
import { TableRowDataType } from './page2Hook';

interface TableHookInterface {
  rows: Array<TableRowDataType>,
}

export const tableHooks = (rowData: Array<TableRowDataType>): TableHookInterface => {

  const [rows, setRows] = React.useState<Array<TableRowDataType>>([]);

  React.useEffect(() => {
    setRows(rowData);
  }, [rowData])

  return { rows }
}
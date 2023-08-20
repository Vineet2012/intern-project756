import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { TableRowDataType } from './page2Hook';
import { tableHooks } from './tableHooks';

type TableCmpProps = {
  rows: Array<TableRowDataType>
}

export default function TableCmp(props: TableCmpProps) {

  const { rows } = tableHooks(props.rows);

  const columns: GridColDef[] = [
    { field: 'userId', headerName: 'User ID', width: 90 },
    {
      field: 'id',
      headerName: 'ID',
      width: 50,
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 200,
    },
    {
      field: 'body',
      headerName: 'Body',
      type: '',
      width: 400,
    },
  ];


  return (
    <>
      <Box sx={{ height: 370, width: '100%', mx: 2 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </>
  )
}
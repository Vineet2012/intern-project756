import Box from "@mui/material/Box";
import DrawerCmp from './drawer';
import { page2Hook } from './page2Hook';
import TableCmp from './table';

export default function Page2Cmp() {
  const { isLoading, rowData } = page2Hook();

  if (isLoading) {
    return <div>Loading ...</div>
  }

  return (
    <Box display="flex">
      <DrawerCmp />
      <TableCmp rows={rowData} />
    </Box>
  )
}
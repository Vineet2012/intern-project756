
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Checkbox } from "@mui/material";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { DrawerItemType, useDrawerHook } from "./drawerHook";


export default function DrawerCmp() {
  const { items, handleExpandMore, handleClickCheckBox } = useDrawerHook();

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <List sx={{ paddingTop: 0 }}>
        {items.map((el, index) => {
          return <DrawerItemCmp key={index} data={el} onExpandMore={handleExpandMore} onClickCheckBox={handleClickCheckBox} />
        })}
      </List>
    </Box>
  );
}

type DrawerItemCmpProps = {
  data: DrawerItemType,
  onExpandMore: (id: string) => void,
  onClickCheckBox: (parentId: string, childId: string | null) => void,
}

function DrawerItemCmp(props: DrawerItemCmpProps) {

  function checkAllSubNavChecked(): boolean {
    let areAllhecked = true;
    props.data.subNav.forEach((el) => { if (!el.isSelected) areAllhecked = false })
    return areAllhecked;
  }

  return <Box sx={{ bgcolor: "#f5f5f5", padding: "8px 20px" }}>
    <Box sx={{ display: "flex", width: "300px" }}>
      <Checkbox
        checked={checkAllSubNavChecked()}
        onChange={() => props.onClickCheckBox(props.data.id, null)}
        name={props.data.id}
      />
      <ListItemButton
        onClick={() => { props.onExpandMore(props.data.id) }}
      >
        <ListItemText primary={props.data.label} />
        {props.data.isOpen ? <ExpandMoreIcon /> : <ChevronRightIcon />}
      </ListItemButton>
    </Box>
    <Collapse in={props.data.isOpen} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {props.data.subNav.map((el, idx) => {
          return (
            <Box key={idx} sx={{ display: "flex", ml: 3 }}>
              <Checkbox
                checked={el.isSelected}
                onChange={() => props.onClickCheckBox(props.data.id, el.id)}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              <ListItemButton key={idx} sx={{ pl: 4 }}>
                <ListItemText primary={el.label} />
              </ListItemButton>
            </Box>
          );
        })}
      </List>
    </Collapse>
  </Box>
} 
import React from 'react';
import drawerItemsJson from "./drawerItems.json";

export type DrawerItemType = {
  id: string,
  label: string,
  isOpen: boolean,
  subNav: SubDrawerItemType[],
}

export type SubDrawerItemType = {
  id: string,
  label: string,
  isSelected: boolean
}

interface DrawerHookInterface {
  items: DrawerItemType[],
  handleExpandMore: (id: string) => void,
  handleClickCheckBox: (parentId: string, childId: string | null) => void,
}

export const useDrawerHook = (): DrawerHookInterface => {
  const [drawerItems, setDrawerItems] = React.useState<DrawerItemType[]>([]);

  React.useEffect(() => {
    const data = drawerItemsJson.map((el: any, idx: number) => ({
      id: idx.toString(),
      label: el.department,
      isOpen: true,
      subNav: el.sub_departments.map((elem: string, index: number) => ({
        id: index.toString(),
        label: elem,
        isSelected: false,
      }))
    }))

    setDrawerItems(data);
  }, [])

  function handleExpandMore(id: string) {
    console.log(id)
    setDrawerItems((prevVal) => {
      const items = [...prevVal];
      const item = items.find((el) => el.id === id);
      if (item === undefined) return items;
      item.isOpen = !item.isOpen;
      return items;
    })
  };

  function handleClickCheckBox(parentId: string, childId: string | null) {
    if (childId === null) {
      setDrawerItems((prevVal) => {
        const items = [...prevVal];
        const parent = items.find((el) => el.id === parentId);
        if (parent === undefined) return items;

        let areAllSelected = true;
        const subNavs = [...parent.subNav];
        subNavs.forEach((el) => { if (!el.isSelected) areAllSelected = false })
        subNavs.forEach((el) => { el.isSelected = !areAllSelected })
        parent.subNav = subNavs;
        parent.isOpen = true;

        return items;
      })
      return;
    }

    setDrawerItems((prevVal) => {
      const items = [...prevVal];
      const parent = items.find((el) => el.id === parentId);
      if (parent === undefined) return items;

      const subNavs = [...parent.subNav];
      const child = subNavs.find((el) => el.id === childId);
      if (child === undefined) return items;

      child.isSelected = !child.isSelected;
      parent.subNav = subNavs;

      return items;
    })
  }

  return { items: drawerItems, handleExpandMore, handleClickCheckBox }
}
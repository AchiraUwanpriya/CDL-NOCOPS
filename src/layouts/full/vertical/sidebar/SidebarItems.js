import { Box, List, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { toggleMobileSidebar } from '../../../../store/customizer/CustomizerSlice';
import Menuitems from './MenuItems';
import NavCollapse from './NavCollapse';
import NavGroup from './NavGroup/NavGroup';
import NavItem from './NavItem';
const SidebarItems = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf('/'));
  const customizer = useSelector((state) => state.customizer);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';
  const dispatch = useDispatch();
  // const [filteredMenuItems, setFilteredMenuItems] = useState([]);
  const { headers } = useSelector((state) => state.authSlices);

  // const filterMenuItems = (menuItems, privileges) => {
  //   const allowedIds = new Set();

  //   privileges.forEach((priv) => {
  //     allowedIds.add(priv.ComponentId);
  //     if (priv.SubComponents) {
  //       priv.SubComponents.forEach((sub) => allowedIds.add(sub.ComponentId));
  //     }
  //   });

  //   const filterItems = (items) => {
  //     return items.reduce((acc, item) => {
  //       if (item.navlabel || allowedIds.has(item.id)) {
  //         const newItem = { ...item };
  //         if (item.children) {
  //           newItem.children = filterItems(item.children);
  //         }
  //         acc.push(newItem);
  //       }
  //       return acc;
  //     }, []);
  //   };

  //   return filterItems(menuItems);
  // };
  const filterMenuItems = (menuItems, privileges) => {
    const allowedIds = new Set();
    
    privileges.forEach((priv) => {
      allowedIds.add(priv.ComponentId);
      if (priv.SubComponents) {
        priv.SubComponents.forEach((sub) => allowedIds.add(sub.ComponentId));
      }
    });
  
    const filterItems = (items) => {
      return items.reduce((acc, item) => {
        if (item.navlabel) {
          // Check if there are any valid items following this navlabel
          const followingItems = items.slice(items.indexOf(item) + 1);
          const filteredFollowingItems = filterItems(followingItems);
          if (filteredFollowingItems.length > 0) {
            acc.push(item);
          }
        } else if (allowedIds.has(item.id)) {
          const newItem = { ...item };
          if (item.children) {
            newItem.children = filterItems(item.children);
          }
          acc.push(newItem);
        }
        return acc;
      }, []);
    };
  
    return filterItems(menuItems);
  };
  
  // useEffect(() => {
  //   const fetchAndFilterMenu = async () => {
  //     const filteredItems = filterMenuItems(Menuitems, headers);
  //     console.log(filteredItems);
  //     console.log(Menuitems);
  //     setFilteredMenuItems(filteredItems);
  //   };

  //   fetchAndFilterMenu();
  // }, []);

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {filterMenuItems(Menuitems, headers).map((item, index) => {
          // {/********SubHeader**********/}
          if (item.subheader) {
            return <NavGroup item={item} hideMenu={hideMenu} key={item.subheader} />;

            // {/********If Sub Menu**********/}
            /* eslint no-else-return: "off" */
          } else if (item.children) {
            return (
              <NavCollapse
                menu={item}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                pathWithoutLastPart={pathWithoutLastPart}
                level={1}
                key={item.id}
                onClick={() => dispatch(toggleMobileSidebar())}
              />
            );

            // {/********If Sub No Menu**********/}
          } else {
            return (
              <NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                onClick={() => dispatch(toggleMobileSidebar())}
              />
            );
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;

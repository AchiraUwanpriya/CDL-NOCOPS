import { Avatar, Box, IconButton, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { IconPower } from '@tabler/icons';
import { useSelector } from 'react-redux';
import img1 from '../../../../../assets/images/profile/user-1.jpg';
import { useAuth } from "../../../../../store/contexts/AuthContext";


export const Profile = () => {
  const { userData } = useSelector((state) => state.authSlices);
  const customizer = useSelector((state) => state.customizer);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';
  const { handleLogout } = useAuth();
  return (
    <Box
      display={'flex'}
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${'secondary.light'}` }}
    >
      {!hideMenu ? (
        <>
          <Avatar alt="Remy Sharp" src={img1} />
          <Box>
            <Typography variant="h6"  color="textPrimary">{userData.UserName}</Typography>
            <Typography variant="body2" color="textSecondary">{userData.CompanyName}</Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Tooltip title="Logout" placement="top">
              <IconButton color="primary" aria-label="logout" size="small" onClick={handleLogout}>
                <IconPower size="30" />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        ''
      )}
    </Box>
  );
};

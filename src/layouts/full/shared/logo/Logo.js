// import { styled } from '@mui/material';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { ReactComponent as LogoDarkRTL } from '../../../../assets/images/logos/dark-rtl-logo.svg';
// import { ReactComponent as LogoLightRTL } from '../../../../assets/images/logos/light-logo-rtl.svg';
// import { ReactComponent as LogoLight } from '../../../../assets/images/logos/light-logo.svg';
// import { ReactComponent as NocOpsLogo } from '../../../../assets/images/logos/logooo-_1.svg';
// // import { ReactComponent as NocOpsLogo } from '../../../../assets/images/logos/NocOpsLogo.svg';

// const Logo = () => {
//   const customizer = useSelector((state) => state.customizer);
//   const LinkStyled = styled(Link)(() => ({
//     height: customizer.TopbarHeight,
//     width: customizer.isCollapse ? '40px' : '100%',
//     overflow: 'hidden',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   }));

//   if (customizer.activeDir === 'ltr') {
//     return (
//       <LinkStyled to="/">
//         {customizer.activeMode === 'dark' ? (
//           <LogoLight height={customizer.TopbarHeight} />
//         ) : (
//           <NocOpsLogo height={customizer.TopbarHeight}/>
//         )}
//       </LinkStyled>
//     );
//   }
//   return (
//     <LinkStyled to="/">
//       {customizer.activeMode === 'dark' ? (
//         <LogoDarkRTL height={customizer.TopbarHeight} />
//       ) : (
//         <LogoLightRTL height={customizer.TopbarHeight} />
//       )}
//     </LinkStyled>
//   );
// };

// export default Logo;



//Add the Nocops logo for dark mode also

// import { styled } from '@mui/material';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { ReactComponent as LogoDarkRTL } from '../../../../assets/images/logos/dark-rtl-logo.svg';
// import { ReactComponent as LogoLightRTL } from '../../../../assets/images/logos/light-logo-rtl.svg';
// import { ReactComponent as NocOpsLogo } from '../../../../assets/images/logos/logooo-_1.svg';

// const Logo = () => {
//   const customizer = useSelector((state) => state.customizer);
//   const LinkStyled = styled(Link)(() => ({
//     height: customizer.TopbarHeight,
//     width: customizer.isCollapse ? '40px' : '100%',
//     overflow: 'hidden',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   }));

//   if (customizer.activeDir === 'ltr') {
//     return (
//       <LinkStyled to="/">
//         <NocOpsLogo height={customizer.TopbarHeight} />
//       </LinkStyled>
//     );
//   }

//   return (
//     <LinkStyled to="/">
//       {customizer.activeMode === 'dark' ? (
//         <LogoDarkRTL height={customizer.TopbarHeight} />
//       ) : (
//         <LogoLightRTL height={customizer.TopbarHeight} />
//       )}
//     </LinkStyled>
//   );
// };

// export default Logo;




//Add the Nocops logo for dark mode also remove the navigation when clicking the Nocops logo

import { styled } from '@mui/material';
import { useSelector } from 'react-redux';
import { ReactComponent as LogoDarkRTL } from '../../../../assets/images/logos/dark-rtl-logo.svg';
import { ReactComponent as LogoLightRTL } from '../../../../assets/images/logos/light-logo-rtl.svg';
import { ReactComponent as NocOpsLogo } from '../../../../assets/images/logos/logooo-_1.svg';

const Logo = () => {
  const customizer = useSelector((state) => state.customizer);
  const LogoWrapper = styled('div')(() => ({
    height: customizer.TopbarHeight,
    width: customizer.isCollapse ? '40px' : '100%',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  if (customizer.activeDir === 'ltr') {
    return (
      <LogoWrapper>
        <NocOpsLogo height={customizer.TopbarHeight} />
      </LogoWrapper>
    );
  }

  return (
    <LogoWrapper>
      {customizer.activeMode === 'dark' ? (
        <LogoDarkRTL height={customizer.TopbarHeight} />
      ) : (
        <LogoLightRTL height={customizer.TopbarHeight} />
      )}
    </LogoWrapper>
  );
};

export default Logo;

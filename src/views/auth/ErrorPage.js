import { Typography } from '@mui/material';
import React from 'react';
import ErrorImg from '../../assets/images/backgrounds/404-error-idea.gif';
import PageContainer from '../../components/theme/container/PageContainer';


const ErrorPage = () => {
  return (
    <PageContainer title="Page Not Found" description="Page Not Found" >
      <div style={{ display:'flex',justifyContent:'center', justifyItems:'center'}}>
      <img src={ErrorImg} alt="404" style={{ width: '100%', maxWidth: '500px',align:'center' }} />
      </div>
      <Typography align="center" variant="h1" mb={4}>
        Opps!!!
      </Typography>
      <Typography align="center" variant="h4" mb={4}>
        This page you are looking for could not be found.
      </Typography>
    </PageContainer>
  );
};

export default ErrorPage;

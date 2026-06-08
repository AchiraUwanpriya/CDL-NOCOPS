import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// import LankaBell from './NetworkStatusLankaBell';
import CheckConnection from './CheckConnection';  // Import the new CheckConnection component
import DeviceAvailability from './DeviceAvailability'; // Import the new DeviceAvailability component

export default function LabTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '95%', alignItems: 'center', marginLeft: '1%', flexGrow: 1 }}>
      <TabContext value={value}>

        {/*This will be added a tabList headers*}
        {/* <Box
          sx={{
            position: 'sticky',
            top: -5, 
            backgroundColor: 'white',
            zIndex: 1,
            borderColor: 'divider',
          }}
        >
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Lanka Bell Limited" value="1" />
            <Tab label="Sri Lanka Telecom" value="2" />
          </TabList>
        </Box> */}

        <TabPanel value="1">
          {/* <LankaBell isp="Lanka Bell Limited" /> */}
          <CheckConnection />
        </TabPanel>
        <TabPanel value="2">
          {/* <LankaBell isp="Sri Lanka Telecom" /> */}
          <CheckConnection />
        </TabPanel>
        {/* <TabPanel value="3">
          <CheckConnection />  
        </TabPanel> */}
        {/* <TabPanel value="4">
          <DeviceAvailability />  
        </TabPanel> */}
      </TabContext>
    </Box>
  );
}

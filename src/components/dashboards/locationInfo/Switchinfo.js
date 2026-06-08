import React, { useState } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { LocationOn, Storage } from '@mui/icons-material';
import Map from '../../../assets/images/blueprints/cdlplc.png';

const SwitchMap = ({ onDockClick }) => {
  const [hoveredDock, setHoveredDock] = useState(null);

 const dockswitches = [
  { id: 1, name: '4th Floor Switch - IT Department & Telephone Exchange', description: '', floors: 1, x: '33%', y: '83%' },
  { id: 2, name: '5th Floor Switch - Finance Department', description: '', floors: 1, x: '34%', y: '82%' },
  { id: 3, name: '3rd Floor Switch - Business Department', description: '', floors: 1, x: '32%', y: '84%' },
  { id: 4, name: 'Aluminium Shop', description: '', floors: 1, x: '27%', y: '80%' },
  { id: 5, name: 'Service Center', description: '', floors: 1, x: '25%', y: '75%' },
  { id: 6, name: 'Gas Center', description: '', floors: 1, x: '20.5%', y: '73%' },
  { id: 7, name: 'Safety Department', description: '', floors: 1, x: '35%', y: '80%' },
  { id: 8, name: 'Security Office Gate No.01', description: '', floors: 1,x: '38%', y: '77%'  },
  { id: 9, name: '1st Floor - Service Procurement', description: '', floors: 1,  x: '38%', y: '58%' },
  { id: 10, name: 'Ground Floor - Administrative Office', description: '', floors: 1, x: '37%', y: '57%' },
  { id: 11, name: 'LOFT Office', description: '', floors: 1, x: '35%', y: '51%' },
  { id: 12, name: 'Scaffolding Office', description: '', floors: 1, x: '36%', y: '41%'},
  { id: 13, name: 'Steel Hull Construction (SWC) Engineer Office', description: '', floors: 1, x: '46.5%', y: '48%'},
  { id: 14, name: 'Samagi Office', description: '', floors: 1, x: '45%', y: '46.5%'},
  { id: 15, name: 'Site Erection Office', description: '', floors: 1, x: '85%', y: '61%' },
  { id: 16, name: 'Training Center', description: '', floors: 1, x: '63.5%', y: '23.5%' },
  { id: 17, name: 'Training Center - Class Room C', description: '', floors: 1, x: '60%', y: '24%' },
  { id: 18, name: 'Quality Control Department', description: '', floors: 1, x: '60.5%', y: '20%' },
  { id: 19, name: 'Dock Electrical Office', description: '', floors: 1, x: '65%', y: '30%' },
  { id: 20, name: 'Main Stores - Location C', description: '', floors: 1, x: '73%', y: '31%'},
  { id: 21, name: 'Production Office Switch (Old)', description: '', floors: 1,  x: '75%', y: '33%' },
  { id: 22, name: 'HR Office', description: '', floors: 1, x: '74%', y: '29%'  },
  { id: 23, name: 'Fitting Shop Engineer Office', description: '', floors: 1, x: '78.5%', y: '13.5%' },
  { id: 24, name: 'Electrical Shop Office', description: '', floors: 1, x: '89.5%', y: '29.5%' },
  { id: 25, name: 'Calibration Office ', description: '', floors: 1, x: '83%', y: '22%' },
  { id: 25, name: ' Deck Fitting Shop Office', description: '', floors: 1, x: '89%', y: '25.5%'},
  { id: 26, name: 'Welfare Canteen Office', description: '', floors: 1, x: '76%', y: '21%' },
  { id: 27, name: 'Transport and Welfare Office', description: '', floors: 1,  x: '73%', y: '25%'},
  { id: 28, name: 'Blasting Chamber Office', description: '', floors: 1,  x: '90%', y: '51%' },
  { id: 29, name: '1st Floor Switch', description: '', floors: 1, x: '30%', y: '84%' },
  { id: 30, name: 'Gate No.01 Time Clock Switch (Security Hut)', description: '', floors: 1, x: '33.5%', y: '79%' },
  { id: 31, name: 'Deck Department Field Office', description: '', floors: 1, x: '42%', y: '63%' },
  { id: 32, name: 'NBD Tool Stores', description: '', floors: 1, x: '45%', y: '51%' },
  { id: 33, name: 'Fire Unit Stores', description: '', floors: 1, x: '52%', y: '38.5%'  },
  { id: 34, name: 'Carpentry Shop Office', description: '', floors: 1,x: '45%', y: '37.5%'  },
  { id: 35, name: 'Machinery Outfitting Shop', description: '', floors: 1,x: '50%', y: '45%' },
  { id: 36, name: '40th Anniversary Building Network Switch', description: '', floors: 1, x: '60%', y: '39%' },
  { id: 37, name: 'Component Shop Office', description: '', floors: 1, x: '43%', y: '49%' },
  { id: 38, name: '2nd Floor Lunch Room Camera Switch', description: '', floors: 1,x: '31%', y: '85%' },
  { id: 39, name: 'South Pier Camera Switch', description: '', floors: 1, x: '8.5%', y: '48%' },
  { id: 40, name: 'Location D Switch (Old)', description: '', floors: 1,  x: '48.5%', y: '47.5%'},
  { id: 41, name: 'Gate No.2 Camera Switch', description: '', floors: 1, x: '58%', y: '43%'  },
  { id: 42, name: 'SWC Unit Office Network Switch', description: '', floors: 1, x: '81%', y: '39%'},
  { id: 43, name: 'Gate No.3 (Security Hut) Network Switch', description: '', floors: 1,  x: '78.5%', y: '9.5%'},
  { id: 44, name: 'New Sub Contract Network Switch', description: '', floors: 1, x: '45.5%', y: '16%' },
  { id: 45, name: 'Production Office Switch (New)', description: '', floors: 1,  x: '75.5%', y: '31.5%'},
  { id: 46, name: 'Supplies Switch', description: '', floors: 1, x: '76%', y: '30%' },
  ];

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%', // ✅ makes it responsive
        height: '90vh', // ✅ full viewport height
        backgroundImage: `url(${Map})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '98%', // ✅ zoomed in (try 150%–250% as needed)
        backgroundPosition: 'center',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      {dockswitches.map((dockswitches) => (
        <Tooltip key={dockswitches.id} title={dockswitches.name} arrow>
          <IconButton
            onClick={() => onDockClick(dockswitches)}
            onMouseEnter={() => setHoveredDock(dockswitches.id)}
            onMouseLeave={() => setHoveredDock(null)}
            sx={{
              position: 'absolute',
              top: dockswitches.y,
              left: dockswitches.x,
              transform: 'translate(-50%, -50%)',
              color: hoveredDock === dockswitches.id ? 'red' : 'lightgreen',
              backgroundColor: 'black',
              borderRadius: '50%',
              width: 16, // ✅ smaller width
              height: 16, // ✅ smaller height
              boxShadow: 2,
              '&:hover': {
                bgcolor: 'rgba(245, 248, 246, 0.8)',
              },
            }}
          >
            <Storage sx={{ fontSize: 13 }} /> {/* ✅ smaller icon */}
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
};

export default SwitchMap;

// import {
//   Button,
//   Grid,
//   MenuItem,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   TextField,
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import InputAdornment from '@mui/material/InputAdornment';
// import { Stack } from '@mui/system';
// import { useFormik } from 'formik';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import * as yup from 'yup';
// import {
//   DeleteServerSnmpMaster,
//   GetServerSnmpMaster,
//   PostNewServerSnmpMaster,
//   UpdateServerSnmpMaster
// } from '../../../../store/slices/admin/asset/SeverSlices';
// import CustomFormLabel from '../../../theme/theme-elements/CustomFormLabel';
// import CustomTextField from '../../../theme/theme-elements/CustomTextField';
// import { GetSnmpDeviceTemplateGroupMaster } from '../../../../store/slices/admin/asset/ServerTemplateGroupSlices';
// import { GetSnmpDeviceTemplateMaster } from '../../../../store/slices/admin/asset/ServerTemplateSlices';
// import CustomSelect from '../../../theme/theme-elements/CustomSelect';

// const validationSchema = yup.object({
//   DeviceIp: yup
//     .string()
//     .required('IP Address cannot be empty.')
//     .matches(
//       /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.([25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.([25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.([25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/,
//       'Invalid IP Address',
//     ),
//   DeviceName: yup.string().required('Device name is Required.'),
//   DeviceTemplate: yup.string().required('Please select template.'),
// });

// const FrmServer = () => {
//   const dispatch = useDispatch();
//   const { data: ServerList } = useSelector((state) => state.severSlices);
//   const { data: TemplateList } = useSelector((state) => state.serverTemplateSlices);
//   const { data: TemplateGroupList } = useSelector((state) => state.serverTemplateGroupSlices);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredList, setFilteredList] = useState(ServerList);

//   const [selectedServer, setSelectedServer] = useState(null);
//   useEffect(() => {
//     dispatch(GetServerSnmpMaster());
//     dispatch(GetSnmpDeviceTemplateMaster());
//     dispatch(GetSnmpDeviceTemplateGroupMaster());
//   }, [dispatch]);

//   const formik = useFormik({
//     initialValues: {
//       TId: '',
//       DeviceIp: '',
//       DeviceName: '',
//       DeviceTemplate: '',
//       DeviceTemplateGroup: '',
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values) => {
//       // alert(JSON.stringify(values, null, 2));
//       if (selectedServer) {
//         dispatch(UpdateServerSnmpMaster(values));
//       } else {
//         dispatch(PostNewServerSnmpMaster(values));
//       }
//       formik.resetForm();
//       setSelectedServer(null);
//     },
//   });
//   const handleRowClick = (row) => {
//     setSelectedServer(row);
//     formik.setValues({
//       TId: row.TId,
//       DeviceIp: row.DeviceIp,
//       DeviceName: row.DeviceName,
//       DeviceTemplate: row.DeviceTemplate,
//       DeviceTemplateGroup: row.DeviceTemplateGroup,
//     });
//   };
//   const handleRowDelete = () => {
//     dispatch(DeleteServerSnmpMaster({ id: selectedServer.TId }));
//     formik.resetForm(); // Clear form values
//     setSelectedServer(null); // Clear selection
//   };

//   useEffect(() => {
//     const lowerSearch = searchTerm.toLowerCase();
//     const filtered = ServerList.filter((row) =>
//       row.DeviceIp.toLowerCase().includes(lowerSearch) ||
//       row.DeviceName.toLowerCase().includes(lowerSearch)
//     );
//     setFilteredList(filtered);
//   }, [searchTerm, ServerList]);


//   return (
//     <div>
//       <form onSubmit={formik.handleSubmit}>
//         <Grid container spacing={3}>
//           <Grid item xs={12} lg={6}>
//             <Grid container spacing={1}>
//               <Grid item xs={12} sm={12} lg={6}>
//                 <CustomFormLabel htmlFor="name">Device IP/UserName </CustomFormLabel>
//                 <CustomTextField
//                   id="DeviceIp"
//                   name="DeviceIp"
//                   placeholder="Enter IP/UserName"
//                   fullWidth
//                   value={formik.values.DeviceIp}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   error={formik.touched.DeviceIp && Boolean(formik.errors.DeviceIp)}
//                 />
//                 {formik.touched.DeviceIp && formik.errors.DeviceIp && (
//                   <Typography color="error">{formik.errors.DeviceIp}</Typography>
//                 )}
//               </Grid>
//               <Grid item xs={12} sm={12} lg={6}>
//                 <CustomFormLabel htmlFor="name">Device Name</CustomFormLabel>
//                 <CustomTextField
//                   id="DeviceName"
//                   name="DeviceName"
//                   placeholder=" Name"
//                   fullWidth
//                   value={formik.values.DeviceName}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   error={formik.touched.DeviceName && Boolean(formik.errors.DeviceName)}
//                 />
//                 {formik.touched.DeviceName && formik.errors.DeviceName && (
//                   <Typography color="error">{formik.errors.DeviceName}</Typography>
//                 )}
//               </Grid>
//             </Grid>
//           </Grid>

//           <Grid item xs={12} lg={6}>
//             <Grid container spacing={1}>
//               <Grid item xs={12} sm={12} lg={6}>
//                 <CustomFormLabel htmlFor="name">Device Type</CustomFormLabel>
//                 <CustomSelect
//                   id="DeviceTemplate"
//                   name="DeviceTemplate"
//                   fullWidth
//                   variant="outlined"
//                   value={formik.values.DeviceTemplate}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   error={formik.touched.DeviceTemplate && Boolean(formik.errors.DeviceTemplate)}
//                 >
//                   {TemplateList.map((option) => (
//                     <MenuItem key={option.Id} value={option.Id}>
//                       {option.TemplateName}
//                     </MenuItem>
//                   ))}
//                 </CustomSelect>
//                 {formik.touched.DeviceTemplate && formik.errors.DeviceTemplate && (
//                   <Typography color="error">{formik.errors.DeviceTemplate}</Typography>
//                 )}
//               </Grid>
//               <Grid item xs={12} sm={12} lg={6}>
//                 <CustomFormLabel htmlFor="name">Device Category Group</CustomFormLabel>
//                 <CustomSelect
//                   id="DeviceTemplateGroup"
//                   name="DeviceTemplateGroup"
//                   fullWidth
//                   variant="outlined"
//                   value={formik.values.DeviceTemplateGroup}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   error={
//                     formik.touched.DeviceTemplateGroup && Boolean(formik.errors.DeviceTemplateGroup)
//                   }
//                 >
//                   {TemplateGroupList.map((option) => (
//                     <MenuItem key={option.Id} value={option.Id}>
//                       {option.TemplateGroupName}
//                     </MenuItem>
//                   ))}
//                 </CustomSelect>
//                 {formik.touched.DeviceTemplateGroup && formik.errors.DeviceTemplateGroup && (
//                   <Typography color="error">{formik.errors.DeviceTemplateGroup}</Typography>
//                 )}
//               </Grid>
//             </Grid>
//           </Grid>

//           <Grid item xs={12} sm={2} display="flex" alignItems="center">
//             <CustomFormLabel htmlFor="bl-message" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
//               Description
//             </CustomFormLabel>
//           </Grid>
//           <Grid item xs={12} sm={12}>
//             <CustomTextField
//               id="bl-message"
//               placeholder="Little explanation for you activity"
//               multiline
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12} sm={3}></Grid>
//           <Grid item xs={12} sm={9}>
//             <Stack
//               direction={{ xs: 'column', sm: 'row' }}
//               spacing={2}
//               justifyContent="flex-end"
//               mt={2}
//             >
//               <Stack direction="row" spacing={1}>
//                 <Button
//                   variant="contained"
//                   color="secondary"
//                   onClick={() => {
//                     formik.resetForm();
//                     setSelectedServer(null);
//                   }}
//                 >
//                   Clear
//                 </Button>
//                 <Button variant="contained" color="success" type="submit">
//                   {selectedServer ? 'Update' : 'Add New'}
//                 </Button>
//                 {selectedServer && (
//                   <Button
//                     variant="contained"
//                     color="error"
//                     onClick={() => {
//                       handleRowDelete();
//                     }}
//                   >
//                     Delete
//                   </Button>
//                 )}
//               </Stack>
//             </Stack>
//           </Grid>
//           {/* <Grid item xs={12} lg={12}>
//             <Paper variant="outlined">
//               <TableContainer>
//                 <Table
//                   aria-label="simple table"
//                   sx={{
//                     whiteSpace: 'nowrap',
//                   }}
//                 >
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>
//                         <Typography variant="h6">Id</Typography>
//                       </TableCell>
//                       <TableCell>
//                         <Typography variant="h6">Device IP/UserName</Typography>
//                       </TableCell>
//                       <TableCell>
//                         <Typography variant="h6">Device Name</Typography>
//                       </TableCell>
//                       <TableCell>
//                         <Typography variant="h6"> Device Type</Typography>
//                       </TableCell>
//                       <TableCell>
//                         <Typography variant="h6"> Device Category Group</Typography>
//                       </TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {ServerList.map((row) => (
//                       <TableRow key={row.TId} hover onClick={() => handleRowClick(row)}>
//                         <TableCell>{row.TId}</TableCell>
//                         <TableCell>
//                           <Typography color="textSecondary" variant="h6" fontWeight="400">
//                             {row.DeviceIp}
//                           </Typography>
//                         </TableCell>
//                         <TableCell>
//                           <Typography color="textSecondary" variant="h6" fontWeight="400">
//                             {row.DeviceName}
//                           </Typography>
//                         </TableCell>
//                         <TableCell>
//                           <Typography color="textSecondary" variant="h6" fontWeight="400">
//                             {row.DeviceTemplateName}
//                           </Typography>
//                         </TableCell>
//                         <TableCell>
//                           <Typography color="textSecondary" variant="h6" fontWeight="400">
//                             {row.DeviceTemplateGroupName}
//                           </Typography>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Paper>
//           </Grid> */}
//           <Grid item xs={12} lg={12}>
//             <TextField
//               label="Search by Device IP/UserName or Device Name"
//               variant="outlined"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               fullWidth
//               sx={{ marginBottom: 2 }} 
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <SearchIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             <Paper variant="outlined">

//               <TableContainer sx={{ maxHeight: 520 }}>
//                 <Table stickyHeader aria-label="simple table" sx={{ whiteSpace: 'nowrap' }}>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>
//                         <Typography variant="h6">Id</Typography>
//                       </TableCell>
//                       <TableCell>
//                         <Typography variant="h6">Device IP/UserName</Typography>
//                       </TableCell>
//                       <TableCell>
//                         <Typography variant="h6">Device Name</Typography>
//                       </TableCell>
//                       <TableCell>
//                         <Typography variant="h6">Device Type</Typography>
//                       </TableCell>
//                       <TableCell>
//                         <Typography variant="h6">Device Category Group</Typography>
//                       </TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {filteredList.map((row) => (
//                       <TableRow key={row.TId} hover onClick={() => handleRowClick(row)}>
//                         <TableCell>{row.TId}</TableCell>
//                         <TableCell>
//                           <Typography color="textSecondary" variant="h6" fontWeight="400">
//                             {row.DeviceIp}
//                           </Typography>
//                         </TableCell>
//                         <TableCell>
//                           <Typography color="textSecondary" variant="h6" fontWeight="400">
//                             {row.DeviceName}
//                           </Typography>
//                         </TableCell>
//                         <TableCell>
//                           <Typography color="textSecondary" variant="h6" fontWeight="400">
//                             {row.DeviceTemplateName}
//                           </Typography>
//                         </TableCell>
//                         <TableCell>
//                           <Typography color="textSecondary" variant="h6" fontWeight="400">
//                             {row.DeviceTemplateGroupName}
//                           </Typography>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Paper>
//           </Grid>

//         </Grid>
//       </form>
//     </div>
//   );
// };

// export default FrmServer;


import {
  Button,
  Grid,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  Tab,
  Tabs,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { Stack } from '@mui/system';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import {
  DeleteServerSnmpMaster,
  GetServerSnmpMaster,
  GetIAServerSnmpMaster,
  PostNewServerSnmpMaster,
  UpdateServerSnmpMaster,
  ActiveServerSnmpMaster
} from '../../../../store/slices/admin/asset/SeverSlices';
import CustomFormLabel from '../../../theme/theme-elements/CustomFormLabel';
import CustomTextField from '../../../theme/theme-elements/CustomTextField';
import { GetSnmpDeviceTemplateGroupMaster } from '../../../../store/slices/admin/asset/ServerTemplateGroupSlices';
import { GetSnmpDeviceTemplateMaster } from '../../../../store/slices/admin/asset/ServerTemplateSlices';
import CustomSelect from '../../../theme/theme-elements/CustomSelect';

const validationSchema = yup.object({
  DeviceIp: yup
    .string()
    .required('IP Address cannot be empty.')
    .matches(
      /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.([25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.([25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.([25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/,
      'Invalid IP Address',
    ),
  DeviceName: yup.string().required('Device name is Required.'),
  DeviceTemplate: yup.string().required('Please select Device Type.'),
});

const FrmServer = () => {
  const dispatch = useDispatch();
  const { data: ActiveServerList } = useSelector((state) => state.severSlices);
  const { dataInactive: InactiveServerList } = useSelector((state) => state.severSlices);
  const { data: TemplateList } = useSelector((state) => state.serverTemplateSlices);
  const { data: TemplateGroupList } = useSelector((state) => state.serverTemplateGroupSlices);

  const [activeSearchTerm, setActiveSearchTerm] = useState('');
  const [inactiveSearchTerm, setInactiveSearchTerm] = useState('');
  const [selectedServer, setSelectedServer] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    dispatch(GetServerSnmpMaster());
    dispatch(GetIAServerSnmpMaster());
    dispatch(GetSnmpDeviceTemplateMaster());
    dispatch(GetSnmpDeviceTemplateGroupMaster());
  }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Filter active devicessssss
  const filteredActiveDevices = (ActiveServerList || []).filter((row) => {
    const lowerSearch = activeSearchTerm.toLowerCase();
    return (
      row.DeviceIp?.toLowerCase().includes(lowerSearch) ||
      row.DeviceName?.toLowerCase().includes(lowerSearch)
    );
  });

  // Filter inactive devicesssss
  const filteredInactiveDevices = (InactiveServerList || []).filter((row) => {
    const lowerSearch = inactiveSearchTerm.toLowerCase();
    return (
      row.DeviceIp?.toLowerCase().includes(lowerSearch) ||
      row.DeviceName?.toLowerCase().includes(lowerSearch)
    );
  });

  const formik = useFormik({
    initialValues: {
      TId: '',
      DeviceIp: '',
      DeviceName: '',
      DeviceTemplate: '',
      DeviceTemplateGroup: '',
      Status: '',
      IsActive: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const submitValues = {
        ...values,
        IsActive: values.Status === 'Active' ? 'A' : 'I'
      };

      if (selectedServer) {
        dispatch(UpdateServerSnmpMaster(submitValues));
      } else {
        dispatch(PostNewServerSnmpMaster(submitValues));
      }
      formik.resetForm();
      setSelectedServer(null);
    },
  });

  const handleRowClick = (row, isActive) => {
    setSelectedServer({ ...row, IsActive: isActive ? 'A' : 'I' });
    formik.setValues({
      TId: row.TId,
      DeviceIp: row.DeviceIp,
      DeviceName: row.DeviceName,
      DeviceTemplate: row.DeviceTemplate,
      DeviceTemplateGroup: row.DeviceTemplateGroup,
      Status: isActive ? 'Active' : 'Inactive',
      IsActive: isActive ? 'A' : 'I',
    });
  };

  // const handleStatusToggle = () => {
  //   if (selectedServer) {
  //     if (selectedServer.IsActive === 'I') {
  //       // Activate the device
  //       dispatch(ActiveServerSnmpMaster({ id: selectedServer.TId }));
  //     } else {
  //       // Deactivate the device
  //       dispatch(DeleteServerSnmpMaster({ id: selectedServer.TId }));
  //     }
  //     formik.resetForm();
  //     setSelectedServer(null);
  //   }
  // };

  const renderTable = (devices, isActive) => {
    return (
      <Paper variant="outlined">
        <TableContainer sx={{ maxHeight: 520 }}>
          <Table stickyHeader aria-label="simple table" sx={{ whiteSpace: 'nowrap' }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Id</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Device IP/UserName</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Device Name</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Device Type</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Device Category Group</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Status</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {devices.map((row) => (
                <TableRow
                  key={row.TId}
                  hover
                  onClick={() => handleRowClick(row, isActive)}
                  sx={{
                    backgroundColor: !isActive ? 'rgba(255, 0, 0, 0.05)' : 'inherit',
                    '&:hover': {
                      backgroundColor: !isActive ? 'rgba(255, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  <TableCell>{row.TId}</TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6" fontWeight="400">
                      {row.DeviceIp}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6" fontWeight="400">
                      {row.DeviceName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6" fontWeight="400">
                      {row.DeviceTemplateName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6" fontWeight="400" sx={{ textAlign: "center" }}>
                      {row.DeviceTemplateGroupName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color={isActive ? 'success.main' : 'error.main'}
                      variant="h6"
                      fontWeight="600"
                      sx={{ textAlign: "center" }}
                    >
                      {isActive ? 'Active' : 'Inactive'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              {/* Row 1 Device name,devicename,device type,category */}
              <Grid item xs={12} md={6} lg={3}>
                <CustomFormLabel htmlFor="DeviceIp">Device IP/UserName</CustomFormLabel>
                <CustomTextField
                  id="DeviceIp"
                  name="DeviceIp"
                  placeholder="Enter IP/UserName"
                  fullWidth
                  value={formik.values.DeviceIp}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.DeviceIp && Boolean(formik.errors.DeviceIp)}
                />
                {formik.touched.DeviceIp && formik.errors.DeviceIp && (
                  <Typography color="error">{formik.errors.DeviceIp}</Typography>
                )}
              </Grid>

              <Grid item xs={12} md={6} lg={3}>
                <CustomFormLabel htmlFor="DeviceName">Device Name</CustomFormLabel>
                <CustomTextField
                  id="DeviceName"
                  name="DeviceName"
                  placeholder="Name"
                  fullWidth
                  value={formik.values.DeviceName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.DeviceName && Boolean(formik.errors.DeviceName)}
                />
                {formik.touched.DeviceName && formik.errors.DeviceName && (
                  <Typography color="error">{formik.errors.DeviceName}</Typography>
                )}
              </Grid>

              <Grid item xs={12} md={6} lg={3}>
                <CustomFormLabel htmlFor="DeviceTemplate">Device Type</CustomFormLabel>
                <CustomSelect
                  id="DeviceTemplate"
                  name="DeviceTemplate"
                  fullWidth
                  variant="outlined"
                  value={formik.values.DeviceTemplate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.DeviceTemplate && Boolean(formik.errors.DeviceTemplate)}
                >
                  {TemplateList?.map((option) => (
                    <MenuItem key={option.Id} value={option.Id}>{option.TemplateName}</MenuItem>
                  ))}
                </CustomSelect>
                {formik.touched.DeviceTemplate && formik.errors.DeviceTemplate && (
                  <Typography color="error">{formik.errors.DeviceTemplate}</Typography>
                )}
              </Grid>

              <Grid item xs={12} md={6} lg={3}>
                <CustomFormLabel htmlFor="DeviceTemplateGroup">Device Category Group</CustomFormLabel>
                <CustomSelect
                  id="DeviceTemplateGroup"
                  name="DeviceTemplateGroup"
                  fullWidth
                  variant="outlined"
                  value={formik.values.DeviceTemplateGroup}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.DeviceTemplateGroup && Boolean(formik.errors.DeviceTemplateGroup)}
                >
                  {TemplateGroupList?.map((option) => (
                    <MenuItem key={option.Id} value={option.Id}>{option.TemplateGroupName}</MenuItem>
                  ))}
                </CustomSelect>
                {formik.touched.DeviceTemplateGroup && formik.errors.DeviceTemplateGroup && (
                  <Typography color="error">{formik.errors.DeviceTemplateGroup}</Typography>
                )}
              </Grid>

              {/* Row 2 status ad description */}
              <Grid item xs={12} md={6} lg={3}>
                <CustomFormLabel htmlFor="Status">Status</CustomFormLabel>
                <CustomSelect
                  id="Status"
                  name="Status"
                  fullWidth
                  variant="outlined"
                  value={formik.values.Status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.Status && Boolean(formik.errors.Status)}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </CustomSelect>
                {formik.touched.Status && formik.errors.Status && (
                  <Typography color="error">{formik.errors.Status}</Typography>
                )}
              </Grid>

              <Grid item xs={12} md={6} lg={9}>
                <CustomFormLabel
                  htmlFor="bl-message"
                  sx={{ mt: 1, mb: { xs: '-10px', sm: 0 } }}
                >
                  Description
                </CustomFormLabel>
                <CustomTextField
                  id="bl-message"
                  name="Description"
                  placeholder="Little explanation for your activity"
                  multiline
                  fullWidth
                  value={formik.values.Description || ''}
                  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>
          </Grid>



          <Grid item xs={12} sm={3}></Grid>
          <Grid item xs={12} sm={9}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="flex-end"
              mt={2}
            >
              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    formik.resetForm();
                    setSelectedServer(null);
                  }}
                >
                  Clear
                </Button>
                <Button variant="contained" color="success" type="submit">
                  {selectedServer ? 'Update' : 'Add New'}
                </Button>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} lg={12}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="device tabs">
                <Tab label="Active Devices" />
                <Tab label="Inactive Devices" />
              </Tabs>
            </Box>

            {tabValue === 0 && (
              <>
                <TextField
                  label="Search Active Devices"
                  variant="outlined"
                  value={activeSearchTerm}
                  onChange={(e) => setActiveSearchTerm(e.target.value)}
                  fullWidth
                  sx={{ marginBottom: 2, marginTop: 2 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                {renderTable(filteredActiveDevices, true)}
              </>
            )}

            {tabValue === 1 && (
              <>
                <TextField
                  label="Search Inactive Devices"
                  variant="outlined"
                  value={inactiveSearchTerm}
                  onChange={(e) => setInactiveSearchTerm(e.target.value)}
                  fullWidth
                  sx={{ marginBottom: 2, marginTop: 2 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                {renderTable(filteredInactiveDevices, false)}
              </>
            )}
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default FrmServer;
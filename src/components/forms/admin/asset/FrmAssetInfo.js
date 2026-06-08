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
} from '@mui/material';
import { Stack } from '@mui/system';
import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import CustomFormLabel from '../../../theme/theme-elements/CustomFormLabel';
import CustomSelect from '../../../theme/theme-elements/CustomSelect';
import CustomTextField from '../../../theme/theme-elements/CustomTextField';
// import { values } from 'lodash';
const countries = [
  {
    value: 'india',
    label: 'India',
  },
  {
    value: 'uk',
    label: 'United Kingdom',
  },
  {
    value: 'srilanka',
    label: 'Sri lanka',
  },
];

const validationSchema = yup.object({
  deviceType: yup.string().required('Device Type selection is Required'),
  deviceModel: yup.string().required('Device Model selection is Required'),
  name: yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Name is Required'),
  ip: yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('IP Address is Required'),
});

const FrmAssetInfo = () => {
  const formik = useFormik({
    initialValues: {
      deviceType: '',
      deviceModel: '',
      name: '',
      ip: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="fs-country" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                  Device Type
                </CustomFormLabel>
              </Grid>
              <Grid item xs={12} sm={9}>
                <CustomSelect
                  id="deviceType"
                  name="deviceType"
                  value={formik.values.deviceType}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.deviceType && Boolean(formik.errors.deviceType)}
                  fullWidth
                  variant="outlined"
                >
                  {countries.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CustomSelect>
                {formik.touched.deviceType && formik.errors.deviceType && (
                  <Typography color="error">{formik.errors.deviceType}</Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={3} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="name" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                  Device Name
                </CustomFormLabel>
              </Grid>
              <Grid item xs={12} sm={9}>
                <CustomTextField
                  id="name"
                  name="name"
                  placeholder="Name"
                  fullWidth
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                />
                {formik.touched.name && formik.errors.name && (
                  <Typography color="error">{formik.errors.name}</Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
          {/* 2 column */}
          <Grid item xs={12} lg={6}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="fs-country" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                  Device Model
                </CustomFormLabel>
              </Grid>
              <Grid item xs={12} sm={9}>
                <CustomSelect
                  id="deviceModel"
                  name="deviceModel"
                  value={formik.values.deviceModel}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.deviceModel && Boolean(formik.errors.deviceModel)}
                  fullWidth
                  variant="outlined"
                >
                  {countries.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CustomSelect>
                {formik.touched.deviceModel && formik.errors.deviceModel && (
                  <Typography color="error">{formik.errors.deviceModel}</Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={3} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="ip" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                  IP Address
                </CustomFormLabel>
              </Grid>
              <Grid item xs={12} sm={9}>
                <CustomTextField
                  id="ip"
                  name="ip"
                  placeholder="IP Address"
                  fullWidth
                  value={formik.values.ip}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.ip && Boolean(formik.errors.ip)}
                />
                {formik.touched.ip && formik.errors.ip && (
                  <Typography color="error">{formik.errors.ip}</Typography>
                )}
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={3} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="bl-message" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
              Description
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={12}>
            <CustomTextField id="bl-message" placeholder="Little explanation" multiline fullWidth />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="flex-end"
              mt={2}
            >
              <Stack direction="row" spacing={1}>
                <Button variant="contained" color="secondary" onClick={() =>{formik.resetForm();}}>
                  Clear
                </Button>
                <Button variant="contained" color="success" type="submit">
                  Add New
                </Button>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} lg={12}>
            <Paper variant="outlined">
              <TableContainer>
                <Table
                  aria-label="simple table"
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography variant="h6">ID</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">Device Name</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">Device IP</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">Device Type</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">SNMP Status</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody></TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default FrmAssetInfo;

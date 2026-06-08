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
import React from 'react';
import CustomFormLabel from '../../../theme/theme-elements/CustomFormLabel';
import CustomSelect from '../../../theme/theme-elements/CustomSelect';
import CustomTextField from '../../../theme/theme-elements/CustomTextField';

import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { GetSnmpDeviceTemplateGroupMaster } from '../../../../store/slices/admin/asset/ServerTemplateGroupSlices';
import {
  DeleteSnmpDeviceTemplate,
  GetSnmpDeviceTemplateMaster,
  PostSnmpDeviceTemplate,
  UpdateSnmpDeviceTemplate
} from '../../../../store/slices/admin/asset/ServerTemplateSlices';

const validationSchema = yup.object({
  TemplateName: yup.string().required('Template Name is Required.'),
  TemplateCode: yup.string().required('Template Code is Required.'),
});

const FrmServerTemplate = () => {
  const dispatch = useDispatch();
  const { data: TemplateList } = useSelector((state) => state.serverTemplateSlices);
  const { data: TemplateGroupList } = useSelector((state) => state.serverTemplateGroupSlices);
  const [selectedUser, setSelectedUser] = useState(null);
  useEffect(() => {
    dispatch(GetSnmpDeviceTemplateMaster());
    dispatch(GetSnmpDeviceTemplateGroupMaster());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      id: '',
      TemplateName: '',
      TemplateCode: '',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (selectedUser) {
        dispatch(UpdateSnmpDeviceTemplate(values));
      } else {
        dispatch(PostSnmpDeviceTemplate(values));
      }
      formik.resetForm();
      setSelectedUser(null);
    },
  });
  const handleRowClick = (row) => {
    setSelectedUser(row);
    formik.setValues({
      id: row.Id,
      TemplateName: row.TemplateName,
      TemplateCode: row.Group_name,
      description: row.description || '',
    });
  };
  const handleRowDelete = () => {
    dispatch(DeleteSnmpDeviceTemplate({ id: selectedUser.Id }));
    formik.resetForm(); // Clear form values
  setSelectedUser(null); // Clear selection
  };
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} lg={6}>
                <CustomFormLabel htmlFor="name">Device Type</CustomFormLabel>
                <CustomTextField
                  id="TemplateName"
                  name="TemplateName"
                  placeholder="User Name"
                  fullWidth
                  value={formik.values.TemplateName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.TemplateName && Boolean(formik.errors.TemplateName)}
                />
                {formik.touched.TemplateName && formik.errors.TemplateName && (
                  <Typography color="error">{formik.errors.TemplateName}</Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={12} lg={6}>
                <CustomFormLabel htmlFor="name">
                  Category Name</CustomFormLabel>
                <CustomSelect
                  id="TemplateCode"
                  name="TemplateCode"
                  fullWidth
                  variant="outlined"
                  value={formik.values.TemplateCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.TemplateCode && Boolean(formik.errors.TemplateCode)}
                >
                  {TemplateGroupList.map((option) => (
                    <MenuItem key={option.Id} value={option.Id}>
                      {option.TemplateGroupName}
                    </MenuItem>
                  ))}
                </CustomSelect>
                {formik.touched.TemplateCode && formik.errors.TemplateCode && (
                  <Typography color="error">{formik.errors.TemplateCode}</Typography>
                )}
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={2} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="bl-message" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
              Description
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={12}>
            <CustomTextField
              id="description"
              name="description"
              placeholder="User Description"
              multiline
              fullWidth
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.description && Boolean(formik.errors.description)}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
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
                    setSelectedUser(null);
                  }}
                >
                  Clear
                </Button>
                <Button variant="contained" color="success" type="submit">
                  {selectedUser ? 'Update' : 'Add New'}
                </Button>
                {selectedUser && (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      handleRowDelete();
                    }}
                  >
                    Delete
                  </Button>
                )}
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
                        <Typography variant="h6">Device Type</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">
                          Category Name</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">Description</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {TemplateList.map((row) => (
                      <TableRow key={row.Id} hover onClick={() => handleRowClick(row)}>
                        <TableCell>{row.Id}</TableCell>
                        <TableCell>
                          <Typography color="textSecondary" variant="h6" fontWeight="400">
                            {row.TemplateName}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography color="textSecondary" variant="h6" fontWeight="400">
                            {row.Group_name_Desc}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography color="textSecondary" variant="h6" fontWeight="400">
                            {row.description}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}</TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default FrmServerTemplate;

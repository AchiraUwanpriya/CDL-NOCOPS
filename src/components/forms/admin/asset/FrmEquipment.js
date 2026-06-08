import {
  Box,
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
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { GetBrand } from '../../../../store/slices/admin/asset/BrandSlices';
import { GetCategory } from '../../../../store/slices/admin/asset/CategorySlices';
import {
  DeleteEquipment,
  GetEquipment,
  PostNewEquipment,
  UpdateEquipment,
} from '../../../../store/slices/admin/asset/EquipmentSlices';
import { GetEqType } from '../../../../store/slices/admin/asset/EquipmentTypeSlices';
import { GetLocation } from '../../../../store/slices/admin/asset/LocationSlices';
import { GetModel } from '../../../../store/slices/admin/asset/ModelSlices';
import { GetSeverity } from '../../../../store/slices/admin/asset/SeveritySlices';
import CustomFormLabel from '../../../theme/theme-elements/CustomFormLabel';
import CustomSelect from '../../../theme/theme-elements/CustomSelect';
import CustomTextField from '../../../theme/theme-elements/CustomTextField';

const validationSchema = yup.object({
  ip_address: yup
    .string()
    .required('IP Address cannot be empty.')
    .matches(
      /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.([25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.([25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.([25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/,
      'Invalid IP Address',
    ),
  asset_name: yup.string().required('Name cannot be empty.'),
  serial: yup.string().required('Serial number cannot be empty.'),
  owner: yup.string().required('Owner cannot be empty.'),
  model: yup.string().required('Please select Model.'),
  type: yup.string().required('Please select EQ Type.'),
  brand: yup.string().required('Please select Brand.'),
  category: yup.string().required('Please select Category.'),
  severity: yup.string().required('Please select Severity.'),
  Loc_id: yup.string().required('Please select Location.'),
});

const FrmEquipment = () => {
  const dispatch = useDispatch();
  const { data: EquipmentList } = useSelector((state) => state.equipmentSlices);
  const { data: SeverityList } = useSelector((state) => state.severitySlices);
  const { data: CategoryList } = useSelector((state) => state.categorySlices);
  const { data: ModelList } = useSelector((state) => state.modelSlices);
  const { data: LocationList } = useSelector((state) => state.locationSlices);
  const { data: EqTypeList } = useSelector((state) => state.equipmentTypeSlices);
  const { data: BrandList } = useSelector((state) => state.brandSlices);
  const [selectedUser, setSelectedUser] = useState(null);
  useEffect(() => {
    dispatch(GetEquipment());

    if (!SeverityList.length > 0) {
      dispatch(GetSeverity());
    }
    if (!CategoryList.length > 0) {
      dispatch(GetCategory());
    }
    if (!ModelList.length > 0) {
      dispatch(GetModel());
    }
    if (!LocationList.length > 0) {
      dispatch(GetLocation());
    }
    if (!EqTypeList.length > 0) {
      dispatch(GetEqType());
    }
    if (!BrandList.length > 0) {
      dispatch(GetBrand());
    }
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      asset_id: '',
      ip_address: '',
      asset_name: '',
      machine_type: '1',
      serial: '',
      owner: '',
      model: '',
      type: '',
      brand: '',
      category: '',
      severity: '',
      Loc_id: '',
      company_id: '27',
      parent_key: '39',
      desc: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      if (selectedUser) {
        dispatch(UpdateEquipment(values));
      } else {
        dispatch(PostNewEquipment(values));
      }
      formik.resetForm();
      setSelectedUser(null);
    },
  });
  const handleRowClick = (row) => {
    setSelectedUser(row);
    formik.setValues({
      asset_id: row.asset_id,
      ip_address: row.ip_address,
      asset_name: row.asset_name,
      machine_type: '1',
      serial: row.serial,
      owner: row.owner,
      model: row.modelId,
      type: row.type,
      brand: row.brandId,
      category: row.categoryId,
      severity: row.severityId,
      Loc_id: row.Loc_id,
      company_id: '27',
      parent_key: '39',
      desc: row.desc,
    });
  };
  const handleRowDelete = () => {
    dispatch(DeleteEquipment({ id: selectedUser.asset_id }));
        formik.resetForm(); // Clear form values
  setSelectedUser(null); // Clear selection
  };
  return (
    <Box >
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3} >
          <Grid item xs={12} lg={6}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} lg={6}>
                <CustomFormLabel htmlFor="name">IP Address</CustomFormLabel>
                <CustomTextField
                  id="ip_address"
                  name="ip_address"
                  placeholder="192.168.1.1"
                  fullWidth
                  value={formik.values.ip_address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.ip_address && Boolean(formik.errors.ip_address)}
                />
                {formik.touched.ip_address && formik.errors.ip_address && (
                  <Typography color="error">{formik.errors.ip_address}</Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={12} lg={6}>
                <CustomFormLabel htmlFor="name">Name</CustomFormLabel>
                <CustomTextField
                  id="asset_name"
                  name="asset_name"
                  placeholder="Enter name here"
                  fullWidth
                  value={formik.values.asset_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.asset_name && Boolean(formik.errors.asset_name)}
                />
                {formik.touched.asset_name && formik.errors.asset_name && (
                  <Typography color="error">{formik.errors.asset_name}</Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
          {/* 2 column */}
          <Grid item xs={12} lg={6}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} lg={6}>
                <CustomFormLabel htmlFor="name">Model</CustomFormLabel>

                <CustomSelect
                  id="model"
                  name="model"
                  fullWidth
                  variant="outlined"
                  value={formik.values.model}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.model && Boolean(formik.errors.model)}
                >
                  {ModelList.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </CustomSelect>
                {formik.touched.model && formik.errors.model && (
                  <Typography color="error">{formik.errors.model}</Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={12} lg={6}>
                <CustomFormLabel htmlFor="name">Serial</CustomFormLabel>
                <CustomTextField
                  id="serial"
                  name="serial"
                  placeholder="Enter serial number here"
                  fullWidth
                  value={formik.values.serial}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.serial && Boolean(formik.errors.serial)}
                />
                {formik.touched.serial && formik.errors.serial && (
                  <Typography color="error">{formik.errors.serial}</Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} lg={6}>
                <CustomFormLabel htmlFor="name">Type</CustomFormLabel>
                <CustomSelect
                  id="type"
                  name="type"
                  fullWidth
                  variant="outlined"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.type && Boolean(formik.errors.type)}
                >
                  {EqTypeList.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </CustomSelect>
                {formik.touched.type && formik.errors.type && (
                  <Typography color="error">{formik.errors.type}</Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={12} lg={6}>
                <CustomFormLabel htmlFor="name">Brand</CustomFormLabel>
                <CustomSelect
                  id="brand"
                  name="brand"
                  fullWidth
                  variant="outlined"
                  value={formik.values.brand}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.brand && Boolean(formik.errors.brand)}
                >
                  {BrandList.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </CustomSelect>
                {formik.touched.brand && formik.errors.brand && (
                  <Typography color="error">{formik.errors.brand}</Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
          {/* 2 column */}
          <Grid item xs={12} lg={6}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} lg={6}>
                <CustomFormLabel htmlFor="name">Category</CustomFormLabel>
                <CustomSelect
                  id="category"
                  name="category"
                  fullWidth
                  variant="outlined"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.category && Boolean(formik.errors.category)}
                >
                  {CategoryList.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </CustomSelect>
                {formik.touched.category && formik.errors.category && (
                  <Typography color="error">{formik.errors.category}</Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={12} lg={6}>
                <CustomFormLabel htmlFor="name">Severity</CustomFormLabel>
                <CustomSelect
                  id="severity"
                  name="severity"
                  fullWidth
                  variant="outlined"
                  value={formik.values.severity}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.severity && Boolean(formik.errors.severity)}
                >
                  {SeverityList.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </CustomSelect>
                {formik.touched.severity && formik.errors.severity && (
                  <Typography color="error">{formik.errors.severity}</Typography>
                )}
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} lg={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} lg={6}>
                <CustomFormLabel htmlFor="name">Owner</CustomFormLabel>
                <CustomTextField
                  id="owner"
                  name="owner"
                  placeholder="Enter owner name here"
                  fullWidth
                  value={formik.values.owner}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.owner && Boolean(formik.errors.owner)}
                />
                {formik.touched.owner && formik.errors.owner && (
                  <Typography color="error">{formik.errors.owner}</Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={12} lg={6}>
                <CustomFormLabel htmlFor="name">Location</CustomFormLabel>
                <CustomSelect
                  id="Loc_id"
                  name="Loc_id"
                  fullWidth
                  variant="outlined"
                  value={formik.values.Loc_id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.Loc_id && Boolean(formik.errors.Loc_id)}
                >
                  {LocationList.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </CustomSelect>
                {formik.touched.Loc_id && formik.errors.Loc_id && (
                  <Typography color="error">{formik.errors.Loc_id}</Typography>
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
            <CustomTextField
              id="desc"
              name="desc"
              placeholder="User Description"
              multiline
              fullWidth
              value={formik.values.desc}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.desc && Boolean(formik.errors.desc)}
            />
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
                  sx={
                    {
                      // whiteSpace: 'nowrap'
                    }
                  }
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography variant="h6">Threshold</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">IP Address</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">Name</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">Type</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">Description</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">Brand</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">Model</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">Serial</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">Owner</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">Severity</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">Category</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">Location</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">Action</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {EquipmentList.map((row) => (
                      <TableRow key={row.Id} hover onClick={() => handleRowClick(row)}>
                        <TableCell align="left"></TableCell>
                        <TableCell align="left">
                          <Typography color="textSecondary" variant="h6" fontWeight="400">
                            {row.ip_address}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography color="textSecondary" variant="h6" fontWeight="400">
                            {row.asset_name}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography color="textSecondary" variant="h6" fontWeight="400">
                            {row.type_name}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography color="textSecondary" variant="h6" fontWeight="400">
                            {row.desc}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography color="textSecondary" variant="h6" fontWeight="400">
                            {row.brand}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography color="textSecondary" variant="h6" fontWeight="400">
                            {row.model}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography color="textSecondary" variant="h6" fontWeight="400">
                            {row.serial}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography color="textSecondary" variant="h6" fontWeight="400">
                            {row.owner}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography color="textSecondary" variant="h6" fontWeight="400">
                            {row.severity}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography color="textSecondary" variant="h6" fontWeight="400">
                            {row.category}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography color="textSecondary" variant="h6" fontWeight="400">
                            {row.Loc}
                          </Typography>
                        </TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="left"></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default FrmEquipment;

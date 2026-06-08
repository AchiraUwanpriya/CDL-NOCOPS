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
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { GetCompany } from '../../../../store/slices/admin/asset/CompanySlices';
import {
  DeleteUser,
  GetUser,
  PostNewUser,
  UpdateUser
} from '../../../../store/slices/admin/asset/UserSlices';
import CustomFormLabel from '../../../theme/theme-elements/CustomFormLabel';
import CustomSelect from '../../../theme/theme-elements/CustomSelect';
import CustomTextField from '../../../theme/theme-elements/CustomTextField';

const countries = [
  {
    value: 'A',
    label: 'Admin',
  },
  {
    value: 'M',
    label: 'Manager',
  },
  {
    value: 'U',
    label: 'User',
  },
  {
    value: 'V',
    label: 'Viewer',
  },
];

const validationSchema = yup.object({
  user_name: yup.string().required('User Name is Required.'),
  password: yup.string().required('Password is Required.'),
  company_id: yup.string().required('Please select company.'),
  type: yup.string().required('Please select user type.'),
});
const FrmUser = () => {
  const dispatch = useDispatch();
  const { data: UserList } = useSelector((state) => state.userSlices);
  const { data: CompanyList } = useSelector((state) => state.companySlices);
  const [selectedUser, setSelectedUser] = useState(null);
  useEffect(() => {
    dispatch(GetCompany());
    dispatch(GetUser());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      Id: '',
      user_name: '',
      password: '',
      company_id: '',
      type: '',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      if (selectedUser) {
        dispatch(UpdateUser(values));
      } else {
        dispatch(PostNewUser(values));
      }
      formik.resetForm();
      setSelectedUser(null);
    },
  });
  const handleRowClick = (row) => {
    setSelectedUser(row);
    formik.setValues({
      Id: row.Id,
      user_name: row.user_name,
      company_id: row.company_id,
      password: '',
      type: row.type,
      description: row.description || '',
    });
  };
  const handleRowDelete = () => {
    dispatch(DeleteUser({ id: selectedUser.Id }));
  };
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={12} lg={12}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} lg={6}>
                <CustomFormLabel htmlFor="name">User Name</CustomFormLabel>
                <CustomTextField
                  id="user_name"
                  name="user_name"
                  placeholder="User Name"
                  fullWidth
                  value={formik.values.user_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.user_name && Boolean(formik.errors.user_name)}
                />
                {formik.touched.user_name && formik.errors.user_name && (
                  <Typography color="error">{formik.errors.user_name}</Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={12} lg={6}>
                <CustomFormLabel htmlFor="name">Password</CustomFormLabel>
                <CustomTextField
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  fullWidth
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                />
                {formik.touched.password && formik.errors.password && (
                  <Typography color="error">{formik.errors.password}</Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} lg={6}>
                <CustomFormLabel htmlFor="name">Company</CustomFormLabel>
                <CustomSelect
                  id="company_id"
                  name="company_id"
                  fullWidth
                  variant="outlined"
                  value={formik.values.company_id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.company_id && Boolean(formik.errors.company_id)}
                >
                  {CompanyList.map((option) => (
                    <MenuItem key={option.Id} value={option.Id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </CustomSelect>
                {formik.touched.company_id && formik.errors.company_id && (
                  <Typography color="error">{formik.errors.company_id}</Typography>
                )}
              </Grid>
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
                  {countries.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CustomSelect>
                {formik.touched.type && formik.errors.type && (
                  <Typography color="error">{formik.errors.type}</Typography>
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
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography variant="h6">User ID</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">User Name</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">Company</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">Type</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">Description</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {UserList.map((row) => (
                      <TableRow key={row.Id} hover onClick={() => handleRowClick(row)}>
                        <TableCell>{row.Id}</TableCell>
                        <TableCell>
                          <Typography color="textSecondary" variant="h6" fontWeight="400">
                            {row.user_name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography color="textSecondary" variant="h6" fontWeight="400">
                            {row.company}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography color="textSecondary" variant="h6" fontWeight="400">
                            {row.type === 'A'
                              ? 'Admin'
                              : row.type === 'U'
                              ? 'User'
                              : row.type === 'M'
                              ? 'Manager'
                              : row.type === 'V'
                              ? 'Viewer'
                              : ''}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography color="textSecondary" variant="h6" fontWeight="400">
                            {row.description}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default FrmUser;

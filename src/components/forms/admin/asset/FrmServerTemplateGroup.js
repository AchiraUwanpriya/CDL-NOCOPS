import {
  Button,
  Grid,
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
import {
  DeleteSnmpDeviceTemplateGroup,
  GetSnmpDeviceTemplateGroupMaster,
  PostSnmpDeviceTemplateGroup,
  UpdateSnmpDeviceTemplateGroup
} from '../../../../store/slices/admin/asset/ServerTemplateGroupSlices';
import CustomFormLabel from '../../../theme/theme-elements/CustomFormLabel';
import CustomTextField from '../../../theme/theme-elements/CustomTextField';
const validationSchema = yup.object({
  TemplateGroupName: yup.string().required('Group Name is Required.'),
  TemplateGroupCode: yup.string().required('Group Code is Required.'),
});

const FrmServerTemplateGroup = () => {
  const dispatch = useDispatch();
  const { data: TemplateGroupList } = useSelector((state) => state.serverTemplateGroupSlices);
  const [selectedGroup, setSelectedGroup] = useState(null);
  useEffect(() => {
    dispatch(GetSnmpDeviceTemplateGroupMaster());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      id: '',
      TemplateGroupName: '',
      TemplateGroupCode: '',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (selectedGroup) {
        dispatch(UpdateSnmpDeviceTemplateGroup(values));
      } else {
        dispatch(PostSnmpDeviceTemplateGroup(values));
      }
      formik.resetForm();
      setSelectedGroup(null);
    },
  });

  const handleRowClick = (row) => {
    setSelectedGroup(row);
    formik.setValues({
      id: row.Id,
      TemplateGroupName: row.TemplateGroupName,
      TemplateGroupCode: row.TemplateGroupCode,
      description: row.description || '',
    });
  };

  const handleRowDelete = () => {
    dispatch(DeleteSnmpDeviceTemplateGroup({ id: selectedGroup.Id }));
    formik.resetForm(); // Clear form values
  setSelectedGroup(null); // Clear selection
  };
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} lg={6}>
                <CustomFormLabel htmlFor="name">Category Name</CustomFormLabel>
                <CustomTextField
                  id="TemplateGroupName"
                  name="TemplateGroupName"
                  placeholder="User Name"
                  fullWidth
                  value={formik.values.TemplateGroupName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.TemplateGroupName && Boolean(formik.errors.TemplateGroupName)
                  }
                />
                {formik.touched.TemplateGroupName && formik.errors.TemplateGroupName && (
                  <Typography color="error">{formik.errors.TemplateGroupName}</Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={12} lg={6}>
                <CustomFormLabel htmlFor="name">Code</CustomFormLabel>
                <CustomTextField
                  id="TemplateGroupCode"
                  name="TemplateGroupCode"
                  placeholder="Group Code"
                  fullWidth
                  value={formik.values.TemplateGroupCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.TemplateGroupCode && Boolean(formik.errors.TemplateGroupCode)
                  }
                />
                {formik.touched.TemplateGroupCode && formik.errors.TemplateGroupCode && (
                  <Typography color="error">{formik.errors.TemplateGroupCode}</Typography>
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
                    setSelectedGroup(null);
                  }}
                >
                  Clear
                </Button>
                <Button variant="contained" color="success" type="submit">
                  {selectedGroup ? 'Update' : 'Add New'}
                </Button>
                {selectedGroup && (
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
                        <Typography variant="h6">Category Name</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">Group Code</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">Description</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {TemplateGroupList.map((row) => (
                      <TableRow key={row.Id} hover onClick={() => handleRowClick(row)}>
                        <TableCell>{row.Id}</TableCell>
                        <TableCell>
                          <Typography color="textSecondary" variant="h6" fontWeight="400">
                            {row.TemplateGroupName}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography color="textSecondary" variant="h6" fontWeight="400">
                            {row.TemplateGroupCode}
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

export default FrmServerTemplateGroup;

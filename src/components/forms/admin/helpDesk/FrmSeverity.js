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
  DeleteSeverity, GetHelpDeskSeverities, PostNewSeverity, UpdateSeverity
} from '../../../../store/slices/admin/helpDesk/SeveritySlices';
import CustomFormLabel from '../../../theme/theme-elements/CustomFormLabel';
import CustomTextField from '../../../theme/theme-elements/CustomTextField';
const validationSchema = yup.object({
  name: yup.string().required('Severity Name is Required'),
});
const FrmSeverity = () => {
  const dispatch = useDispatch();
  const { data: SeverityList } = useSelector((state) => state.helpDeskSeveritySlices);
  const [selectedBrand, setSelectedBrand] = useState(null);
  useEffect(() => {
    dispatch(GetHelpDeskSeverities());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      id: '',
      name: '',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (selectedBrand) {
        dispatch(UpdateSeverity(values));
      } else {
        dispatch(PostNewSeverity(values));
      }
      formik.resetForm();
      setSelectedBrand(null);
    },
  });
  const handleRowClick = (row) => {
    setSelectedBrand(row);
    formik.setValues({
      id: row.Id,
      name: row.Name,
      description: row.Description || '',
    });
  };

  const handleRowDelete = () => {
    dispatch(DeleteSeverity({ id: selectedBrand.Id }));
  };
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
        <Grid item xs={2} sm={1} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="bl-name" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
              Name
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={9}>
          <CustomTextField
              id="name"
              name="name"
              placeholder="Severity"
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
          <Grid item xs={1} sm={2}></Grid>
          <Grid item xs={2} sm={1} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="bl-message" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
              Description
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={9}>
          <CustomTextField
              id="description"
              name="description"
              placeholder="Little explanation "
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
                    setSelectedBrand(null);
                  }}
                >
                  Clear
                </Button>
                <Button variant="contained" color="success" type="submit">
                  {selectedBrand ? 'Update' : 'Add New'}
                </Button>
                {selectedBrand && (
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
                        <Typography variant="h6">Name</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">Description</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {SeverityList.map((row) => (
                      <TableRow key={row.Id} hover onClick={() => handleRowClick(row)}>
                        <TableCell>{row.Id}</TableCell>
                        <TableCell>
                          <Typography color="textSecondary" variant="h6" fontWeight="400">
                            {row.Name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography color="textSecondary" variant="h6" fontWeight="400">
                            {row.Description}
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

export default FrmSeverity;

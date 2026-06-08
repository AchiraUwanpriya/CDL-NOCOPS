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
  DeleteSeverity,
  GetSeverity,
  PostNewseverity,
  UpdateSeverity,
} from '../../../../store/slices/admin/asset/SeveritySlices';
import CustomFormLabel from '../../../theme/theme-elements/CustomFormLabel';
import CustomTextField from '../../../theme/theme-elements/CustomTextField';

const validationSchema = yup.object({
  name: yup.string().required('Severity Name is Required'),
});
const FrmSeverity = () => {
  const dispatch = useDispatch();
  const { data: SeverityList } = useSelector((state) => state.severitySlices);
  const [selectedSeverity, setSelectedSeverity] = useState(null);
  useEffect(() => {
    dispatch(GetSeverity());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      id: '',
      name: '',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (selectedSeverity) {
        dispatch(UpdateSeverity(values));
      } else {
        dispatch(PostNewseverity(values));
      }
      formik.resetForm();
      setSelectedSeverity(null);
    },
  });

  const handleRowClick = (row) => {
    setSelectedSeverity(row);
    formik.setValues({
      id: row.id,
      name: row.name,
      description: row.description || '',
    });
  };

  const handleRowDelete = () => {
    dispatch(DeleteSeverity({ id: selectedSeverity.id }));
    formik.resetForm(); // Clear form values
  setSelectedSeverity(null); // Clear selection
  };
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="bl-name" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
              Name
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={9}>
            <CustomTextField
              id="name"
              name="name"
              placeholder="Company Name"
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
          <Grid item xs={12} sm={3} display="flex" alignItems="center">
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
                    setSelectedSeverity(null);
                  }}
                >
                  Clear
                </Button>
                <Button variant="contained" color="success" type="submit">
                  {selectedSeverity ? 'Update' : 'Add New'}
                </Button>
                {selectedSeverity && (
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
                    {' '}
                    {SeverityList.map((row) => (
                      <TableRow key={row.id} hover onClick={() => handleRowClick(row)}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>
                          <Typography color="textSecondary" variant="h6" fontWeight="400">
                            {row.name}
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

export default FrmSeverity;

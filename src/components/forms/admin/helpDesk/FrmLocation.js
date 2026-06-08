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
  DeleteLocation,
  GetLocation,
  PostNewLocation,
  UpdateLocation
} from '../../../../store/slices/admin/helpDesk/LocationSlices';
import CustomFormLabel from '../../../theme/theme-elements/CustomFormLabel';
import CustomTextField from '../../../theme/theme-elements/CustomTextField';

const validationSchema = yup.object({
  Name: yup.string().required('Location Name is Required'),
});

const FrmLocation = () => {
  const dispatch = useDispatch();
  const { data: LocationList } = useSelector((state) => state.admin_locationSlices);
  const [selectedLocation, setSelectedLocation] = useState(null);
  useEffect(() => {
    dispatch(GetLocation());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      Id: '',
      Name: '',
      Description: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (selectedLocation) {
        dispatch(UpdateLocation(values));
      } else {
        dispatch(PostNewLocation(values));
      }
      formik.resetForm();
      setSelectedLocation(null);
    },
  });

  const handleRowClick = (row) => {
    setSelectedLocation(row);
    formik.setValues({
      Id: row.Id,
      Name: row.Name,
      Description: row.Description || '',
    });
  };

  const handleRowDelete = () => {
    dispatch(DeleteLocation({ id: selectedLocation.Id }));
    formik.resetForm(); // Clear form values
    setSelectedLocation(null); // Clear selection
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
              id="Name"
              name="Name"
              placeholder="Location Name"
              fullWidth
              value={formik.values.Name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.Name && Boolean(formik.errors.Name)}
            />
            {formik.touched.Name && formik.errors.Name && (
              <Typography color="error">{formik.errors.Name}</Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={3} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="bl-message" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
              Description
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={9}>
            <CustomTextField
              id="Description"
              name="Description"
              placeholder="Little explanation "
              multiline
              fullWidth
              value={formik.values.Description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.Description && Boolean(formik.errors.Description)}
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
                    setSelectedLocation(null);
                  }}
                >
                  Clear
                </Button>
                <Button variant="contained" color="success" type="submit">
                  {selectedLocation ? 'Update' : 'Add New'}
                </Button>
                {selectedLocation && (
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
                    {LocationList.map((row) => (
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

export default FrmLocation;

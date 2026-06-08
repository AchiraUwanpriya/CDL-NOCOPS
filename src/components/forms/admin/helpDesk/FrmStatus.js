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
  Typography
} from '@mui/material';
import { Stack } from '@mui/system';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import {
  DeleteStatus, GetHelpDeskStatuses, PostNewStatus, UpdateStatus
} from '../../../../store/slices/admin/helpDesk/StatusTypeSlices';
import CustomFormLabel from '../../../theme/theme-elements/CustomFormLabel';
import CustomTextField from '../../../theme/theme-elements/CustomTextField';
import CustomSelect from '../../../theme/theme-elements/CustomSelect';

const validationSchema = yup.object({
  description: yup.string().required('Description Name is Required'),
});
const FrmStatus = () => {
  const dispatch = useDispatch();
  const { data: List } = useSelector((state) => state.helpDeskStatusTypeSlices);
  const [selectedBrand, setSelectedBrand] = useState(null);
  useEffect(() => {
    dispatch(GetHelpDeskStatuses());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      id: '',
      SortOrder: '',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (!selectedBrand) {
        dispatch(PostNewStatus(values));
      } else {

        dispatch(UpdateStatus(values));
      }
      formik.resetForm();
      setSelectedBrand(null);
    },
  });
  const handleRowClick = (row) => {
    setSelectedBrand(row);
    formik.setValues({
      id: row.Id,
      SortOrder: row.SortOrder,
      description: row.Description || '',
    });
  };

  const handleRowDelete = () => {
    dispatch(DeleteStatus({ id: selectedBrand.Id }));
    formik.resetForm(); // Clear form values
  setSelectedBrand(null); // Clear selection
  };
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={2} sm={1} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="bl-SortOrder" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
              Status Order
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={1}>
            <CustomSelect
              id="SortOrder"
              name="SortOrder"
              placeholder="Status Order"
              fullWidth
              value={formik.values.SortOrder}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.SortOrder && Boolean(formik.errors.SortOrder)}
            >
              <MenuItem key={1} value={1}>
                  1
                </MenuItem>
                <MenuItem key={2} value={2}>
                  2
                </MenuItem>
                <MenuItem key={3} value={3}>
                  3
                </MenuItem>
                <MenuItem key={4} value={4}>
                  4
                </MenuItem>
                <MenuItem key={5} value={5}>
                  5
                </MenuItem>
                <MenuItem key={6} value={6}>
                  6
                </MenuItem>
                <MenuItem key={7} value={7}>
                  7
                </MenuItem>
                <MenuItem key={8} value={8}>
                  8
                </MenuItem>
                <MenuItem key={9} value={9}>
                  9
                </MenuItem>
                <MenuItem key={10} value={10}>
                  10
                </MenuItem>
              {formik.touched.SortOrder && formik.errors.SortOrder && (
              <Typography color="error">{formik.errors.SortOrder}</Typography>
            )}
            </CustomSelect>
          </Grid>
          <Grid item xs={12} sm={12}></Grid>
          {/* <Grid item xs={1} sm={2}></Grid> */}
          <Grid item xs={2} sm={1} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="bl-SortOrder" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
              Status Name
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={9}>
            <CustomTextField
              id="description"
              name="description"
              placeholder="Status "
              fullWidth
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.description && Boolean(formik.errors.description)}
            />
            {formik.touched.description && formik.errors.description && (
              <Typography color="error">{formik.errors.description}</Typography>
            )}
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
                        <Typography variant="h6">Order</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">Status</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {List.map((row) => (
                      <TableRow key={row.Id} hover onClick={() => handleRowClick(row)}>
                        <TableCell>{row.Id}</TableCell>
                        <TableCell>
                          <Typography color="textSecondary" variant="h6" fontWeight="400">
                            {row.SortOrder}
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

export default FrmStatus;

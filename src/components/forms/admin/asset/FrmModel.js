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
import { DeleteModel, GetModel, PostNewModel, UpdateModel } from '../../../../store/slices/admin/asset/ModelSlices';
import CustomFormLabel from '../../../theme/theme-elements/CustomFormLabel';
import CustomTextField from '../../../theme/theme-elements/CustomTextField';

const validationSchema = yup.object({
  name: yup.string().required('Model Name is Required'),
});

const FrmModel = () => {
  const dispatch = useDispatch();
  const { data: ModelList } = useSelector((state) => state.modelSlices);
  const [selectedModel, setSelectedModel] = useState(null);
  useEffect(() => {
    dispatch(GetModel());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      id: '',
      name: '',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (selectedModel) {
        dispatch(UpdateModel(values));
      } else {
        dispatch(PostNewModel(values));
      }
      //dispatch(GetCompany());
      formik.resetForm();
      setSelectedModel(null);
    },
  });

  const handleRowClick = (row) => {
    setSelectedModel(row);
    formik.setValues({
      id: row.id,
      name: row.name,
      description: row.description || '',
    });
  };

  const handleRowDelete = () => {
    dispatch(DeleteModel({ id: selectedModel.id }));
    formik.resetForm(); // Clear form values
  setSelectedModel(null); // Clear selection
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
                    setSelectedModel(null);
                  }}
                >
                  Clear
                </Button>
                <Button variant="contained" color="success" type="submit">
                  {selectedModel ? 'Update' : 'Add New'}
                </Button>
                {selectedModel && (
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
                    {ModelList.map((row) => (
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

export default FrmModel;

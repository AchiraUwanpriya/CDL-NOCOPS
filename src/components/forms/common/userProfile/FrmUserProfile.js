import { Button, Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import User1Img from '../../../../assets/images/profile/user-1.jpg';
import CustomFormLabel from '../../../../components/theme/theme-elements/CustomFormLabel';
import CustomTextField from '../../../../components/theme/theme-elements/CustomTextField';

const validationSchema = yup.object({
  password: yup.string().required('New Password is Required'),
  cpassword: yup.string().required('Confirm Password is Required'),
});

const FrmUserProfile = () => {
  const formik = useFormik({
    initialValues: {
      id: '',
      password: '',
      cpassword: '',
    },
    validationSchema: validationSchema,
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          {/* Left side with the image */}
          <Grid item xs={12} sm={4}>
            <img
              src={User1Img}
              alt="Profile"
              style={{ width: '75%', height: 'auto', borderRadius: '8px' }}
            />
          </Grid>

          <Grid item xs={12} sm={8}>
            <Grid container spacing={3}>
              <Grid item xs={2} sm={3} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="bl-name" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                  New Password
                </CustomFormLabel>
              </Grid>
              <Grid item xs={12} sm={9}>
                <CustomTextField
                  id="password"
                  name="password"
                  placeholder="New Password"
                  type="password"
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

              <Grid item xs={2} sm={3} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="bl-name" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                  Confirm Password
                </CustomFormLabel>
              </Grid>
              <Grid item xs={12} sm={9}>
                <CustomTextField
                  id="cpassword"
                  name="cpassword"
                  placeholder="Confirm Password"
                  type="password"
                  fullWidth
                  value={formik.values.cpassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.cpassword && Boolean(formik.errors.cpassword)}
                />
                {formik.touched.cpassword && formik.errors.cpassword && (
                  <Typography color="error">{formik.errors.cpassword}</Typography>
                )}
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
                      }}
                    >
                      Clear
                    </Button>
                    <Button variant="contained" color="success" type="submit">
                      Update
                    </Button>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default FrmUserProfile;

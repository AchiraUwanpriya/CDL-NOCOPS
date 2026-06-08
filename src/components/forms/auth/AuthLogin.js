import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Divider,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography
} from '@mui/material';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import CustomCheckbox from '../../theme/theme-elements/CustomCheckbox';
import CustomFormLabel from '../../theme/theme-elements/CustomFormLabel';
import CustomTextField from '../../theme/theme-elements/CustomTextField';
import { useAuth } from '../../../store/contexts/AuthContext';
const validationSchema = yup.object({
  username: yup.string().required('User Name is Required'),
  password: yup.string().required('Please enter valid password'),
});

const AuthLogin = ({ title, subtitle, subtext }) => {
  const { handleLogin ,loading} = useAuth();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleLogin(values);
      //dispatch(login(values));
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <>
          {title ? (
            <Typography fontWeight="700" variant="h3" mb={1}>
              {title}
            </Typography>
          ) : null}

          {subtext}

          {/* <AuthSocialButtons title="Sign in with" /> */}
          <Box mt={3}>
            <Divider>
              {/* <Typography
                component="span"
                color="textSecondary"
                variant="h6"
                fontWeight="400"
                position="relative"
                px={2}
              >
                or sign in with
              </Typography> */}
            </Divider>
          </Box>

          <Stack>
            <Box>
              <CustomFormLabel htmlFor="username">Username</CustomFormLabel>
              <CustomTextField
                id="username"
                name="username"
                variant="outlined"
                fullWidth
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && Boolean(formik.errors.username)}
              />
              {formik.touched.username && formik.errors.username && (
                <Typography color="error">{formik.errors.username}</Typography>
              )}
            </Box>
            <Box>
              <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
              <CustomTextField
                id="password"
                name="password"
                type="password"
                variant="outlined"
                fullWidth
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
              />
              {formik.touched.password && formik.errors.password && (
                <Typography color="error">{formik.errors.password}</Typography>
              )}
            </Box>
            <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
              <FormGroup>
                <FormControlLabel
                  control={<CustomCheckbox defaultChecked />}
                  label="Remeber this Device"
                />
              </FormGroup>
              <Typography
                component={Link}
                to="/auth/forgot-password"
                fontWeight="500"
                sx={{
                  textDecoration: 'none',
                  color: 'primary.main',
                }}
              >
                Forgot Password ?
              </Typography>
            </Stack>
          </Stack>
          <Box>
            {/* <Button
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              //component={Link}
              type="submit"
            >
              Sign In
            </Button> */}

            <LoadingButton
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              loading={loading}
              //component={Link}
              type="submit"
            >
              Sign In
            </LoadingButton>
          </Box>
          {/* {subtitle} */}
        </>
      </form>
    </div>
  );
};

export default AuthLogin;

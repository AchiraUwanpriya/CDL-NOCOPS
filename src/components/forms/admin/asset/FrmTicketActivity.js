import ClearAllSharpIcon from '@mui/icons-material/ClearAllSharp';
import SaveAsIcon from '@mui/icons-material/SaveAs';
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
import { useAppContext } from '../../../../store/contexts/AppContext';
import {
  GetTicketsLogs,
  PostTicketLog,
} from '../../../../store/slices/common/helpDesk/HelpDeskActivityLogSlices';
import { GetHelpDeskActivities } from '../../../../store/slices/common/helpDesk/HelpDeskActivitySlices';
import AlertCart from '../../../app/AlertCart';
import CustomFormLabel from '../../../theme/theme-elements/CustomFormLabel';
import CustomSelect from '../../../theme/theme-elements/CustomSelect';
import CustomTextField from '../../../theme/theme-elements/CustomTextField';

const FrmTicketActivity = () => {
  const { selectedTicketId, selectedTab } = useAppContext();
  const dispatch = useDispatch();
  const [alertData, setAlertData] = useState({ isShow: false, text: '', alertType: '' });
  const { userData } = useSelector((state) => state.authSlices);
  const { data: activityList } = useSelector((state) => state.helpDeskActivitySlices);
  const { ticketsLogsData } = useSelector((state) => state.helpDeskActivityLogSlices);

  useEffect(() => {
    dispatch(GetTicketsLogs(selectedTicketId));
    if (!activityList.length > 0) {
      dispatch(GetHelpDeskActivities());
    }
  }, [dispatch]);

  const validationSchema = yup.object({
    activityId: yup.string().required('Activity selection is Required'),
  });

  const formik = useFormik({
    initialValues: {
      ticketId: selectedTicketId,
      activityId: '',
      dateTime: new Date().toLocaleString(),
      remarks: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(PostTicketLog(values));
      formik.resetForm();
      setAlertData((prevState) => ({
        ...prevState,
        isShow: true,
        alertType: 'success',
        text: 'Done.',
      }));
    },
  });
  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertData((prevState) => ({
      ...prevState,
      isShow: false,
    }));
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <AlertCart
          handleClose={handleClose}
          openCartAlert={alertData.isShow}
          alertType={alertData.alertType}
          text={alertData.text}
        />
        <Grid container>
          {/* 2 column */}

          {userData.Type === 'U' && selectedTab === 1 ? (
            <Grid container spacing={3}>
              <Grid item xs={12} lg={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={3} display="flex" alignItems="center">
                    <CustomFormLabel htmlFor="ip" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                      Activity
                    </CustomFormLabel>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <CustomSelect
                      id="activityId"
                      name="activityId"
                      placeholder="Company"
                      value={formik.values.activityId}
                      onChange={formik.handleChange}
                      // onChange={(e) =>{
                      //   formik.handleChange(e);

                      // }}
                      onBlur={formik.handleBlur}
                      error={formik.touched.activityId && Boolean(formik.errors.activityId)}
                      fullWidth
                      variant="outlined"
                    >
                      {activityList.map((option) => (
                        <MenuItem key={option.Id} value={option.Id}>
                          {option.Description}
                        </MenuItem>
                      ))}
                    </CustomSelect>
                    {formik.touched.activityId && formik.errors.activityId && (
                      <Typography color="error">{formik.errors.activityId}</Typography>
                    )}
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={3} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="bl-message" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                  Remark
                </CustomFormLabel>
              </Grid>
              <Grid item xs={12} sm={12}>
                <CustomTextField
                  placeholder="Little explanation"
                  multiline
                  fullWidth
                  id="remarks"
                  name="remarks"
                  value={formik.values.remarks}
                  onChange={formik.handleChange}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          ) : (
            <div></div>
          )}
          <Grid container sx={{ marginTop: 3 }}>
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
                          <Typography variant="h6">DateTime</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">Activity</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">Remark</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">Status</Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {ticketsLogsData.map((row) => (
                        <TableRow key={row.id} hover>
                          <TableCell>{row.dateTime}</TableCell>
                          <TableCell>
                            <Typography color="textSecondary" variant="h6" fontWeight="400">
                              {row.activity}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography color="textSecondary" variant="h6" fontWeight="400">
                              {row.remarks}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography color="textSecondary" variant="h6" fontWeight="400">
                              {row.status}
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

          {userData.Type === 'U' && selectedTab === 1 ? (
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
                    startIcon={<ClearAllSharpIcon />}
                    onClick={() => {
                      formik.resetForm();
                    }}
                  >
                    Clear
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    type="submit"
                    startIcon={<SaveAsIcon />}
                  >
                    Add New
                  </Button>
                </Stack>
              </Stack>
            </Grid>
          ) : (
            <div></div>
          )}
          <Grid item xs={12} lg={12}>
            <Paper variant="outlined">
              <TableContainer>
                <Table
                  aria-label="simple table"
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  <TableBody></TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default FrmTicketActivity;

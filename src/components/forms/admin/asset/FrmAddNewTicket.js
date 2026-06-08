import AddIcon from '@mui/icons-material/Add';
import ClearAllSharpIcon from '@mui/icons-material/ClearAllSharp';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import {
  Button,
  Grid,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useAppContext } from '../../../../store/contexts/AppContext';
import { GetCompany } from '../../../../store/slices/common/helpDesk/HelpDeskCompanySlices';
import { GetHelpDeskDepts } from '../../../../store/slices/common/helpDesk/HelpDeskDepartmentSlices';
import { GetEquipment } from '../../../../store/slices/common/helpDesk/HelpDeskEquipmentSlices';
import { GetHelpDeskIncidents } from '../../../../store/slices/common/helpDesk/HelpDeskIncidentSlices';
import { GetHelpDeskNewLocations } from '../../../../store/slices/common/helpDesk/HelpDeskLocationSlices';
import { GetHelpDeskSeverities } from '../../../../store/slices/common/helpDesk/HelpDeskSeveritySlices';
import { GetHelpDeskStatuses } from '../../../../store/slices/common/helpDesk/HelpDeskStatusSlices';
import {
  GetHelpDeskDetails,
  PostNewHelp,
  UpdateHelp,
} from '../../../../store/slices/common/helpDesk/HelpDeskTicketSlices';
import { GetUserByCompany } from '../../../../store/slices/common/helpDesk/HelpdeskUserSlices';
import { setMessage } from '../../../../store/slices/common/Message';
import EquipmentForm from '../../../../views/common/helpDesk/EquipmentForm';
import EquipmentFormModal from '../../../../views/common/helpDesk/EquipmentFormModal';
import CustomFormLabel from '../../../theme/theme-elements/CustomFormLabel';
import CustomSelect from '../../../theme/theme-elements/CustomSelect';
import CustomTextField from '../../../theme/theme-elements/CustomTextField';

const EntryForm1 = () => {
  const { selectedTicketId, setSelectedModel, selectedTab } = useAppContext();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.authSlices);
  const [isEquipmentFormOpen, setIsEquipmentFormOpen] = useState(false);
  const [selectedAssetSerialNumber, setSelectedAssetSerialNumber] = useState(null);
  const { data: asset_List } = useSelector((state) => state.helpDeskEquipmentSlices);
  const { data: status_List } = useSelector((state) => state.helpDeskStatusSlices);
  const { data: severity_List } = useSelector((state) => state.user_helpdeskseveritySlices);
  const { data: incident_List } = useSelector((state) => state.user_helpdeskincidentSlices);
  const { data: company_List } = useSelector((state) => state.helpDeskCompanySlices);
  const { getHelpDeskDetailsData } = useSelector((state) => state.helpDeskTicketSlices);
  const { companyUserList } = useSelector((state) => state.helpdeskUserSlices);
  const { data: LocationList } = useSelector((state) => state.helpDeskLocationSlices);
  const { data: DepartmentList } = useSelector((state) => state.helpDeskDepartmentSlices);
  // const nowdate = new Date().toLocaleString();

  useEffect(() => {
    // dispatch(GetEquipment(), GetHelpDeskStatuses(),GetSeverity(), GetHelpDeskIncidents(), GetCompany());
    if (!asset_List.length > 0) {
      dispatch(GetEquipment());
    }
    if (!DepartmentList.length > 0) {
      dispatch(GetHelpDeskDepts());
    }
    if (!LocationList.length > 0) {
      dispatch(GetHelpDeskNewLocations());
    }
    if (!status_List.length > 0) {
      dispatch(GetHelpDeskStatuses());
    }
    if (!severity_List.length > 0) {
      dispatch(GetHelpDeskSeverities());
    }
    if (!incident_List.length > 0) {
      dispatch(GetHelpDeskIncidents());
    }
    if (!company_List.length > 0) {
      dispatch(GetCompany());
    }
  }, [dispatch]);

  useEffect(() => {
    if (selectedTicketId) {
      dispatch(GetHelpDeskDetails(selectedTicketId));
    }
  }, [selectedTicketId]);

  useEffect(() => {
    if (getHelpDeskDetailsData.length > 0 && selectedTicketId) {
      dispatch(GetUserByCompany(getHelpDeskDetailsData[0].companyId));

      formik.setValues({
        ticketId: getHelpDeskDetailsData[0].ticketId,
        incidentId: getHelpDeskDetailsData[0].incidentId,
        assigneeId: getHelpDeskDetailsData[0].assigneeId,
        assignedBy: getHelpDeskDetailsData[0].assignedBy,
        severityId: getHelpDeskDetailsData[0].severityId,
        assetId: getHelpDeskDetailsData[0].assetId,
        companyId: getHelpDeskDetailsData[0].companyId,
        statusId: getHelpDeskDetailsData[0].statusId,
        description: getHelpDeskDetailsData[0].description,
        serialNo: getHelpDeskDetailsData[0].serialNo,
        createdDate: getHelpDeskDetailsData[0].createdDate,
        locationId: getHelpDeskDetailsData[0].locationId,
        deptId: getHelpDeskDetailsData[0].deptId,
      });
      setSelectedAssetSerialNumber(getHelpDeskDetailsData[0].serialNo);
    } else {
      setSelectedModel('U');
      formik.resetForm();
    }
  }, [getHelpDeskDetailsData]);

  const validationSchema = yup.object({
    statusId: yup.string().required('Status selection is Required'),
    // assetName: yup.string().required('Asset Name selection is Required'),
    incidentId: yup.string().required('Incident selection is Required'),
    // assigneeId: yup.string().required('Assignee ID selection is Required'),
    severityId: yup.string().required('Severity selection is Required'),
    assetId: yup.string().required('Please select asset'),
    // companyId: yup.string().required('Company selection is Required'),
    // date: yup.string().required('Date and Time selection is Required'),
  });

  const handleOpenEquipmentForm = () => {
    setIsEquipmentFormOpen(true);
  };

  const handleCloseEquipmentForm = () => {
    setIsEquipmentFormOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      ticketId: '',
      statusId: '7',
      assignedBy: '',
      incidentId: '',
      assigneeId: '',
      severityId: '',
      serialNo: '',
      companyId: '',
      createdDate: new Date().toLocaleString(),
      description: '',
      assetId: '',
      deptId: '',
      locationId: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (selectedTicketId) {
        dispatch(UpdateHelp(values));//request backend to update ticket
      } else {
        dispatch(PostNewHelp(values));//request backend for create ticket
      }
      formik.resetForm();
      setSelectedAssetSerialNumber('');
      dispatch(
        setMessage({ isShow: true, text: 'Ticket Added Successfully', alertType: 'success' }),
      );
    },
  });

  const currentStatus = status_List.find((status) => status.Id === formik.values.statusId);

  const currentOrderNo = currentStatus ? currentStatus.SortOrder : 0;

  const updatedItems =
    formik.values.statusId === '7'
      ? status_List.filter((item) => item.SortOrder !== '3')
      : status_List;
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="fs-country" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                  Status
                </CustomFormLabel>
              </Grid>
              <Grid item xs={12} sm={9}>
                <CustomSelect
                  id="statusId"
                  name="statusId"
                  placeholder="Status"
                  value={formik.values.statusId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.statusId && Boolean(formik.errors.statusId)}
                  fullWidth
                  variant="outlined"
                  disabled={!selectedTicketId || (selectedTicketId && selectedTab === 2)}
                >
                  {updatedItems.map((option) => (
                    <MenuItem
                      key={option.Id}
                      value={option.Id}
                      disabled={option.SortOrder < currentOrderNo}
                    >
                      {option.Description}
                    </MenuItem>
                  ))}
                </CustomSelect>
                {formik.touched.statusId && formik.errors.statusId && (
                  <Typography color="error">{formik.errors.statusId}</Typography>
                )}
              </Grid>

              <Grid item xs={12} sm={3} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="fs-country" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                  Assets Name
                </CustomFormLabel>
              </Grid>
              <Grid item xs={12} sm={9}>
                <CustomSelect
                  id="assetId"
                  name="assetId"
                  placeholder="Assets Name"
                  fullWidth
                  value={formik.values.assetId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.assetId && Boolean(formik.errors.assetId)}
                  variant="outlined"
                  disabled={
                    selectedTicketId &&
                    getHelpDeskDetailsData &&
                    getHelpDeskDetailsData.length > 0 &&
                    (getHelpDeskDetailsData[0].statusId !== '7' )
                  }
                >
                  {asset_List.map((option) => (
                    <MenuItem
                      key={option.asset_id}
                      value={option.asset_id}
                      onClick={() => {
                        setSelectedAssetSerialNumber(option.serial);
                        formik.values.serialNo = option.serial;
                      }}
                    >
                      {option.asset_name}
                    </MenuItem>
                  ))}
                </CustomSelect>
                {formik.touched.assetId && formik.errors.assetId && (
                  <Typography color="error">{formik.errors.assetId}</Typography>
                )}
              </Grid>

              <Grid item xs={12} sm={3} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="name" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                  Incident
                </CustomFormLabel>
              </Grid>
              <Grid item xs={12} sm={9}>
                <CustomSelect
                  id="incidentId"
                  name="incidentId"
                  placeholder="Incident"
                  fullWidth
                  value={formik.values.incidentId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.incidentId && Boolean(formik.errors.incidentId)}
                  variant="outlined"
                  disabled={
                    selectedTicketId &&
                    getHelpDeskDetailsData &&
                    getHelpDeskDetailsData.length > 0 &&
                    (getHelpDeskDetailsData[0].statusId !== '7' )
                  }
                >
                  {incident_List.map((option) => (
                    <MenuItem key={option.Id} value={option.Id}>
                      {option.Name}
                    </MenuItem>
                  ))}
                </CustomSelect>
                {formik.touched.incidentId && formik.errors.incidentId && (
                  <Typography color="error">{formik.errors.incidentId}</Typography>
                )}
              </Grid>

              <Grid item xs={12} sm={3} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="name" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                  Location
                </CustomFormLabel>
              </Grid>
              <Grid item xs={12} sm={9}>
                <CustomSelect
                  id="locationId"
                  name="locationId"
                  placeholder="Location"
                  fullWidth
                  value={formik.values.locationId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.locationId && Boolean(formik.errors.locationId)}
                  variant="outlined"
                  disabled={
                    selectedTicketId &&
                    getHelpDeskDetailsData &&
                    getHelpDeskDetailsData.length > 0 &&
                    (getHelpDeskDetailsData[0].statusId !== '7' )
                  }
                >
                  {LocationList.map((option) => (
                    <MenuItem key={option.Id} value={option.Id}>
                      {option.Name}
                    </MenuItem>
                  ))}
                </CustomSelect>
                {formik.touched.locationId && formik.errors.locationId && (
                  <Typography color="error">{formik.errors.locationId}</Typography>
                )}
              </Grid>
              {userData.Type === 'M' && (
                <>
                  <Grid item xs={12} sm={3} display="flex" alignItems="center">
                    <CustomFormLabel htmlFor="name" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                      Assignee ID
                    </CustomFormLabel>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <CustomSelect
                      id="assigneeId"
                      name="assigneeId"
                      placeholder="Assignee ID"
                      fullWidth
                      value={formik.values.assigneeId}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.assigneeId && Boolean(formik.errors.assigneeId)}
                      variant="outlined"
                      disabled={
                        selectedTicketId &&
                        getHelpDeskDetailsData &&
                        getHelpDeskDetailsData.length > 0 &&
                        (getHelpDeskDetailsData[0].statusId !== '7' )
                      }
                    >
                      {companyUserList.map((option) => (
                        <MenuItem key={option.Id} value={option.Id}>
                          {option.user_name}
                        </MenuItem>
                      ))}
                    </CustomSelect>
                    {formik.touched.assigneeId && formik.errors.assigneeId && (
                      <Typography color="error">{formik.errors.assigneeId}</Typography>
                    )}
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
          {/* 2 column */}
          <Grid item xs={12} lg={6}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="fs-country" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                  Severity
                </CustomFormLabel>
              </Grid>
              <Grid item xs={12} sm={9}>
                <CustomSelect
                  id="severityId"
                  name="severityId"
                  placeholder="Severity"
                  value={formik.values.severityId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.severityId && Boolean(formik.errors.severityId)}
                  fullWidth
                  variant="outlined"
                  disabled={
                    selectedTicketId &&
                    getHelpDeskDetailsData &&
                    getHelpDeskDetailsData.length > 0 &&
                    (getHelpDeskDetailsData[0].statusId !== '7' )
                  }
                >
                  {severity_List.map((option) => (
                    <MenuItem key={option.id} value={option.Id}>
                      {option.Name}
                    </MenuItem>
                  ))}
                </CustomSelect>
                {formik.touched.severityId && formik.errors.severityId && (
                  <Typography color="error">{formik.errors.severityId}</Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={3} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="ip" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                  Serial No
                </CustomFormLabel>
              </Grid>
              <Grid item xs={12} sm={9}>
                <CustomTextField
                  id="serialNo"
                  name="serialNo"
                  // placeholder="Serial No"
                  fullWidth
                  value={selectedAssetSerialNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  // error={formik.touched.serialNo && Boolean(formik.errors.serialNo)}
                  disabled={
                    selectedTicketId &&
                    getHelpDeskDetailsData &&
                    getHelpDeskDetailsData.length > 0 &&
                    (getHelpDeskDetailsData[0].statusId !== '7' )
                  }
                ></CustomTextField>
                {/* {formik.touched.serialNo && formik.errors.serialNo && (
                  <Typography color="error">{formik.errors.serialNo}</Typography>
                )} */}
              </Grid>

              <Grid item xs={12} sm={3} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="ip" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                  Company
                </CustomFormLabel>
              </Grid>
              <Grid item xs={12} sm={9}>
                <CustomSelect
                  id="companyId"
                  name="companyId"
                  placeholder="Company"
                  value={formik.values.companyId}
                  onChange={formik.handleChange}
                  // onChange={(e) =>{
                  //   formik.handleChange(e);

                  // }}
                  onBlur={formik.handleBlur}
                  error={formik.touched.companyId && Boolean(formik.errors.companyId)}
                  fullWidth
                  variant="outlined"
                  disabled={
                    selectedTicketId &&
                    getHelpDeskDetailsData &&
                    getHelpDeskDetailsData.length > 0 &&
                    (getHelpDeskDetailsData[0].statusId !== '7' )
                  }
                >
                  {company_List.map((option) => (
                    <MenuItem
                      key={option.Id}
                      value={option.Id}
                      onClick={() => {
                        dispatch(GetUserByCompany(option.Id));
                      }}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </CustomSelect>
                {formik.touched.companyId && formik.errors.companyId && (
                  <Typography color="error">{formik.errors.companyId}</Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={3} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="ip" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                  Department
                </CustomFormLabel>
              </Grid>
              <Grid item xs={12} sm={9}>
                <CustomSelect
                  id="deptId"
                  name="deptId"
                  placeholder="Company"
                  value={formik.values.deptId}
                  onChange={formik.handleChange}
                  // onChange={(e) =>{
                  //   formik.handleChange(e);

                  // }}
                  onBlur={formik.handleBlur}
                  error={formik.touched.deptId && Boolean(formik.errors.deptId)}
                  fullWidth
                  variant="outlined"
                  disabled={
                    selectedTicketId &&
                    getHelpDeskDetailsData &&
                    getHelpDeskDetailsData.length > 0 &&
                    (getHelpDeskDetailsData[0].statusId !== '7' )
                  }
                >
                  {DepartmentList.map((option) => (
                    <MenuItem key={option.Id} value={option.Id}>
                      {option.Name}
                    </MenuItem>
                  ))}
                </CustomSelect>
                {formik.touched.deptId && formik.errors.deptId && (
                  <Typography color="error">{formik.errors.deptId}</Typography>
                )}
              </Grid>

              <Grid item xs={12} sm={3} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="ip" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                  Date and Time
                </CustomFormLabel>
              </Grid>
              <Grid item xs={12} sm={9}>
                <CustomTextField
                  id="createdDate"
                  name="createdDate"
                  // placeholder="Date and Time"
                  fullWidth
                  value={formik.values.createdDate}
                  disabled={
                    selectedTicketId &&
                    getHelpDeskDetailsData &&
                    getHelpDeskDetailsData.length > 0 &&
                    (getHelpDeskDetailsData[0].statusId !== '7' )
                  }
                  // onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  // error={formik.touched.date && Boolean(formik.errors.date)}
                />
                {/* {formik.touched.date && formik.errors.date && (
                  <Typography color="error">{formik.errors.date}</Typography>
                )} */}
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
              placeholder="Little explanation"
              multiline
              fullWidth
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              disabled={
                selectedTicketId &&
                getHelpDeskDetailsData &&
                getHelpDeskDetailsData.length > 0 &&
                (getHelpDeskDetailsData[0].statusId !== '7' )
              }
              // onChange={(e) =>{
              //   formik.handleChange(e);

              // }}
              variant="outlined"
            />
          </Grid>
          {userData.Type === 'U' || userData.Type === 'M' ? (
            <Grid item xs={12} sm={12}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="space-between"
                mt={2}
              >
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<AddIcon />}
                    onClick={handleOpenEquipmentForm}
                    style={{
                      display:
                        selectedTicketId &&
                        getHelpDeskDetailsData &&
                        getHelpDeskDetailsData.length > 0 &&
                        (getHelpDeskDetailsData[0].statusId !== '7' )
                          ? 'none'
                          : 'inline-flex',
                    }}
                  >
                    Add Device
                  </Button>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<ClearAllSharpIcon />}
                    onClick={() => {
                      formik.resetForm();
                      setSelectedAssetSerialNumber('');
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
                    {selectedTicketId ? 'Update' : 'Save'}
                  </Button>
                  <EquipmentFormModal open={isEquipmentFormOpen} onClose={handleCloseEquipmentForm}>
                    <EquipmentForm onClose={handleCloseEquipmentForm} />
                  </EquipmentFormModal>
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

export default EntryForm1;

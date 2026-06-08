import {
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material';
// import { Chart } from 'react-google-charts';
import DoughnutChart from '../../../views/charts/DoughnutChart';
// import {
//   GetDetailedHelpDeskDetails,
//   } from 'src/store/apps/helpDesk/helpDeskTicketSlices';
import { IconTrash } from '@tabler/icons';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllTickets } from '../../../store/apps/admin/ticketSlices';
import { GetHelpDeskChartCounts } from '../../../store/apps/helpDesk/helpDeskTicketSlices';
import { useAppContext } from '../../../store/apps/AppContext';
import { IconHistory, IconTicket } from '@tabler/icons';

const FrmTickets = ({onModelOpen}) => {
  const dispatch = useDispatch();
  const { allTicketData } = useSelector((state) => state.ticketSlices);
  const { HDChartCounts } = useSelector((state) => state.helpDeskTicketSlices);
  const { userData } = useSelector((state) => state.authSlices);
  const { setSelectedTicketId,setSelectedModel } = useAppContext();
  useEffect(() => {
    dispatch(GetAllTickets());
    dispatch(GetHelpDeskChartCounts());
  }, [dispatch]);

  return (
    <div>
      {/* <Paper variant="outlined"> */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} lg={4}>
              {HDChartCounts.length > 0 ? (
                <DoughnutChart title={'Incident'} data={HDChartCounts[0].Sectors} />
              ) : (
                <></>
              )}
            </Grid>
            <Grid item xs={12} sm={12} lg={4}>
              {HDChartCounts.length > 0 ? (
                <DoughnutChart title={'Status'} data={HDChartCounts[2].Sectors} />
              ) : (
                <></>
              )}
            </Grid>
            <Grid item xs={12} sm={12} lg={4}>
              {HDChartCounts.length > 0 ? (
                <DoughnutChart title={'Severity'} data={HDChartCounts[1].Sectors} />
              ) : (
                <></>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={12}>
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
                    <Typography variant="h6">Ticket No</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Status</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Severity</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Incident</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Assigned To</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Assigned By</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Description</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Created Date</Typography>
                  </TableCell>
                  {userData.Type !== 'V' ? (
                    <TableCell>
                      <Typography variant="h6">Action</Typography>
                    </TableCell>
                  ) : (
                    <div></div>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {allTicketData.map((row) => (
                  <TableRow key={row.ticketId} hover>
                    <TableCell>{row.ticketId}</TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6" fontWeight="400">
                        {row.status}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6" fontWeight="400">
                        {row.severity}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6" fontWeight="400">
                        {row.incident}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6" fontWeight="400">
                        {row.assignee}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6" fontWeight="400">
                        {row.assignedBy}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6" fontWeight="400">
                        {row.description}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6" fontWeight="400">
                        {row.createdDate}
                      </Typography>
                    </TableCell>
                    {userData.Type !== 'V' ? (
                      <TableCell>
                        <Tooltip title="Delete Ticket">
                          <IconButton
                            onClick={() => {
                              // setSelectedModel("U");
                              // setSelectedTicketId(ticket.ticketId);
                              // onModelOpen();
                            }}
                          >
                            <IconTrash size="20" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    ) : (
                      <div></div>
                    )}
                    <TableCell>
                    <Tooltip title="Ticket Info">
                    <IconButton
                      onClick={() => {
                        setSelectedModel("U");
                        setSelectedTicketId(row.ticketId);
                        onModelOpen();
                      }}
                    >
                      <IconTicket size="20" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Ticket History">
                    <IconButton
                      onClick={() => {
                        setSelectedModel("A");
                        setSelectedTicketId(row.ticketId);
                        onModelOpen();
                      }}
                    >
                      <IconHistory size="20" />
                    </IconButton>
                  </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      {/* </Paper> */}
    </div>
  );
};

export default FrmTickets;

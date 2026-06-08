import {
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { useAppContext } from '../../../store/contexts/AppContext';
import DashboardCard from '../../theme/shared/DashboardCard';
import { IconHistory, IconTicket } from '@tabler/icons';

const Tickets = ({ title, data, onModelOpen }) => {
  const { setSelectedTicketId, setSelectedModel } = useAppContext();

  return (
    <DashboardCard
      title={title}
      // subtitle="Best Products"
      // action={
      //   <CustomSelect
      //     labelId="month-dd"
      //     id="month-dd"
      //     size="small"
      //     value={month}
      //     onChange={handleChange}
      //   >
      //     <MenuItem value={1}>March 2022</MenuItem>
      //     <MenuItem value={2}>April 2022</MenuItem>
      //     <MenuItem value={3}>May 2022</MenuItem>
      //   </CustomSelect>
      // }
    >
      <TableContainer>
        <Table 
          stickyHeader
          aria-label="simple table"
          sx={{
            whiteSpace: 'nowrap',
            maxHeight: 440
          }}
          
        >
          <TableHead>
            <TableRow>
              <TableCell align='center'>
                <Typography variant="subtitle2" fontWeight={600}>
                  Ticket No
                </Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant="subtitle2" fontWeight={600}>
                  Status
                </Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant="subtitle2" fontWeight={600}>
                  Created Date
                </Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant="subtitle2" fontWeight={600}>
                  Severity
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Incident
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Asset Name
                </Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant="subtitle2" fontWeight={600}>
                  Action
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((ticket) => (
              <TableRow hover
                key={ticket.ticketId}
                // onClick={() => {
                //   setSelectedTicketId(ticket.ticketId);
                //   onModelOpen();
                // }}
              >
                <TableCell align='center'>
                  <Typography variant="subtitle2">{ticket.ticketId}</Typography>
                </TableCell>

                <TableCell align='center'>
                <Chip
                    sx={{
                      bgcolor:
                        ticket.status === 'Open'
                          ? (theme) => theme.palette.warning.light
                          : ticket.status === 'New'
                          ? (theme) => theme.palette.secondary.light
                          : ticket.status === 'Pending'
                          ? (theme) => theme.palette.error.light
                          : ticket.status === 'On Hold'
                          ? (theme) => theme.palette.grey.main
                          : (theme) => theme.palette.success.light,
                      color:
                        ticket.status === 'Open'
                          ? (theme) => theme.palette.warning.main
                          : ticket.status === 'New'
                          ? (theme) => theme.palette.secondary.main
                          : ticket.status === 'Pending'
                          ? (theme) => theme.palette.error.main
                          : ticket.status === 'On Hold'
                          ? (theme) => theme.palette.grey.main
                          : (theme) => theme.palette.success.main,
                      borderRadius: '8px',
                    }}
                    size="medium"
                    label={ticket.status}
                  />
                </TableCell>
                <TableCell align='center'>
                  <Typography variant="subtitle2">{ticket.createdDate}</Typography>
                </TableCell>

                <TableCell align='center'>
                  <Chip
                    sx={{
                      bgcolor:
                        ticket.severity === 'High'
                          ?'orangered'
                          : ticket.severity === 'Average'
                          ? 'orange'
                          : ticket.severity === 'Disaster'
                          ? 'red'
                          : 'yellow',
                      color:
                        ticket.severity === 'High'
                          ? 'white'
                          : ticket.severity === 'Average'
                          ? 'black'
                          : ticket.severity === 'Disaster'
                          ? 'white'
                          : 'black',
                      borderRadius: '8px',
                    }}
                    size="medium"
                    label={ticket.severity}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">{ticket.incident}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">{ticket.assetId}</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Tooltip title="Ticket Info">
                    <IconButton
                      onClick={() => {
                        setSelectedModel('U');
                        setSelectedTicketId(ticket.ticketId);
                        onModelOpen();
                      }}
                    >
                      <IconTicket size="20" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Ticket History">
                    <IconButton
                      onClick={() => {
                        setSelectedModel('A');
                        setSelectedTicketId(ticket.ticketId);
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
    </DashboardCard>
  );
};

export default Tickets;

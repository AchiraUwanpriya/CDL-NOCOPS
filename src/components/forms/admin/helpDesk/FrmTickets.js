
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Box, Button, Grid, IconButton, TableContainer, Tooltip } from '@mui/material';
import { IconHistory, IconTicket, IconTrash } from '@tabler/icons';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  MaterialReactTable,
  createMRTColumnHelper,
  useMaterialReactTable,
} from 'material-react-table';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as XLSX from 'xlsx';
import { useAppContext } from '../../../../store/contexts/AppContext';
import { DeleteTicket, GetAllTickets } from '../../../../store/slices/admin/helpDesk/TicketSlices';
import { GetHelpDeskChartCounts } from '../../../../store/slices/common/helpDesk/HelpDeskTicketSlices';
import DoughnutChart from '../../../app/charts/DoughnutChart';

const FrmTickets = ({ onModelOpen }) => {
  const dispatch = useDispatch();
  const { allTicketData } = useSelector((state) => state.ticketSlices);
  const { HDChartCounts } = useSelector((state) => state.helpDeskTicketSlices);
  const { userData } = useSelector((state) => state.authSlices);
  const { setSelectedTicketId, setSelectedModel } = useAppContext();

  useEffect(() => {
    dispatch(GetAllTickets());
    dispatch(GetHelpDeskChartCounts());
  }, [dispatch]);

  const handleExportRows = (rows, columns) => {
    const doc = new jsPDF();
    const visibleColumns = columns.filter(
      (column) => column.getIsVisible() && column.columnDef.header !== 'Actions',
    );
    const tableHeaders = visibleColumns.map((column) => column.columnDef.header);
    const tableData = rows.map((row) => visibleColumns.map((column) => row.original[column.id]));

    autoTable(doc, {
      styles: { fontSize: 8 },
      head: [tableHeaders],
      body: tableData,
    });

    doc.save('All_Tickets.pdf');
  };

  const handleExportToExcel = (rows, columns) => {
    const visibleColumns = columns.filter(
      (column) => column.getIsVisible() && column.columnDef.header !== 'Actions',
    );
    const tableHeaders = visibleColumns.map((column) => column.columnDef.header);
    const tableData = rows.map((row) => visibleColumns.map((column) => row.original[column.id]));

    const worksheet = XLSX.utils.aoa_to_sheet([tableHeaders, ...tableData]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'All Tickets');
    XLSX.writeFile(workbook, 'All_Tickets.xlsx');
  };

  const columnHelper = createMRTColumnHelper();

  const columns = [
    columnHelper.accessor('ticketId', {
      header: 'Ticket No',
      size: 40,
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      size: 40,
    }),
    columnHelper.accessor('severity', {
      header: 'Severity',
      size: 40,
    }),
    columnHelper.accessor('assetName', {
      header: 'Asset Name',
      size: 40,
    }),
    columnHelper.accessor('incident', {
      header: 'Incident',
      size: 40,
    }),
    columnHelper.accessor('location', {
      header: 'Location',
      size: 40,
    }),
    columnHelper.accessor('dept', {
      header: 'Department',
      size: 40,
    }),
    columnHelper.accessor('assignee', {
      header: 'Assigned To',
      size: 40,
    }),
    columnHelper.accessor('assignedBy', {
      header: 'Assigned By',
      size: 40,
    }),
    columnHelper.accessor('createdDate', {
      header: 'Created Date',
      size: 40,
    }),
    columnHelper.accessor('description', {
      header: 'Description',
      size: 220,
    }),
  ];
  const handleRowDelete = (id) => {
    dispatch(DeleteTicket({ id: id }));
  };
  const table = useMaterialReactTable({
    columns,
    data: allTicketData,
    columnFilterDisplayMode: 'popover',
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    enableRowActions: true,
    positionActionsColumn: 'last',
    renderCaption: 'Get All Tickets Details',
    renderRowActions: ({ row }) => (
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem', }}>
        {(userData.Type !== 'V' && userData.Type !== 'M') ? (
          <Tooltip title="Delete Ticket">
            <IconButton
              onClick={() => {
                handleRowDelete(row.original.ticketId);
              }}
            >
              <IconTrash size="20" />
            </IconButton>
          </Tooltip>
        ) : (
          <div></div>
        )}
        <Tooltip title="Ticket Info">
          <IconButton
            onClick={() => {
              setSelectedModel('U');
              setSelectedTicketId(row.original.ticketId);
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
              setSelectedTicketId(row.original.ticketId);
              onModelOpen();
            }}
          >
            <IconHistory size="20" />
          </IconButton>
        </Tooltip>
      </div>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: 'flex',
          gap: '16px',
          padding: '8px',
          flexWrap: 'wrap',
        }}
      >
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows, table.getAllColumns())
          }
          startIcon={<FileDownloadIcon />}
        >
          Export PDF
        </Button>
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          onClick={() =>
            handleExportToExcel(table.getPrePaginationRowModel().rows, table.getAllColumns())
          }
          startIcon={<FileDownloadIcon />}
        >
          Export Excel
        </Button>
      </Box>
    ),
  });
  return (
    <div >
      <Grid container spacing={2} >
        <Grid item xs={12} lg={12} >
          <Grid container spacing={3} >
            <Grid item xs={12} sm={12} lg={4} >
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
            <MaterialReactTable table={table} />
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default FrmTickets;



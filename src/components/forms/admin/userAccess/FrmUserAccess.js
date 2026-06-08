import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Box,
  Checkbox,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  GetAllHeaderComponents,
  UpdateComponentAccess,
} from '../../../../store/slices/admin/userAccess/UserAccessSlices';
const FrmUserAccess = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.userAccessSlices);
  const [expanded, setExpanded] = useState([]);
  const [checkboxes, setCheckboxes] = useState([]);
  const theme = useTheme();
  const primaryLight = theme.palette.primary.light;
  useEffect(() => {
    dispatch(GetAllHeaderComponents());
  }, [dispatch]);
  useEffect(() => {
    if (data && data.length > 0) {
      setExpanded(
        data.map((page) => (page.SubComponents && page.SubComponents.length > 0 ? true : false)),
      );
      const initialCheckboxes = data.map((page) => {
        const isHasRol_Head = (role) => page.userList.includes(role);
        return {
          A: isHasRol_Head('A'),
          U: isHasRol_Head('U'),
          M: isHasRol_Head('M'),
          V: isHasRol_Head('V'),
          subComponents: page.SubComponents
            ? page.SubComponents.map((item, index) => ({
                A: (page.SubComponents.length > 0
                  ? page.SubComponents[index].userList
                  : []
                ).includes('A'),
                U: (page.SubComponents.length > 0
                  ? page.SubComponents[index].userList
                  : []
                ).includes('U'),
                M: (page.SubComponents.length > 0
                  ? page.SubComponents[index].userList
                  : []
                ).includes('M'),
                V: (page.SubComponents.length > 0
                  ? page.SubComponents[index].userList
                  : []
                ).includes('V'),
              }))
            : [],
        };
      });
      setCheckboxes(initialCheckboxes);
    }
  }, [data]);

  const handleExpandClick = (index) => {
    setExpanded((prev) => {
      const newExpanded = [...prev];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };
  const handleCheckboxChange = (pageIndex, userType, subComponentIndex = null, componentId) => {
    const newCheckboxes = [...checkboxes];
    var updateModel = {
      userType: userType,
      componentId: componentId,
      accessMode: '',
    };
    if (subComponentIndex === null) {
      updateModel = {
        userType: userType,
        componentId: componentId,
        accessMode: !newCheckboxes[pageIndex][userType],
      };
      newCheckboxes[pageIndex][userType] = !newCheckboxes[pageIndex][userType];
    } else {
      if (
        newCheckboxes[pageIndex].subComponents &&
        newCheckboxes[pageIndex].subComponents[subComponentIndex]
      ) {
        updateModel = {
          userType: userType,
          componentId: componentId,
          accessMode: !newCheckboxes[pageIndex].subComponents[subComponentIndex][userType],
        };
        newCheckboxes[pageIndex].subComponents[subComponentIndex][userType] =
          !newCheckboxes[pageIndex].subComponents[subComponentIndex][userType];
      }
    }
    // console.log(newCheckboxes);
    dispatch(UpdateComponentAccess(updateModel));
    setCheckboxes(newCheckboxes);
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!data || data.length === 0) {
    return <div>No data available.</div>;
  }
  return (
    <div style={{ position: 'relative' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '25%' }}>Page</TableCell>
              <TableCell style={{ width: '18.75%', textAlign: 'center' }}>Admin</TableCell>
              <TableCell style={{ width: '18.75%', textAlign: 'center' }}>User</TableCell>
              <TableCell style={{ width: '18.75%', textAlign: 'center' }}>Manager</TableCell>
              <TableCell style={{ width: '18.75%', textAlign: 'center' }}>Viewer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((page, pageIndex) => (
              <React.Fragment key={page.ComponentId}>
                <TableRow style={{ backgroundColor: primaryLight }}>
                  <TableCell>
                    {page.SubComponents?.length > 0 && (
                      <IconButton
                        onClick={() => handleExpandClick(pageIndex)}
                        aria-label="expand row"
                        size="small"
                        style={{ padding: '0 5px', marginRight: '5px' }}
                      >
                        {expanded[pageIndex] ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    )}
                    <strong>{page.Description}</strong>
                  </TableCell>
                  <TableCell style={{ textAlign: 'center', padding: '8px 16px' }}>

                      <Checkbox
                        checked={checkboxes[pageIndex]?.A || false}
                        onChange={() =>
                          handleCheckboxChange(pageIndex, 'A', null, page.ComponentId)
                        }
                      />

                  </TableCell>
                  <TableCell style={{ textAlign: 'center', padding: '8px 16px' }}>

                      <Checkbox
                        checked={checkboxes[pageIndex]?.U || false}
                        onChange={() =>
                          handleCheckboxChange(pageIndex, 'U', null, page.ComponentId)
                        }
                      />

                  </TableCell>
                  <TableCell style={{ textAlign: 'center', padding: '8px 16px' }}>

                      <Checkbox
                        checked={checkboxes[pageIndex]?.M || false}
                        onChange={() =>
                          handleCheckboxChange(pageIndex, 'M', null, page.ComponentId)
                        }
                      />

                  </TableCell>
                  <TableCell style={{ textAlign: 'center', padding: '8px 16px' }}>

                      <Checkbox
                        checked={checkboxes[pageIndex]?.V || false}
                        onChange={() =>
                          handleCheckboxChange(pageIndex, 'V', null, page.ComponentId)
                        }
                      />

                  </TableCell>
                </TableRow>
                {page.SubComponents?.length > 0 && (
                  <TableRow>
                    <TableCell colSpan={5} style={{ paddingBottom: 0, paddingTop: 0 }}>
                      <Collapse in={expanded[pageIndex]} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                          <Table size="small" aria-label="purchases">
                            <colgroup>
                              <col style={{ width: '20%' }} />
                              <col style={{ width: '20%' }} />
                              <col style={{ width: '20%' }} />
                              <col style={{ width: '20%' }} />
                              <col style={{ width: '20%' }} />
                            </colgroup>
                            <TableHead>
                              <TableRow>
                                <TableCell style={{ textAlign: 'center' }}></TableCell>
                                <TableCell style={{ textAlign: 'center' }}></TableCell>
                                <TableCell style={{ textAlign: 'center' }}></TableCell>
                                <TableCell style={{ textAlign: 'center' }}></TableCell>
                                <TableCell style={{ textAlign: 'center' }}></TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {page.SubComponents.map((subComponent, subComponentIndex) => (
                                <TableRow key={subComponent.ComponentId}>
                                  <TableCell style={{ paddingLeft: '40px', padding: '8px 16px' }}>
                                    {subComponent.Description}
                                  </TableCell>
                                  <TableCell style={{ textAlign: 'center', padding: '8px 16px' }}>
                                    <Checkbox
                                      checked={
                                        checkboxes[pageIndex]?.subComponents?.[subComponentIndex]
                                          ?.A || false
                                      }
                                      onChange={() =>
                                        handleCheckboxChange(
                                          pageIndex,
                                          'A',
                                          subComponentIndex,
                                          page.SubComponents[subComponentIndex].ComponentId,
                                        )
                                      }
                                    />
                                  </TableCell>
                                  <TableCell style={{ textAlign: 'center', padding: '8px 16px' }}>
                                    <Checkbox
                                      checked={
                                        checkboxes[pageIndex]?.subComponents?.[subComponentIndex]
                                          ?.U || false
                                      }
                                      onChange={() =>
                                        handleCheckboxChange(
                                          pageIndex,
                                          'U',
                                          subComponentIndex,
                                          page.SubComponents[subComponentIndex].ComponentId,
                                        )
                                      }
                                    />
                                  </TableCell>
                                  <TableCell style={{ textAlign: 'center', padding: '8px 16px' }}>
                                    <Checkbox
                                      checked={
                                        checkboxes[pageIndex]?.subComponents?.[subComponentIndex]
                                          ?.M || false
                                      }
                                      onChange={() =>
                                        handleCheckboxChange(
                                          pageIndex,
                                          'M',
                                          subComponentIndex,
                                          page.SubComponents[subComponentIndex].ComponentId,
                                        )
                                      }
                                    />
                                  </TableCell>
                                  <TableCell style={{ textAlign: 'center', padding: '8px 16px' }}>
                                    <Checkbox
                                      checked={
                                        checkboxes[pageIndex]?.subComponents?.[subComponentIndex]
                                          ?.V || false
                                      }
                                      onChange={() =>
                                        handleCheckboxChange(
                                          pageIndex,
                                          'V',
                                          subComponentIndex,
                                          page.SubComponents[subComponentIndex].ComponentId,
                                        )
                                      }
                                    />
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default FrmUserAccess;

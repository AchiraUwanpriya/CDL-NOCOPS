import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../../../slices/common/Message';
import TicketService from '../../../services/common/helpDesk/TicketService';

export const PostNewHelp = createAsyncThunk('HelpDesk/PostNewHelp', async (data, thunkAPI) => {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    const response = await TicketService.PostNewHelp(formData);
    if (response.StatusCode !== 200) {
      return thunkAPI.rejectWithValue();
    }
    // await thunkAPI.dispatch(fetchAllData());
    thunkAPI.dispatch(GetAssignedTickets());
    thunkAPI.dispatch(GetHelpDeskChartCounts());
    thunkAPI.dispatch(GetAssigneeTickets());
    return response;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
    thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
    return thunkAPI.rejectWithValue();
  }
});

export const fetchAllData = createAsyncThunk('api/fetchAllData', async (_, thunkAPI) => {
  try {
    // Dispatch the individual API calls
    const data1 = await thunkAPI.dispatch(GetAssignedTickets()).unwrap();
    if (data1) {
      const data2 = await thunkAPI.dispatch(GetHelpDeskChartCounts()).unwrap();
      if (data2) {
        await thunkAPI.dispatch(GetAssigneeTickets()).unwrap();
      }
    }
    // return { data1, data2, data3 };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const UpdateHelp = createAsyncThunk('HelpDesk/UpdateHelp', async (data, thunkAPI) => {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    const response = await TicketService.UpdateHelp(formData);
    if (response.StatusCode !== 200) {
      return thunkAPI.rejectWithValue();
    }
    thunkAPI.dispatch(GetAssigneeTickets());
    thunkAPI.dispatch(GetAssignedTickets());
    return response;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    
    thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
    return thunkAPI.rejectWithValue();
  }
});

export const GetHelpDeskDetails = createAsyncThunk(
  'HelpDesk/GetHelpDeskDetails',
  async (id, thunkAPI) => {
    try {
      const response = await TicketService.GetHelpDeskDetails(id);
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
        return thunkAPI.rejectWithValue();
      }
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      
      thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
      return thunkAPI.rejectWithValue();
    }
  },
);

export const GetDetailedHelpDeskDetails = createAsyncThunk(
  'HelpDesk/GetDetailedHelpDeskDetails',
  async (id, thunkAPI) => {
    try {
      const response = await TicketService.GetDetailedHelpDeskDetails(id);
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
        return thunkAPI.rejectWithValue();
      }
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      
      thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
      return thunkAPI.rejectWithValue();
    }
  },
);

export const GetAssigneeTickets = createAsyncThunk(
  'HelpDesk/GetAssigneeTickets',
  async (thunkAPI) => {
    try {
      const response = await TicketService.GetAssigneeTickets();
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
        return thunkAPI.rejectWithValue();
      }
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      
      thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
      return thunkAPI.rejectWithValue();
    }
  },
);

export const GetAssignedTickets = createAsyncThunk(
  'HelpDesk/GetAssignedTickets',
  async (thunkAPI) => {
    try {
      const response = await TicketService.GetAssignedTickets();
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
        return thunkAPI.rejectWithValue();
      }
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      
      thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
      return thunkAPI.rejectWithValue();
    }
  },
);

export const GetHelpDeskStatuses = createAsyncThunk(
  'HelpDesk/GetHelpDeskStatuses',
  async (thunkAPI) => {
    try {
      const response = await TicketService.GetHelpDeskStatuses();
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
        return thunkAPI.rejectWithValue();
      }
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      
      thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
      return thunkAPI.rejectWithValue();
    }
  },
);

export const GetHelpDeskSeverities = createAsyncThunk(
  'HelpDesk/GetHelpDeskSeverities',
  async (thunkAPI) => {
    try {
      const response = await TicketService.GetHelpDeskSeverities();
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
        return thunkAPI.rejectWithValue();
      }
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      
      thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
      return thunkAPI.rejectWithValue();
    }
  },
);

export const GetHelpDeskIncidents = createAsyncThunk(
  'HelpDesk/GetHelpDeskIncidents',
  async (thunkAPI) => {
    try {
      const response = await TicketService.GetHelpDeskIncidents();
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
        return thunkAPI.rejectWithValue();
      }
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      
      thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
      return thunkAPI.rejectWithValue();
    }
  },
);
export const GetHelpDeskUsers = createAsyncThunk('HelpDesk/GetHelpDeskUsers', async (thunkAPI) => {
  try {
    const response = await TicketService.GetHelpDeskUsers();
    if (response.StatusCode !== 200) {
      return thunkAPI.rejectWithValue();
    }
    return response;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    
    thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
    return thunkAPI.rejectWithValue();
  }
});
export const GetHelpDeskAssets = createAsyncThunk(
  'HelpDesk/GetHelpDeskAssets',
  async (thunkAPI) => {
    try {
      const response = await TicketService.GetCompany();
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
        return thunkAPI.rejectWithValue();
      }
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      
      thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
      return thunkAPI.rejectWithValue();
    }
  },
);
export const GetHelpDeskActivities = createAsyncThunk(
  'HelpDesk/GetHelpDeskActivities',
  async (thunkAPI) => {
    try {
      const response = await TicketService.GetHelpDeskActivities();
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
        return thunkAPI.rejectWithValue();
      }
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      
      thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
      return thunkAPI.rejectWithValue();
    }
  },
);
export const GetCompany = createAsyncThunk('HelpDesk/GetCompany', async (thunkAPI) => {
  try {
    const response = await TicketService.GetCompany();
    if (response.StatusCode !== 200) {
      return thunkAPI.rejectWithValue();
    }
    return response;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    
    thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
    return thunkAPI.rejectWithValue();
  }
});

export const GetHelpDeskChartCounts = createAsyncThunk(
  'HelpDesk/GetHelpDeskChartCounts',
  async (thunkAPI) => {
    try {
      const response = await TicketService.GetHelpDeskChartCounts();
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
        return thunkAPI.rejectWithValue();
      }
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      
      thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
      return thunkAPI.rejectWithValue();
    }
  },
);

// export const UpdateBrand = createAsyncThunk(
//   'admin/asset/UpdateBrand',
//   async ({ id, name, description }, thunkAPI) => {
//     try {
//       const formData = new FormData();
//       formData.append('Id', id);
//       formData.append('Name', name);
//       formData.append('Description', description);
//       const response = await TicketService.UpdateBrand(formData);
//       if (response.StatusCode !== 200) {
//         return thunkAPI.rejectWithValue();
//       }
//       thunkAPI.dispatch(GetDetailedHelpDeskDetails());
//       return response;
//     } catch (error) {
//       const message =
//         (error.response && error.response.data && error.response.data.message) ||
//         error.message ||
//         error.toString();
//       
//       thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
//       return thunkAPI.rejectWithValue();
//     }
//   },
// );

// export const DeleteCompany = createAsyncThunk(
//   'admin/asset/DeleteCompany',
//   async ({ id }, thunkAPI) => {
//     try {
//       const response = await TicketService.DeleteCompany(id);
//       if (response.StatusCode === 200) {
//         thunkAPI.dispatch(GetDetailedHelpDeskDetails());
//         return response;
//       } else {
//         // thunkAPI.dispatch(setMessage('Invalid Credentials!'));
//         return thunkAPI.rejectWithValue();
//       }
//     } catch (error) {
//       const message =
//         (error.response && error.response.data && error.response.data.message) ||
//         error.message ||
//         error.toString();
//       thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
//       return thunkAPI.rejectWithValue();
//     }
//   },
// );

const initialState = { data: [], loading: false, getHelpDeskDetailsData: [], HDChartCounts: [] };

const ticketSlices = createSlice({
  name: 'tickets',
  initialState,
  extraReducers: {
    [PostNewHelp.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [PostNewHelp.rejected]: (state, action) => {
      state.loading = false;
    },
    [PostNewHelp.pending]: (state, action) => {
      state.loading = true;
    },
    [UpdateHelp.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [UpdateHelp.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetAssignedTickets.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [GetAssignedTickets.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetDetailedHelpDeskDetails.fulfilled]: (state, action) => {
      state.data = action.payload.ResultSet;
      state.loading = false;
    },
    [GetDetailedHelpDeskDetails.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetHelpDeskDetails.fulfilled]: (state, action) => {
      state.getHelpDeskDetailsData = action.payload.ResultSet;
      state.loading = false;
    },
    [GetHelpDeskDetails.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetAssigneeTickets.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [GetAssigneeTickets.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetCompany.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [GetCompany.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetHelpDeskActivities.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [GetHelpDeskActivities.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetHelpDeskAssets.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [GetHelpDeskAssets.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetHelpDeskSeverities.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [GetHelpDeskSeverities.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetHelpDeskIncidents.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [GetHelpDeskIncidents.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetHelpDeskStatuses.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [GetHelpDeskStatuses.rejected]: (state, action) => {
      state.loading = false;
    },

    [GetHelpDeskUsers.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [GetHelpDeskUsers.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetHelpDeskChartCounts.fulfilled]: (state, action) => {
      state.HDChartCounts = action.payload.ResultSet;
      state.loading = false;
    },
    [GetHelpDeskChartCounts.rejected]: (state, action) => {
      state.loading = false;
    },
    [fetchAllData.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [fetchAllData.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer } = ticketSlices;
export default reducer;

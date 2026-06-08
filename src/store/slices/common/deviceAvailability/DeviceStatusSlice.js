//note chnaged according to DeviceAvailablity.js page code 

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deviceStatusAPI } from '../../../../store/services/common/networkstatus/DeviceAvailability';

export const fetchDevicesPaginated = createAsyncThunk(
  'deviceStatus/fetchDevicesPaginated',
  async ({ page, pageSize = 50 }, { rejectWithValue }) => {
    try {
      const response = await deviceStatusAPI.getDevicesPaginated(page, pageSize);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const checkAllDevicesStatus = createAsyncThunk(
  'deviceStatus/checkAllDevicesStatus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await deviceStatusAPI.checkAllDevicesStatus();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchDeviceByName = createAsyncThunk(
  'deviceStatus/searchDeviceByName',
  async (deviceName, { rejectWithValue }) => {
    try {
      const response = await deviceStatusAPI.searchDeviceByName(deviceName);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  devices: [],
  loading: false,
  error: null,
  currentPage: 0,
  totalPages: 0,
  totalItems: 0,
  itemsPerPage: 50,
  searchResult: null,
  searchInput: '',
};

const deviceStatusSlice = createSlice({
  name: 'deviceStatus',
  initialState,
  reducers: {
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
    clearSearchResult: (state) => {
      state.searchResult = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch paginated devices
      .addCase(fetchDevicesPaginated.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDevicesPaginated.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.ResultSet) {
          state.devices = action.payload.ResultSet.devices || [];
          state.currentPage = action.payload.ResultSet.pagination.currentPage;
          state.totalPages = action.payload.ResultSet.pagination.totalPages;
          state.totalItems = action.payload.ResultSet.pagination.totalItems;
          state.itemsPerPage = action.payload.ResultSet.pagination.itemsPerPage;
        }
      })
      .addCase(fetchDevicesPaginated.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Check all devices status
      .addCase(checkAllDevicesStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAllDevicesStatus.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.ResultSet) {
          state.devices = action.payload.ResultSet;
        }
      })
      .addCase(checkAllDevicesStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Search device by name
      .addCase(searchDeviceByName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchDeviceByName.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.ResultSet) {
          state.searchResult = action.payload.ResultSet;
        }
      })
      .addCase(searchDeviceByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearchInput, clearSearchResult } = deviceStatusSlice.actions;
export default deviceStatusSlice.reducer;
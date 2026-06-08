//note chnaged according to DeviceAvailablity.js page code 
import axios from 'axios';

const API_URL = 'http://10.0.13.48:8088/';


export const deviceStatusAPI = {
  getDevicesPaginated: async (page, pageSize = 50) => {
    try {
      const response = await axios.get(`${API_URL}/Ping/GetDevicesPaginated`, {
        params: { page, pageSize }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch devices");
    }
  },

  checkAllDevicesStatus: async () => {
    try {
      const response = await axios.get(`${API_URL}/Ping/CheckAllDevicesStatus`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to check all devices");
    }
  },

  searchDeviceByName: async (deviceName) => {
    try {
      const response = await axios.get(`${API_URL}/Ping/SearchDeviceByName`, {
        params: { deviceName }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to search for device");
    }
  },

  pingOneDevice: async (ipAddress) => {
    try {
      const response = await axios.get(`${API_URL}/Ping/DoPindOne`, {
        params: { ipAddress }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to ping device");
    }
  },

  getServerSnmpMaster: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/Admin/SNMP/GetServerSnmpMaster`, {
        params: { Id: id }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch server SNMP data");
    }
  }
};

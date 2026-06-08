import axios from 'axios';

const validateToken = () => {
  return axios.get('Access/ValidateToken').then((response) => {
    return response.data;
  });
};

const login = (data) => {
  return axios.post(`Login/UserLogin`, data).then((response) => {
    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem('user');
  return axios.post('signout').then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const GetHeaderComponents = () => {
  return axios.post(`Access/GetHeaderComponents`).then((response) => {
    return response.data;
  });
};

const GetUserDetails = () => {
  return axios.post(`UserDetails/GetUserDetails`).then((response) => {
    return response.data;
  });
};

const AuthService = {
  validateToken,
  login,
  logout,
  getCurrentUser,
  GetHeaderComponents,
  GetUserDetails,
};

export default AuthService;

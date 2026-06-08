import axios from 'axios';

const GetEnironmentalVariables = (data) => {
  return axios.get(`Environment/GetEnironmentalVariables`, data).then((response) => {
    return response.data.Result;
  });
};

const dataCenterService = {
  GetEnironmentalVariables
};

export default dataCenterService;

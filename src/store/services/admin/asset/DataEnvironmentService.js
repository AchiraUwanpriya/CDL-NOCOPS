import axios from 'axios';

const GetEnironmentalVariables = (data) => {
    return axios.post('User/Environment/GetEnironmentalVariables', data).then((response) => {
        return response.data;
    });
} ;

const GetEnvironment = {
    GetEnironmentalVariables,
}

export default GetEnvironment;
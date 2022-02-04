import axios from 'axios';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = 'http://localhost:5001/api';

axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
   Accept: 'application/json'
};

//All request will wait 2 seconds before timeout
axiosClient.defaults.timeout = 2000;

axiosClient.defaults.withCredentials = false;

export default axiosClient;
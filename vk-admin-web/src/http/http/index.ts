import Axios from "./Axios";

const http = new Axios({
    baseURL: 'http://localhost:8080/mock',
    timeout: 2000
});

export default http;
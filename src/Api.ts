import axios from "axios";
const url: any = 'http://127.0.0.1:8000/api';
const headers: object = { 'AuthKey': 'qmd4QnIaa1ALYtS9HhIeDTzy0kOwMRVq4GR' };
export default axios.create({
    baseURL: url,
    timeout: 20000,
    headers: headers,
    async: true,
    mode: 'cors'
});
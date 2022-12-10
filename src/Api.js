import axios from "axios";
const url = 'http://127.0.0.1:8000/api';
const headers = { 'AuthKey': 'qmd4QnIaa1ALYtS9HhIeDTzy0kOwMRVq4GR' };
export default axios.create({
    baseURL: url,
    timeout: 20000,
    headers: headers,
    async: true,
    mode: 'cors'
});
import axios from "axios";

const instance = axios.create({
    baseURL:'http://localhost:5001/clone-e9a5e/us-central1/api'
});

export default instance;
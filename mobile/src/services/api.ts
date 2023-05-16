import axios from "axios";

const api = axios.create({
    baseURL: "https://sobrado404-node-js.vercel.app",
});


export { api };
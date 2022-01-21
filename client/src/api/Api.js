import axios from "axios";

let url;

if (process.env.NODE_ENV === "production") {
    url = "users";
}
if (process.env.NODE_ENV === "development") {
    url = "localhost:5000/";
}

export default axios.create({
    baseURL: url,
});

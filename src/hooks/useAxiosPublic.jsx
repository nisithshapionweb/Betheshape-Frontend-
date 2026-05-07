import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://api.betheshape.com',
    // baseURL: 'https://api.betheshape.com',
    withCredentials: true, // ✅ REQUIRED for cookies to be sent
});


const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;

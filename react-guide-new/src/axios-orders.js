import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-order-food-be78d.firebaseio.com/'
});

export default instance;
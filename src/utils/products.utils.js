import axios from "axios";

export const getProducts = async () => {
    const url = `https://dummyjson.com/products?limit=0`;
    try {
        const response = await axios.get(url);
        return response.data.products;
    } catch (error) {
        console.error('Error fetching data:', error);
        return []; // or handle the error appropriately
    }
}

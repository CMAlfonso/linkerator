import axios from "axios";

export async function fetchData() {
    try {
        const {data} = await axios.get("http://localhost:8080");

        return data;
    } catch (error) {
        console.error("Error fetching data!");
        throw error;
    }
}
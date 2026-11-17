import { api } from "./api.js";


export async function getAll() {
    try{
        const response = await api.get("/series");
        return response.data;
    }catch (error){
        throw(error);
    }
}


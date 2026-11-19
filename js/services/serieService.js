import { api } from "./api.js";

export async function getAll(params) {
    try{
        const response = await api.get("/series", { params:params });
        return response.data;
    }catch (error){
        throw(error);
    }
}

export async function create(serie) {
    try{
    const response = await api.post("/series", serie);
    return response.data;
    }
    catch{
        throw new Error("test");
    }
}


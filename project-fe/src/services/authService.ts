import { LoginUser, RegisterUser } from "../models/User";
import API from "./api";

export const register = async (data: RegisterUser) => {
    const response = await API.post("/register", data);
    return response.data;
};

export const login = async (data: LoginUser) => {
    const response = await API.post("/login", data);
    return response.data;
};
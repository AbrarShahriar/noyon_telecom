import { NoyonAxios } from "../global";

export const login = (body) => NoyonAxios.post("/auth/login", body);

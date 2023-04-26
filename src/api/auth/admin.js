import { NoyonAxios } from "../global";

export const adminLogin = (body) => NoyonAxios.post("/admin/login", body);

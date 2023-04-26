import { NoyonAxios } from "../global";

export const logout = () => NoyonAxios.get("/auth/logout");

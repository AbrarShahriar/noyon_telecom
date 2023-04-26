import { NoyonAxios } from "../global";

export const isAuthenticated = () => NoyonAxios.get("/auth/isAuthenticated");

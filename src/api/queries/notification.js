import { NoyonAxios } from "../global";

export const getNoti = () => NoyonAxios.get("/notification");

import { NoyonAxios } from "../global";

export const userData = () => NoyonAxios.get("/user/info");

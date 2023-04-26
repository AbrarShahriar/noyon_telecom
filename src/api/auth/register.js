import { NoyonAxios } from "../global";
export const createUser = (body) => NoyonAxios.post("/user/register", body);

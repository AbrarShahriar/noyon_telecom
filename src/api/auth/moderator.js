import { NoyonAxios } from "../global";

export const moderatorLogin = (body) =>
  NoyonAxios.post("/moderator/login", body);

/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";

export const verifyToken = (token: any) => {
  return jwtDecode(token);
};

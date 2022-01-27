import fetch from "node-fetch";
import { url } from "../../utilis/utilis";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export async function getProfile(call, token) {
  try {
    return await call(`${url}/api/profile/me`, {
      method: "GET",
      headers: { ...headers, "x-auth-token": token },
    });
  } catch (err) {
    return JSON.stringify({ msg: "Server Error" });
  }
}

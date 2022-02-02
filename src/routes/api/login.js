import fetch from "node-fetch";
import { url } from "../../utilis/utilis";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export async function post(req, res) {
  try {
    const user = req.body;

    const result = await fetch(`${url}auth`, {
      method: "POST",
      headers,
      body: JSON.stringify(user),
    });

    const resData = await result.json();

    req.session.token = resData.data.token;

    res.end(JSON.stringify(resData));
  } catch (err) {
    res.end(
      JSON.stringify({
        success: false,
        message: "An error occured, please try again",
      })
    );
  }
}

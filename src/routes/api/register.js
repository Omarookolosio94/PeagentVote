import fetch from 'node-fetch';
import { url } from '../../utilis/utilis';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};

export async function post(req, res) {
  try {
    const user = req.body;

    const result = await fetch(`${url}/auth/register`, {
      method: 'POST',
      headers,
      body: JSON.stringify(user)
    });

    const resData = await result.json();

    if (result.status === 200) {
      res.end(JSON.stringify(resData));
    } else if (result.status === 422) {
      res.end(JSON.stringify({ status: 422, data: resData }));
    } else {
      res.end(JSON.stringify({ status: 400, data: resData }));
    }
  } catch (err) {
    console.log(err, 'error');
    res.end(JSON.stringify(err));
  }
}

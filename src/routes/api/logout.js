export async function post(req, res) {
  delete req.session.token;
  res.end(JSON.stringify({ message: "success!" }));
}

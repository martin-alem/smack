function signupController(req, res, next) {
  const user = req.body;
  res.redirect(301, "/view/home");
}

export default signupController;

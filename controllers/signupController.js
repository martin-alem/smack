function signupController(req, res, next) {
  const user = req.body;
  console.log(user);
  res.redirect(301, "/view/home");
}

export default signupController;

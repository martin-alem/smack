function logoutController(req, res, next) {
  res.clearCookie("_user_token");
  res.clearCookie("_user_uid");
  res.redirect("/view/login");
}

export default logoutController;

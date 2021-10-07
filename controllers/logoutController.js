function logoutController(req, res, next) {
  res.clearCookie("1P_JAR");
  res.clearCookie("_user_token");
  res.clearCookie("_user_uid");
  res.redirect("/login");
}

export default logoutController;

function homeViewController(req, res, next) {
  res.status(200).render("home");
}

export default homeViewController;

function resetRequestViewController(req, res, next) {
  res.status(200).render("reset_request");
}

export default resetRequestViewController;

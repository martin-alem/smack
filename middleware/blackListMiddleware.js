import Errorhandler from "./../utils/Errorhandler.js";

function blacklistMiddleware(req, res, next) {
  if (req.ip === "127.0.0.1") {
    next(new Errorhandler("Ip address blacklisted", 403));
  } else {
    next();
  }
}

export default blacklistMiddleware;

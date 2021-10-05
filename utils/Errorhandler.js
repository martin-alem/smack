class Errorhandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    return this;
  }
}

export default Errorhandler;

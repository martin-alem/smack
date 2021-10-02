import http from "http";
import https from "https";
import tls from "tls";

class Server {
  /**
   * Construct and turns a server instance
   * @param {string} serverType http | https | tls
   * @param {Object} options server options
   * @param {Function} listener request handler
   * @returns {http.Server} return a server instance
   */
  constructor(serverType, options, listener) {
    switch (serverType) {
      case "http":
        return http.createServer(options, listener);
      case "https":
        return https.createServer(options, listener);
      case "tsl":
        return tls.createServer(options, listener);
      default:
        return http.createServer(options, listener);
    }
  }
}

export default Server;

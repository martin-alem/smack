import dotenv from "dotenv";
import mainServer from "./servers/mainServer.js";

dotenv.config();

mainServer.listen(process.env.MAIN_SERVER_PORT, "0.0.0.0", () => {
  console.log(`Main server running on port ${process.env.MAIN_SERVER_PORT}`);
});

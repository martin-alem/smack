import dotenv from "dotenv";
import mainServer from "./servers/mainServer.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
mainServer.listen(PORT, () => {
  console.log(`Main server running on port ${PORT}`);
});

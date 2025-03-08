import app from "../src/app";
import * as http from "http";

var figlet = require("figlet");
const PORT = process.env.PORT || 8888;
const server = http.createServer(app);

server.listen(PORT, () => {
  figlet("nonpawiz.dev", (err: Error, text: string) => {
    console.log(text);
    console.log(
      `Server is Successfully Running, and App is listening on http://localhost:${PORT}/`
    );
  });
});

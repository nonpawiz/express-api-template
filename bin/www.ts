import app from "../src/app";
import * as http from "http";

const figlet = require("figlet");
const PORT = process.env.PORT || 7777;
const server = http.createServer(app);

// figlet("nonpawiz", (err, nonpawiz) => {
//   console.log(nonpawiz);
//   console.log(
//     `Server is Successfully Running, and App is listening on http://localhost:${port}/`
//   );
// });
server.listen(PORT, () => {
  figlet("nonpawiz.dev", (err: Error, text: string) => {
    console.log(text);
    console.log(
      `Server is Successfully Running, and App is listening on http://localhost:${PORT}/`
    );
  });
});

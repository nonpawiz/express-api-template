"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const users = [
    {
        id: 1,
        name: "Alice",
    },
    {
        id: 2,
        name: "Bob",
    },
    {
        id: 3,
        name: "Charlie",
    },
];
// GET /users - Returns a list of users
_1.router.get("/", (req, res) => {
    res.json(users);
});
exports.default = _1.router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcrypt");
exports.default = () => {
    const hash = async (value) => {
        return await bcrypt.hash(value, 12);
    };
    const compare = async (value, encrypted) => {
        return await bcrypt.compare(value, encrypted);
    };
    return { hash, compare };
};

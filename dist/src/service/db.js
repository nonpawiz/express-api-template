"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const useMoment_1 = __importDefault(require("./useMoment"));
const prisma = new client_1.PrismaClient();
prisma.$use(async (params, next) => {
    const result = await next(params);
    if (Array.isArray(result)) {
        return result.map(formatDates);
    }
    else if (result && typeof result === "object") {
        return formatDates(result);
    }
    return result;
});
function formatDates(data) {
    if (data.createdAt)
        data.createdAt = (0, useMoment_1.default)().formatUtc(data.createdAt);
    if (data.updatedAt)
        data.updatedAt = (0, useMoment_1.default)().formatUtc(data.updatedAt);
    return data;
}
exports.default = prisma;

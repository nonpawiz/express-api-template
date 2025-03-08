"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const i18next_1 = __importDefault(require("i18next"));
const i18next_http_middleware_1 = __importDefault(require("i18next-http-middleware"));
const i18next_fs_backend_1 = __importDefault(require("i18next-fs-backend"));
const path_1 = __importDefault(require("path"));
i18next_1.default
    .use(i18next_fs_backend_1.default)
    .use(i18next_http_middleware_1.default.LanguageDetector)
    .init({
    fallbackLng: "en", // Default language
    preload: ["en", "th"], // Load supported languages
    backend: {
        loadPath: path_1.default.join(__dirname, "locales/{{lng}}.json"), // Load translations from JSON files
    },
    detection: {
        order: ["header"], // Detect language from the request header
    },
});
exports.default = i18next_1.default;

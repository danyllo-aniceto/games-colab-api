"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
require("dotenv/config");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const prisma_1 = __importDefault(require("../prisma"));
const ApiError_1 = require("../validators/Exceptions/ApiError");
class AuthService {
    async execute({ email, password }) {
        // Verificar se email existe
        const user = await prisma_1.default.user.findFirst({ where: { email } });
        if (!user) {
            throw new ApiError_1.ApiError(400, 'Credenciais incorretas!');
        }
        // Verificar se a senha está correta
        const isMatchPassword = await (0, bcryptjs_1.compare)(password, user.password);
        if (!isMatchPassword) {
            throw new ApiError_1.ApiError(400, 'Credenciais incorretas!');
        }
        const token = (0, jsonwebtoken_1.sign)({
            email: user.email,
            name: user.name
        }, process.env.JWT_SECRET, {
            subject: user.id.toString(),
            expiresIn: process.env.TOKEN_EXPIRE || '1d'
        });
        return { token };
    }
}
exports.AuthService = AuthService;

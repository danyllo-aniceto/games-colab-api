"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = __importDefault(require("../prisma"));
class UserService {
    async create(data) {
        const user = await prisma_1.default.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: (0, bcryptjs_1.hashSync)(data.password, 8)
            }
        });
        return {
            name: user.name,
            email: user.email
        };
    }
    async delete(id) {
        await prisma_1.default.user.delete({ where: { id } });
    }
    async getUserById(id) {
        const user = await prisma_1.default.user.findFirst({ where: { id } });
        delete user.password;
        return user;
    }
    async getUser() {
        const users = await prisma_1.default.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                created_at: true,
                updated_at: true
            }
        });
        return users;
    }
    async getUsersPaged(limit, page) {
        const offset = page * limit - limit;
        const usersPaged = await prisma_1.default.user.findMany({
            orderBy: { created_at: 'asc' },
            skip: offset,
            take: limit,
            select: {
                id: true,
                name: true,
                email: true,
                created_at: true,
                updated_at: true
            }
        });
        const total = await prisma_1.default.user.count();
        const totalPages = total > limit ? total / limit : 1;
        return {
            total,
            page,
            totalPages: Number.isInteger(totalPages)
                ? totalPages
                : parseInt((totalPages + 1).toString()),
            limit,
            offset: offset + limit,
            instances: usersPaged
        };
    }
    async putUserById(id, data) {
        await prisma_1.default.user.update({
            where: { id: id },
            data: {
                name: data.name,
                email: data.email,
                password: (0, bcryptjs_1.hashSync)(data.password || '', 8)
            }
        });
    }
}
exports.UserService = UserService;

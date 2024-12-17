"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class PlatformService {
    async create(data) {
        const platform = await prisma_1.default.platform.create({
            data: {
                name: data.name,
                image: data.image
            }
        });
        return platform;
    }
    async delete(id) {
        await prisma_1.default.platform.delete({ where: { id } });
    }
    async getPlatformById(id) {
        const platform = await prisma_1.default.platform.findFirst({
            where: { id }
        });
        return platform;
    }
    async getPlatforms() {
        const platforms = await prisma_1.default.platform.findMany();
        return platforms;
    }
    async putPlatformById(id, data) {
        await prisma_1.default.platform.update({
            where: { id: id },
            data: {
                name: data.name,
                image: data.image
            }
        });
    }
}
exports.PlatformService = PlatformService;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class GameService {
    async create(data) {
        const game = await prisma_1.default.game.create({
            data: {
                name: data.name,
                developer: data.developer,
                genre: data.genre,
                image: data.image,
                summary: data.summary,
                PlatformGame: {
                    create: data.idPlatform.map(item => {
                        return { idPlatform: item };
                    })
                }
            },
            include: { PlatformGame: true }
        });
        return game;
    }
    async delete(id) {
        await prisma_1.default.game.delete({ where: { id } });
    }
    async getGamePlatformById(id) {
        const game = await prisma_1.default.game.findFirst({
            where: { id },
            include: { PlatformGame: { include: { Platform: true } } }
        });
        return game;
    }
    async getGamesPlatform() {
        const games = await prisma_1.default.game.findMany({
            include: { PlatformGame: { include: { Platform: true } } }
        });
        return games;
    }
    async getGameEvaluationById(id) {
        const game = await prisma_1.default.game.findFirst({
            where: { id },
            include: { Evaluation: { include: { User: true } } }
        });
        return game;
    }
    async getGamesEvaluation() {
        const games = await prisma_1.default.game.findMany({
            include: { Evaluation: { include: { User: true } } }
        });
        return games;
    }
    async getGames() {
        const games = await prisma_1.default.game.findMany();
        return games;
    }
    async getGameById(id) {
        const game = await prisma_1.default.game.findFirst({
            where: { id }
        });
        return game;
    }
    async putGameById(id, data) {
        await prisma_1.default.game.update({
            where: { id: id },
            data: {
                name: data.name,
                developer: data.developer,
                genre: data.genre,
                image: data.image,
                summary: data.summary,
                PlatformGame: data.idPlatform
                    ? {
                        create: data.idPlatform.map(item => {
                            return { idPlatform: item };
                        })
                    }
                    : undefined
            },
            include: { PlatformGame: true }
        });
    }
}
exports.GameService = GameService;

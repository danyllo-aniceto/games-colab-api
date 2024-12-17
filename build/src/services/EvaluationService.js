"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluationService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const helpers_1 = require("../utils/helpers");
class EvaluationService {
    async create(data) {
        const evaluation = await prisma_1.default.evaluation.create({
            data: {
                idUser: data.idUser,
                idGame: data.idGame,
                rating: data.rating,
                comment: data.comment
            }
        });
        return evaluation;
    }
    async delete(id) {
        await prisma_1.default.evaluation.delete({ where: { id } });
    }
    async getEvaluations() {
        const evaluations = await prisma_1.default.evaluation.findMany({
            include: {
                User: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        created_at: true,
                        updated_at: true
                    }
                }
            }
        });
        return evaluations;
    }
    async getEvaluationById(id) {
        const evaluation = await prisma_1.default.evaluation.findFirst({
            where: { id },
            include: {
                User: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        created_at: true,
                        updated_at: true
                    }
                }
            }
        });
        return evaluation;
    }
    async getEvaluationByIdGame(idGame) {
        const evaluation = await prisma_1.default.evaluation.findMany({
            where: { idGame: idGame }
        });
        return evaluation;
    }
    async putEvaluationById(id, data) {
        await prisma_1.default.evaluation.update({
            where: { id: id },
            data: {
                idGame: data.idGame,
                idUser: data.idUser,
                rating: data.rating,
                comment: data.comment
            }
        });
    }
    async getTopThreeGames() {
        const queryTopThreeGames = await prisma_1.default.$queryRaw `select g.id, g.name, g.image, sum(e.rating)  
    from users u join evaluations e on u.id = e."idUser" join games g on g.id = e."idGame"
    group by g.id
    order by sum(e.rating) desc limit 3`;
        let newList = [];
        for (const iterator of queryTopThreeGames) {
            newList.push({
                name: iterator.name,
                sum: Number((0, helpers_1.toJson)(iterator.sum)),
                image: iterator.image,
                id: iterator.id
            });
        }
        return newList;
    }
}
exports.EvaluationService = EvaluationService;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluationController = void 0;
const EvaluationService_1 = require("../services/EvaluationService");
const EvaluationValidator_1 = require("../validators/EvaluationValidator");
const ApiError_1 = require("../validators/Exceptions/ApiError");
class EvaluationController {
    async create(req, res) {
        const data = req.body;
        const validator = new EvaluationValidator_1.EvaluationValidator();
        try {
            await validator.createValidator().validate(data, {
                abortEarly: false
            });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, error.message || error);
        }
        const evaluationService = new EvaluationService_1.EvaluationService();
        const evaluation = await evaluationService.create(data);
        res.status(201).json(evaluation);
    }
    async delete(req, res) {
        const { id } = req.params;
        const validator = new EvaluationValidator_1.EvaluationValidator();
        try {
            await validator
                .deleteByIdValidator()
                .validate({ id: Number(id) }, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, error.message || error);
        }
        if (!(await validator.idExist(Number(id)))) {
            throw new ApiError_1.ApiError(400, 'Avaliação não existe');
        }
        const evaluationService = new EvaluationService_1.EvaluationService();
        await evaluationService.delete(Number(id));
        res.status(200).json({ message: 'Avaliação deletada com sucesso' });
    }
    async getEvaluationById(req, res) {
        const { id } = req.params;
        const validator = new EvaluationValidator_1.EvaluationValidator();
        try {
            await validator
                .getByIdValidator()
                .validate({ id: Number(id) }, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, error.message || error);
        }
        if (!(await validator.idExist(Number(id)))) {
            throw new ApiError_1.ApiError(400, 'Avaliação não existe');
        }
        const evaluationService = new EvaluationService_1.EvaluationService();
        const evaluation = await evaluationService.getEvaluationById(Number(id));
        res.status(200).json(evaluation);
    }
    async getEvaluationByIdGame(req, res) {
        const { idGame } = req.params;
        console.log(idGame);
        const evaluationService = new EvaluationService_1.EvaluationService();
        const consulta = await evaluationService.getEvaluationByIdGame(Number(idGame));
        res.status(200).json(consulta);
    }
    async getEvaluations(req, res) {
        const evaluationService = new EvaluationService_1.EvaluationService();
        const allEvaluations = await evaluationService.getEvaluations();
        res.status(200).json(allEvaluations);
    }
    async putEvaluationById(req, res) {
        const { id } = req.params;
        const data = req.body;
        const validator = new EvaluationValidator_1.EvaluationValidator();
        try {
            await validator
                .updateByIdValidator()
                .validate(Object.assign({ id: Number(id) }, data), { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, error.message || error);
        }
        if (!(await validator.idExist(Number(id)))) {
            throw new ApiError_1.ApiError(400, 'Avaliação não existe');
        }
        const evaluationService = new EvaluationService_1.EvaluationService();
        await evaluationService.putEvaluationById(Number(id), data);
        res.status(200).json({ message: 'Avalição atualizada com sucesso' });
    }
    async getTopThreeGames(req, res) {
        const evaluationService = new EvaluationService_1.EvaluationService();
        const consulta = await evaluationService.getTopThreeGames();
        res.status(200).json(consulta);
    }
}
exports.EvaluationController = EvaluationController;

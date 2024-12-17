"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameController = void 0;
const GameService_1 = require("../services/GameService");
const ApiError_1 = require("../validators/Exceptions/ApiError");
const GameValidator_1 = require("../validators/GameValidator");
const UploadController_1 = require("./UploadController");
class GameController {
    async createWithUpload(req, res) {
        const data = req.body;
        let newData;
        if (typeof data.idPlatform === 'string') {
            newData = Object.assign(Object.assign({}, data), { idPlatform: JSON.parse(data.idPlatform) });
        }
        const validator = new GameValidator_1.GameValidator();
        try {
            await validator
                .createValidatorWithUpload()
                .validate(newData, { abortEarly: false });
            if (!req.file)
                throw 'Image is required or invalid extension. It should be only (png, jpg, jpeg, pjpeg, gif, svg)';
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, error.message || error);
        }
        newData.image = (await (0, UploadController_1.uploadImage)(newData, req)) || '';
        const gameService = new GameService_1.GameService();
        const game = await gameService.create(newData);
        res.status(201).json(game);
    }
    async create(req, res) {
        const data = req.body;
        const validator = new GameValidator_1.GameValidator();
        try {
            await validator.createValidator().validate(data, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, error.message || error);
        }
        const gameService = new GameService_1.GameService();
        const game = await gameService.create(data);
        res.status(201).json(game);
    }
    async delete(req, res) {
        const { id } = req.params;
        const validator = new GameValidator_1.GameValidator();
        try {
            await validator
                .deleteByIdValidator()
                .validate({ id: Number(id) }, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, error.message || error);
        }
        if (!(await validator.idExist(Number(id)))) {
            throw new ApiError_1.ApiError(400, 'Jogo não existe');
        }
        const gameService = new GameService_1.GameService();
        await gameService.delete(Number(id));
        res.status(200).json({ message: 'Jogo deletado com sucesso' });
    }
    async getGamesPlatform(req, res) {
        const gameService = new GameService_1.GameService();
        const allGames = await gameService.getGamesPlatform();
        res.status(200).json(allGames);
    }
    async getGamePlatformById(req, res) {
        const { id } = req.params;
        const validator = new GameValidator_1.GameValidator();
        try {
            await validator
                .getByIdValidator()
                .validate({ id: Number(id) }, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, error.message || error);
        }
        const gameService = new GameService_1.GameService();
        const game = await gameService.getGamePlatformById(Number(id));
        if (!(await validator.idExist(Number(id)))) {
            throw new ApiError_1.ApiError(400, 'Jogo não existe');
        }
        res.status(200).json(game);
    }
    async putGameById(req, res) {
        const { id } = req.params;
        const data = req.body;
        const validator = new GameValidator_1.GameValidator();
        try {
            await validator
                .updateByIdValidator()
                .validate(Object.assign({ id: Number(id) }, data), { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, error.message || error);
        }
        if (!(await validator.idExist(Number(id)))) {
            throw new ApiError_1.ApiError(400, 'Jogo não existe');
        }
        const gameService = new GameService_1.GameService();
        await gameService.putGameById(Number(id), data);
        res.status(200).json({ message: 'Jogo atualizado com sucesso' });
    }
}
exports.GameController = GameController;

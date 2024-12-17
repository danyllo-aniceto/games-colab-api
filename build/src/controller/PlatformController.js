"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformController = void 0;
const PlatformService_1 = require("../services/PlatformService");
const ApiError_1 = require("../validators/Exceptions/ApiError");
const PlatformValidator_1 = require("../validators/PlatformValidator");
class PlatformController {
    async create(req, res) {
        const data = req.body;
        const validator = new PlatformValidator_1.PlatformValidator();
        try {
            await validator.createValidator().validate(data, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, error.message || error);
        }
        const platformService = new PlatformService_1.PlatformService();
        const platform = await platformService.create(data);
        res.status(201).json(platform);
    }
    async delete(req, res) {
        const { id } = req.params;
        const validator = new PlatformValidator_1.PlatformValidator();
        try {
            await validator
                .deleteByIdValidator()
                .validate({ id: Number(id) }, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, error.message || error);
        }
        if (!(await validator.idExist(Number(id)))) {
            throw new ApiError_1.ApiError(400, 'Plataforma não existe');
        }
        const platformService = new PlatformService_1.PlatformService();
        await platformService.delete(Number(id));
        res.status(200).json({ message: 'Plataforma deletada com sucesso' });
    }
    async getPlatformById(req, res) {
        const { id } = req.params;
        const validator = new PlatformValidator_1.PlatformValidator();
        try {
            await validator
                .getByIdValidator()
                .validate({ id: Number(id) }, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, error.message || error);
        }
        if (!(await validator.idExist(Number(id)))) {
            throw new ApiError_1.ApiError(400, 'Plataforma não existe');
        }
        const platformService = new PlatformService_1.PlatformService();
        const platform = await platformService.getPlatformById(Number(id));
        res.status(200).json(platform);
    }
    async getPlatforms(req, res) {
        const platformService = new PlatformService_1.PlatformService();
        const allPlatforms = await platformService.getPlatforms();
        res.status(200).json(allPlatforms);
    }
    async putPlatformById(req, res) {
        const { id } = req.params;
        const data = req.body;
        const validator = new PlatformValidator_1.PlatformValidator();
        try {
            await validator
                .updateByIdValidator()
                .validate(Object.assign({ id: Number(id) }, data), { abortEarly: false });
        }
        catch (error) {
            if (!(await validator.idExist(Number(id)))) {
                return res.status(400).json({ message: 'Plataforma não existe' });
            }
            throw new ApiError_1.ApiError(400, error.message || error);
        }
        if (!(await validator.idExist(Number(id)))) {
            throw new ApiError_1.ApiError(400, 'Plataforma não existe');
        }
        const platformService = new PlatformService_1.PlatformService();
        await platformService.putPlatformById(Number(id), data);
        res.status(200).json({ message: 'Plataforma atualizada com sucesso' });
    }
}
exports.PlatformController = PlatformController;

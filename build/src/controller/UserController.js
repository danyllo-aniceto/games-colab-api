"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserService_1 = require("../services/UserService");
const ApiError_1 = require("../validators/Exceptions/ApiError");
const UserValidator_1 = require("../validators/UserValidator");
class UserController {
    async create(req, res) {
        const data = req.body;
        const validator = new UserValidator_1.UserValidator();
        try {
            await validator.createValidator().validate(data, {
                abortEarly: false
            });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, error.message || error);
        }
        if (await validator.emailExist(data.email))
            throw new ApiError_1.ApiError(400, 'User already exists');
        const userService = new UserService_1.UserService();
        const user = await userService.create(data);
        res.status(201).json(user);
    }
    async delete(req, res) {
        const { id } = req.params;
        const validator = new UserValidator_1.UserValidator();
        try {
            await validator
                .deleteByIdValidator()
                .validate({ id: Number(id) }, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, error.message || error);
        }
        if (!(await validator.idExist(Number(id)))) {
            throw new ApiError_1.ApiError(400, 'Usuário não existe');
        }
        const userService = new UserService_1.UserService();
        await userService.delete(Number(id));
        res.status(200).json({ message: 'Usuário deletado com sucesso' });
    }
    async getUserById(req, res) {
        const { id } = req.params;
        const validator = new UserValidator_1.UserValidator();
        try {
            await validator
                .getByIdValidator()
                .validate({ id: Number(id) }, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, error.message || error);
        }
        if (!(await validator.idExist(Number(id)))) {
            throw new ApiError_1.ApiError(400, 'Usuário não existe');
        }
        const userService = new UserService_1.UserService();
        const user = await userService.getUserById(Number(id));
        res.status(200).json(user);
    }
    async getUsers(req, res) {
        const userService = new UserService_1.UserService();
        const allUsers = await userService.getUser();
        res.status(200).json(allUsers);
    }
    async getUsersPaged(req, res) {
        let { limit, page } = req.query;
        limit = parseInt(limit || 1);
        page = parseInt(page || 1);
        const validator = new UserValidator_1.UserValidator();
        try {
            await validator
                .getPagedValidor()
                .validate({ limit, page }, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, error.message || error);
        }
        const userService = new UserService_1.UserService();
        const allUsersPaged = await userService.getUsersPaged(limit, page);
        res.status(200).json(allUsersPaged);
    }
    async putUserById(req, res) {
        const { id } = req.params;
        const data = req.body;
        const validator = new UserValidator_1.UserValidator();
        try {
            await validator
                .updateByIdValidator()
                .validate(Object.assign({ id: Number(id) }, data), { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, error.message || error);
        }
        if (!(await validator.idExist(Number(id)))) {
            throw new ApiError_1.ApiError(400, 'Este usuário não existe');
        }
        const userService = new UserService_1.UserService();
        await userService.putUserById(Number(id), data);
        res.status(200).json({ message: 'Usuário atualizado com sucesso' });
    }
}
exports.UserController = UserController;

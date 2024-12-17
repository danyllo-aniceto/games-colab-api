"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AuthService_1 = require("../services/AuthService");
const AuthValidator_1 = require("../validators/AuthValidator");
const ApiError_1 = require("../validators/Exceptions/ApiError");
class AuthController {
    async handle(request, response) {
        const { email, password } = request.body;
        const authValidator = new AuthValidator_1.AuthValidator();
        try {
            await authValidator
                .authValidation()
                .validate(request.body, { abortEarly: false });
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, error.message || error);
        }
        const authenticateUserService = new AuthService_1.AuthService();
        const token = await authenticateUserService.execute({
            email,
            password
        });
        return response.json(token);
    }
}
exports.AuthController = AuthController;

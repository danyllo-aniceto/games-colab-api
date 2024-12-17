"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidator = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const yup = __importStar(require("yup"));
class UserValidator {
    async idExist(id) {
        const user = await prisma_1.default.user.findFirst({
            where: { id }
        });
        return !!user;
    }
    async emailExist(email) {
        const user = await prisma_1.default.user.findFirst({
            where: { email }
        });
        return !!user;
    }
    createValidator() {
        return yup.object().shape({
            name: yup.string().required('Name is required'),
            email: yup
                .string()
                .email('Fiel to be of type email')
                .required('Email is required'),
            password: yup.string().required('Password is required')
        });
    }
    updateByIdValidator() {
        return yup.object().shape({
            id: yup.number().required('Id is required in params'),
            name: yup.string().optional(),
            email: yup.string().email('Field to be of type email').optional(),
            password: yup.string().optional()
        });
    }
    deleteByIdValidator() {
        return yup.object().shape({
            id: yup.number().required('Id is required in params')
        });
    }
    getByIdValidator() {
        return yup.object().shape({
            id: yup.number().required('Id is required in params')
        });
    }
    getPagedValidor() {
        return yup.object().shape({
            limit: yup
                .number()
                .min(1, 'Minimum limit per page is 1')
                .max(100, 'Maximum limit per page is 100')
                .required('Limit is required in query params'),
            page: yup
                .number()
                .min(1, 'Minimum limit per page is 1')
                .required('Limit is required in query params')
        });
    }
}
exports.UserValidator = UserValidator;

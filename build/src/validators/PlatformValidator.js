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
exports.PlatformValidator = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const yup = __importStar(require("yup"));
class PlatformValidator {
    async idExist(id) {
        const platform = await prisma_1.default.platform.findFirst({
            where: { id }
        });
        return !!platform;
    }
    createValidator() {
        return yup.object().shape({
            name: yup.string().required('Name is required'),
            image: yup.string().required('Image is required')
        });
    }
    updateByIdValidator() {
        return yup.object().shape({
            id: yup.number().required('Id is required in params'),
            name: yup.string().optional(),
            image: yup.string().optional()
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
}
exports.PlatformValidator = PlatformValidator;

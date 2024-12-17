"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeImageGame = exports.removeImagePlatform = exports.uploadImage = void 0;
const firebase_1 = require("../firebase");
const fs_1 = __importDefault(require("fs"));
const firebaseActive = process.env.firebaseActive === 'true' ? true : false;
const name_app = process.env.name_app || 'Games';
async function uploadImage(data, request) {
    const storageService = new firebase_1.StorageService();
    if (firebaseActive) {
        const nomeArquivo = `${name_app}_${Date.now()}`;
        data.image_url =
            (await storageService.subirImagen(nomeArquivo, request.file)) || '';
    }
    else {
        const nomeArquivo = `${Date.now()}_${request.file.originalname}`;
        const base64 = request.file.buffer.toString('base64');
        fs_1.default.writeFile(`./src/uploads/images/${nomeArquivo}`, base64, 'base64', err => {
            if (err)
                console.log('Error upload image repository ->', err.message);
        });
        data.image_url = `src/uploads/images/${nomeArquivo}` || '';
    }
    return data.image_url;
}
exports.uploadImage = uploadImage;
async function removeImagePlatform(id, platformService) {
    const storageService = new firebase_1.StorageService();
    const platformFound = await platformService.getPlatformById(id);
    if (platformFound.image.slice(0, 4) === 'http')
        await storageService.removerImagem(platformFound.image);
    else
        fs_1.default.unlink(platformFound.image, err => {
            if (err)
                console.log('Error deleted image repository ->', err.message);
        });
}
exports.removeImagePlatform = removeImagePlatform;
async function removeImageGame(id, gameService) {
    const storageService = new firebase_1.StorageService();
    const gameFound = await gameService.getGameById(id);
    if (gameFound.image.slice(0, 4) === 'http')
        await storageService.removerImagem(gameFound.image);
    else
        fs_1.default.unlink(gameFound.image, err => {
            if (err)
                console.log('Error deleted image repository ->', err.message);
        });
}
exports.removeImageGame = removeImageGame;

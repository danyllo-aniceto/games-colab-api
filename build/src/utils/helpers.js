"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toJson = void 0;
function toJson(data) {
    return JSON.stringify(data, (_, v) => typeof v === 'bigint' ? `${v}n` : v).replace(/"(-?\d+)n"/g, (_, a) => a);
}
exports.toJson = toJson;

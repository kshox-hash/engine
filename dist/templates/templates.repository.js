"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templatesRepository = void 0;
const template_main_menu_1 = require("./template.main.menu");
const templates = [template_main_menu_1.templateMainMenu];
exports.templatesRepository = {
    findById(templateId) {
        return templates.find((template) => template.id === templateId);
    },
};

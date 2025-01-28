"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const router = (0, express_1.Router)();
const userController = new UserController_1.UserController();
router.post('/register', userController.register.bind(userController));
router.put('/update', userController.update.bind(userController));
exports.default = router;

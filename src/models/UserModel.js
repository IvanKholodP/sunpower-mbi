"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = require("../entity/User");
class UserModel {
    async getUser(args) {
        try {
            const userRepository = (0, typeorm_1.getRepository)(User_1.User);
            const user = await userRepository.findOne({ where: { userId: args } });
            return { email: user.email, firstName: user.firstName, lastName: user.lastName };
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = UserModel;

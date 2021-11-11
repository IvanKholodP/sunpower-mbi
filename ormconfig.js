"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Applications_1 = require("./src/entity/Applications");
const User_1 = require("./src/entity/User");
const Worker_1 = require("./src/entity/Worker");
const config = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    // host: process.env.DB_HOST,
    // port: 5432,
    // username: process.env.DB_USERNAME,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false
    },
    synchronize: true,
    logging: false,
    entityPrefix: "mbi_",
    entities: [User_1.User, Worker_1.Worker, Applications_1.Applications],
};
exports.default = config;

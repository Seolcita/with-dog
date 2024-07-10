"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
const core_1 = require("@nestjs/core");
const session = require("express-session");
const passport = require("passport");
const mongoose_1 = require("mongoose");
const cors = require("cors");
const app_module_1 = require("./app.module");
const UnauthorizedExceptionFilter_1 = require("./auth/utils/UnauthorizedExceptionFilter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalFilters(new UnauthorizedExceptionFilter_1.UnauthorizedExceptionFilter());
    app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
    app.use(cookieParser());
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const PORT = process.env.PORT || 3001;
    const connectDB = async () => {
        try {
            const conn = await mongoose_1.default.connect(process.env.MONGODB_URI);
            console.log(`MongoDB Connected: ${conn.connection.host}`);
        }
        catch (error) {
            console.log(error);
            process.exit(1);
        }
    };
    connectDB().then(() => {
        app.listen(PORT, () => {
            console.log('listening for requests');
        });
    });
}
bootstrap();
//# sourceMappingURL=main.js.map
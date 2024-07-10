import { ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
export declare class UnauthorizedExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void;
}

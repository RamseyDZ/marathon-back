import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { MongoError } from 'mongodb';
import logger from 'src/lib/logger';
import { CastError, MongooseError } from 'mongoose';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
    catch(exception: MongoError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = getHttpStatus(exception);
        console.log("Error in mongodb handler")
        logger.error(exception.message);
        response.status(status).json({
            statusCode: status,
            message: exception.message,
            error: 'MongoError',
            path: request.url
        })
    }
    
}

@Catch(MongooseError)
export class CastExceptionFilter implements ExceptionFilter {
    catch(exception: CastError, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse();
        const request = context.getRequest<Request>();
        if (exception.path === '_id') {
            // Handle specific ObjectId casting error here
            logger.error(exception.message); 

            response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: HttpStatus.BAD_REQUEST,
                message: "ObjectId not valid",
                details: exception.message,
                error: 'MongoError',
                path: request.url
            })
        } else {
            // Handle other casting errors as needed
            response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Bad request',
                details: exception.message,
                error: 'MongoError',
                path: request.url
            });
        }
    }
}


function getHttpStatus(exception: any): HttpStatus {
    if (exception instanceof MongooseError) {
        return HttpStatus.BAD_REQUEST;
    }
    if (exception instanceof MongoError) {
        const errorCode = exception.code;
      
        switch (errorCode) {
            case 11000: // Duplicate key error
                return HttpStatus.CONFLICT; // 409 Conflict
            case 11500: // Inserted document is too large
                return HttpStatus.PAYLOAD_TOO_LARGE; // 413 Payload Too Large
            case 11600: // Exceeded maximum number of documents in a single write operation
                return HttpStatus.PAYLOAD_TOO_LARGE; // 413 Payload Too Large
            // Add more cases based on specific error codes you encounter
            // Handle other specific MongoDB error codes here
        
            default:
                return HttpStatus.INTERNAL_SERVER_ERROR; // Default to 500 Internal Server Error
        }

    }
}
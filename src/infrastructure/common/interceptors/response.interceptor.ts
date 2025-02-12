import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { map, Observable } from 'rxjs';

export class ResponseFormat<T> {
  @ApiProperty()
  path: string;
  @ApiProperty()
  duration: string;
  @ApiProperty()
  method: string;

  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<Text, ResponseFormat<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseFormat<T>> {
    const now = Date.now();
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<FastifyRequest>();

    return next.handle().pipe(
      map(data => {
        return {
          data,
          path: request.url,
          duration: `${Date.now() - now}ms`,
          method: request.method,
        };
      }),
    );
  }
}

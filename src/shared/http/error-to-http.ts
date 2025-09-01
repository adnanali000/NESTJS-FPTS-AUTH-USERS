import { BadRequestException, ConflictException, HttpException, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { AppError } from '../errors'


export const toHttpException = (e: AppError): HttpException => {
switch (e._tag) {
case 'BadRequest':
return new BadRequestException({ message: e.message, details: e.details })
case 'Conflict':
return new ConflictException({ message: e.message })
case 'NotFound':
return new NotFoundException({ message: e.message })
default:
return new InternalServerErrorException({ message: e.message || 'Unexpected error' })
}
}
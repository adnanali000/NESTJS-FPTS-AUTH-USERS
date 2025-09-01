import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import {pipe} from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/Either'
import * as t from 'io-ts'
import { decode } from "../../shared/validation";
import {toHttpException} from '../../shared/http/error-to-http'

const SignupCodec = t.type({
    email: t.string,
    password: t.string,
    name: t.union([t.string, t.undefined])
})


@Controller('users')
export class UsersController {
    constructor(private readonly users: UsersService) {}

    @Post('signup')
    async signup(@Body() body: unknown){
        return pipe(
            decode(SignupCodec,body), //Either<AppError, User>
            TE.fromEither,
            TE.chain((input) => this.users.signup(input)),
            TE.match(
                (err) => { throw toHttpException(err) },
                (user) => ( { id:user.id, email: user.email, name: user.name } )
            )
        )()
    }
}

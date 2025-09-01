import { Injectable } from "@nestjs/common";
import {UsersRepo} from './users.repo'
import {User} from './users.types'
import {pipe} from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'
import {AppError,conflict, unexpected} from '../../shared/errors'
 
export type SignupInput = {email: string; password: string; name?: string}

@Injectable()
export class UsersService {
    constructor(private readonly repo: UsersRepo) {}

    signup(input: SignupInput): TE.TaskEither<AppError,User> {
        return pipe(
            TE.tryCatch(() => this.repo.findByEmail(input.email), (e) => unexpected('lookup failed',e)),
            TE.chain((existing) => existing ? TE.left(conflict('Email already in use')) : TE.right(undefined)),
            TE.chain(() => TE.tryCatch(() => this.repo.create(input), (e) => unexpected('create failed',e)))
        )
    }
}

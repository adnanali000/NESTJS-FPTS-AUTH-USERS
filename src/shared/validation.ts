import * as t from 'io-ts'
import {pipe} from 'fp-ts/function'
import * as E from 'fp-ts/Either'
import {badRequest} from './errors'

export const decode = <A>(codec: t.Type<A,unknown>, input: unknown) => pipe(
    codec.decode(input),
    E.mapLeft((errors) => badRequest('Validation failed', errors.map((e)=> ({context: e.context.map((c) => c.key)}))))
)
export type AppError =
| { _tag: 'BadRequest'; message: string; details?: unknown }
| { _tag: 'Conflict'; message: string }
| { _tag: 'NotFound'; message: string }
| { _tag: 'Unexpected'; message: string; cause?: unknown }


export const badRequest = (message: string, details?: unknown): AppError => ({ _tag: 'BadRequest', message, details })
export const conflict = (message: string): AppError => ({ _tag: 'Conflict', message })
export const notFound = (message: string): AppError => ({ _tag: 'NotFound', message })
export const unexpected = (message: string, cause?: unknown): AppError => ({ _tag: 'Unexpected', message, cause })
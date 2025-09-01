import { Controller, Get } from "@nestjs/common";
import {pipe,E} from "./shared/fp"

@Controller('health')
export class HealthController {
    @Get()
    check(){
        //pretend there is some logic that can fail
        const result = pipe(
            E.right('ok'),
            E.map((msg) => ({status:msg}))
        )
        
        //convert Either -> plain json for nestjs to return
        return E.getOrElseW((err: unknown) => ({status: 'error', error: String(err)}))(result)
    }
}
import { User } from "./users.types";

export class UsersRepo {
    private byId = new Map<string, User>()
    private byEmail = new Map<string,User>()

    async findByEmail(email: string): Promise<User | undefined> {
        return this.byEmail.get(email)
    }

    async create(u: Omit<User,'id'>): Promise<User>{
        const id = crypto.randomUUID()
        const user: User = {id,...u}
        this.byId.set(id,user)
        this.byEmail.set(user.email,user)
        return user
    }
}
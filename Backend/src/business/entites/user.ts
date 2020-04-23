export class User {
    constructor(
        private id: string,
        private name: string,
        private birthdate: Date,
        private email: string,
        private password: string,
        private type: UserType,
        private photo: string
    ){}

    public getId(): string{
        return this.id
    }

    public setId(id: string): void{
        this.id = id
    }
    
    public getName(): string{
        return this.name
    }

    public setName(name: string): void{
        this.name = name
    }

    public getBirthdate(): Date{
        return this.birthdate
    }

    public setBirthdate(birthdate: Date): void{
        this.birthdate = birthdate
    }

    public getEmail(): string{
        return this.email
    }

    public setEmail(email: string): void{
        this.email = email
    }

    public getPassword(): string{
        return this.password
    }

    public setPassword(password: string): void{
        this.password = password
    }

    public getType(): UserType{
        return this.type
    }

    public setType(type: UserType): void{
        this.type = type
    }

    public getPhoto(): string{
        return this.photo;
    }
    public setPhoto(photo: string): void{
        this.photo = photo
    }
}

export enum UserType {
    ADMIN = "ADMIN",
    USER = "USER"
}
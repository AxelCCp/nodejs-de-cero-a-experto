import { JwtAdapter, bcryptAdapter, envs } from "../../config";
import { UserModel } from "../../data";
import { CustomError } from "../../domain";
import { LoginUserDto } from "../../domain/dto/auth/login-user.dto";
import { RegisterUserDto } from "../../domain/dto/auth/register-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { EmailService } from "./email.service";

export class AuthService {

    constructor(private readonly emailService : EmailService, ){}

    public async registerUser(registerUserDto : RegisterUserDto) {

        const existUser = await UserModel.findOne({email : registerUserDto.email});

        if(existUser) throw CustomError.badRequest('Email already exist');

        try {

            const user = new UserModel(registerUserDto);

            //encriptar contraseña
            user.password = bcryptAdapter.hash(registerUserDto.password);
            
            await user.save();

            //jwt

            //email de comfirmacion
            await this.sendEmailValidationLink(user.email!);

            const {password, ...rest} = UserEntity.fromObject(user);

            const token = await JwtAdapter.generateToken({id : user.id, email : user.email});

            if(!token) throw CustomError.internalServer('Error while creating a jwt');

            return {...rest, token: token};

            //return user;

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

    }


    public async loginUser(loginUserDto : LoginUserDto) {
        
        const user = await UserModel.findOne({email : loginUserDto.email});

        if(!user) throw CustomError.badRequest('email or password not exist');
        
        const isMatch = bcryptAdapter.compare(loginUserDto.password, user.password!);

        if(!isMatch) throw CustomError.badRequest('password is not valid');

        const {password, ...rest} = UserEntity.fromObject(user);

        const token = await JwtAdapter.generateToken({id : user.id, email : user.email});

        if(!token) throw CustomError.internalServer('Error while creating a jwt');

        return {
            user: rest,
            token : token
        }

    }


    private sendEmailValidationLink = async(email : string) => {
    
        const token = await JwtAdapter.generateToken({email});

        if(!token) throw CustomError.internalServer('Error getting token');

        const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;

        const html = `
            <h1>Validate your email</h1>
            <p>Click on the following link to validate your email</p>
            <a href="${link}"> Validate your email: ${email} </a>
        `;

        const options = {
            to : email,
            subject : 'validate your email',
            htmlBody : html
        }

        const isSent = await this.emailService.sendEmail(options);

        if(!isSent) throw CustomError.internalServer('Error sending email');

        return true;
    }


    public validateEmail = async(token : string) => {

        const payload = await JwtAdapter.validateToken(token);
        if(!payload) throw CustomError.unAuthorized('Invalid token');

        const {email} = payload as {email : string};
        if(!email) throw CustomError.internalServer('Email not in token');

        const user = await UserModel.findOne({email});
        if(!user) throw CustomError.internalServer('Email not exists');

        user.emailValidated = true;
        await user.save();
        return true;

    }

}




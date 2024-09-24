import { JwtAdapter, bcryptAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError } from "../../domain";
import { LoginUserDto } from "../../domain/dto/auth/login-user.dto";
import { RegisterUserDto } from "../../domain/dto/auth/register-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";

export class AuthService {

    constructor(){}

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

            const {password, ...rest} = UserEntity.fromObject(user);

            return {...rest, token: 'ABC'};

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
}
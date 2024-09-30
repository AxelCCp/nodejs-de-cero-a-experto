import { CategoryModel } from "../../data";
import { CreateCategoryDto, CustomError, PaginationDto, UserEntity } from "../../domain";

export class CategoryService {

    constructor(){}

    async createCategory(createCategoryDto : CreateCategoryDto, user : UserEntity) {
        const categoryExist = await CategoryModel.findOne({name : createCategoryDto.name});
        if(categoryExist) throw CustomError.badRequest('category already exist');
        try {
            const category = new CategoryModel({...createCategoryDto, user : user.id});                 //se desestructura todo lo del createCategoryDto.
            await category.save();
            return {
                id : category.id,
                name : category.name,
                available : category.available,
            }
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    //forma 1
    /*
    async getCategories(paginationDto : PaginationDto) {

        const {page, limit} = paginationDto;

        try {
            const categories = await CategoryModel.find().skip((page - 1) * limit).limit(limit);
            return categories.map(category => {
                return {
                    id : category.id,
                    name : category.name,
                    available : category.available,
                }
            })
        } catch(error) {
            throw CustomError.internalServer('Server internal error');
        }
    }
    */

    //forma 2 - se agregan mas datos al return
    /*
    async getCategories(paginationDto : PaginationDto) {

        const {page, limit} = paginationDto;

        try {
            const total = await CategoryModel.countDocuments();
            const categories = await CategoryModel.find().skip((page - 1) * limit).limit(limit);
            return {
                page : page,
                limit : limit,
                total : total,
                categories : categories.map(category => {
                    return {
                        id : category.id,
                        name : category.name,
                        available : category.available,
                    }
                })
            }
        } catch(error) {
            throw CustomError.internalServer('Server internal error');
        }
    }
    */

    //forma 3 - las 2 peticiones asincronas que tienen el await, se pueden hacer en una sola peticion
    async getCategories(paginationDto : PaginationDto) {

        const {page, limit} = paginationDto;

        try {
            //const total = await CategoryModel.countDocuments();
            //const categories = await CategoryModel.find().skip((page - 1) * limit).limit(limit);
            const [total, categories] = await Promise.all([CategoryModel.countDocuments(), CategoryModel.find().skip((page - 1) * limit).limit(limit)]); 
            return {
                page : page,
                limit : limit,
                total : total,
                next :  `/api/categories?page=${(page + 1)}&limit=${limit}`,
                prev :  (page - 1 > 0) ? `/api/categories?page=${(page - 1)}&limit=${limit}` : null,
                categories : categories.map(category => {
                    return {
                        id : category.id,
                        name : category.name,
                        available : category.available,
                    }
                })
            }
        } catch(error) {
            throw CustomError.internalServer('Server internal error');
        }
    }
}
import { ProductModel } from "../../data";
import { CreateProductDto, CustomError, PaginationDto } from "../../domain";

export class ProductService {

    constructor(){}

    async createProduct(createProductDto : CreateProductDto) {
        const productExist = await ProductModel.findOne({name : createProductDto.name});
        if(productExist) throw CustomError.badRequest('product already exist');
        try {
            const product = new ProductModel(createProductDto);                 
            await product.save();
            return product;
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    

    async getProducts(paginationDto : PaginationDto) {

        const {page, limit} = paginationDto;

        try {
            //const total = await ProductModel.countDocuments();
            //const products = await ProductModel.find().skip((page - 1) * limit).limit(limit);
            const [total, products] = await Promise.all([
                                                            ProductModel.countDocuments(), 
                                                            ProductModel.find()
                                                            .skip((page - 1) * limit)
                                                            .limit(limit)
                                                            //309 - con populate() te traes la info adicional a la respuesta json. La info adicional tmbn se puede configurar. Parte de estas configuraciones se hacen en los models, con los metodos productSchema.set(), userSchema.set(), categorySchema.set().
                                                            .populate('user')
                                                            .populate('category')
                                                        ]); 
            return {
                page : page,
                limit : limit,
                total : total,
                next :  `/api/products?page=${(page + 1)}&limit=${limit}`,
                prev :  (page - 1 > 0) ? `/api/products?page=${(page - 1)}&limit=${limit}` : null,
                products : products,
            }
        } catch(error) {
            throw CustomError.internalServer('Server internal error');
        }
    }
}
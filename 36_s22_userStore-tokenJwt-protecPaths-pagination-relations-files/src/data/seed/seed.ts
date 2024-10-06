import {envs } from '../../config';
import { CategoryModel, MongoDatabase, ProductModel, UserModel } from '../mongo';
import { seedData } from './data';


//310
//esto se configura junto con data.ts, package.json, 

//npm run seed

(async() => {
    await MongoDatabase.connect({
        dbName : envs.MONGO_DB_NAME,
        mongoUrl : envs.MONGO_URL
    })

    await main();

    await MongoDatabase.disconnect();
})();


const randomBetween0AndX = (x : number) => {
    return Math.floor(Math.random() * x);
}


async function main() {

    //borrar todo
    await Promise.all([
        UserModel.deleteMany(),
        CategoryModel.deleteMany(),
        ProductModel.deleteMany()
    ]);

    //crear usuarioa
    const users = await UserModel.insertMany(seedData.users);

    //crear categorias
    const categories = await CategoryModel.insertMany(
        seedData.categories.map(category => {
            return {
                ...category,                                        //se devuelve la categoria el el user, ya q se necesita para la categoria.
                user : users[0]._id
            }
        })
    );

    //crear productos
    const product = await ProductModel.insertMany(
        seedData.products.map(product => {
            return {
                ...product,
                user : users [randomBetween0AndX(seedData.users.length - 1)]._id,
                category : categories [randomBetween0AndX(seedData.categories.length - 1)]._id
            }
        })
    );

    console.log('SEEDED...');
}
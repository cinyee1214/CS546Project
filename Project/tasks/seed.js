const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const users = data.users;
const dishes = data.dishes;
const finishedDishes = data.finishedDishes;
const comments = data.comments;

async function main() {
    console.log("Connected to the database");
    const db = await dbConnection();
    await db.dropDatabase();


    const User1 = await users.addUser("John", "Doe", "JDoe@gmail.com", "XX Str, apt 101, Hoboken, NJ", "808-888-8888", "elementarymydearwatson");

    const User2 = await users.addUser("Peter", "Davis", "Peter@gmail.com", "XX Str, apt 102, Hoboken, NJ", "505-555-5555", "damnyoujackdonaghy");

    const User3 = await users.addUser("Chloe", "Smith", "Chloe@gmail.com", "XX Str, apt 103, Hoboken, NJ", "202-222-2222", "quidditch");


    //dish materials selection
    let vegetable = ['Tomatao', 'Potato', 'Mushroom', 'Eggplant'];
    let meat = ['Beef', 'Pork', 'Chicken'];
    let cookingstyle = ['Stew', 'Fry'];
    let flavor = ['Spicy', 'Mild'];
    let carbohydrate = ['Rice', 'Noodles'];
    let drink = ['Soda', 'Milk'];
    //A total of 64 combinations
    let Dish = new Array(192);
    let index = 0;
    for (let a = 0; a < 4; a++) {
        for (let b = 0; b < 3; b++) {
            for (let c = 0; c < 2; c++) {
                for (let d = 0; d < 2; d++) {
                    for (let e = 0; e < 2; e++) {
                        for (let f = 0; f < 2; f++) {
                            Dish[index] = await dishes.addDish(
                                vegetable[a],
                                meat[b],
                                cookingstyle[c],
                                flavor[d],
                                carbohydrate[e],
                                drink[f],
                                `${cookingstyle[c]}ed ${flavor[d]} ${meat[b]} with ${vegetable[a]}`
                            );
                            index++;
                        }
                    }
                }
            }
        }
    }

    //a new finished dish
    const FinishedDish1 = await finishedDishes.addFinishedDish(
        Dish[1]._id,
        User1._id,
        Dish[1].product,
        Dish[1].carbohydrate,
        Dish[1].drink, ["good"]
    );

    //a new comment
    const Comment1 = await comments.addComment(
        User1._id,
        FinishedDish1._id,
        "Very dilicious"
    );


    console.log('Done seeding database');
    await db.serverConfig.close();

}



main().catch((error) => {
    console.error(error);
    return dbConnection().then((db) => {
        return db.serverConfig.close();
    });
});
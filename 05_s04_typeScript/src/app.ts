//47 -------------------------------------------------------------------------------

import { findHeroById } from "./services/hero.service";

const hero = findHeroById(2);

console.log('hero name: ' + hero?.name ?? 'hero not found!!!');


// -----------------------------------------------------------------------------------


/**
 //45 -------------------------------------------------------------------------------
const heroes = [

    {
        id : 1,
        name : 'ironman',
        owner : 'marvel'
    },
    {
        id : 2,
        name : 'spiderman',
        owner : 'marvel'
    },
    {
        id : 3,
        name : 'batman',
        owner : 'dc'
    }

];

const findHeroById = (id : number) => {
    return heroes.find((hero) => hero.id === id);
}

const hero = findHeroById(2);

console.log('hero: ' + hero);

console.log('hero name: ' + hero?.name ?? 'hero not found!!!');

// -----------------------------------------------------------------------------------
 */





/*  //FRAGMENTO ORIGINAL CON JS -------------------------------------------------------
const heroes = [

    {
        id : 1,
        name : 'ironman',
        owner : 'marvel'
    },
    {
        id : 2,
        name : 'spiderman',
        owner : 'marvel'
    },
    {
        id : 3,
        name : 'batman',
        owner : 'dc'
    }

];

const findHeroById = (id) => {
    return heroes.find((hero) => hero.id === id);
}

const hero = findHeroById(2);

console.log('hero: ' + hero);

console.log('hero name: ' + hero?.name ?? 'hero not found!!!');

// ------------------------------------------------------------------------------------
*/


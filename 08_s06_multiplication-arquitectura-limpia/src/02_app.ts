//76
//argument values 

console.log(process.argv);

//mandando argumentos a node:
/*
npm run build
node dist/app.js --base 10 qkwjhkqhwje werwer
*/

//mandando argumentos a node desde el package.json:
/*
"dev": "ts-node src/app.ts jshdjsd kdfj ksdj", 
*/

//almacenando los argumentos:

//tsnode : archivo q se ejecutó.
//app : archivo q se ejecutó.
//args : los argumentos que vienen de process.argv
const [tsnode, app, ...args] = process.argv;

console.log(args);


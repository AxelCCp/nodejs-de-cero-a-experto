/**
 *  https://www.npmjs.com/package/axios
 */

const axios = require('axios');

const httpClientPlugin = {

    get : async (url) => {

        //fetch
        /*
        const resp = await fetch(url);
        const data = await resp.json();
        return data;

        */

        //axios
        const {data } = await axios.get( url );
        return data;
    },

    post : async (url, body) => {},

    put : async (url, body) => {},

    delete : async (url) => {},

};

module.exports = {
    httpClientPlugin,
}
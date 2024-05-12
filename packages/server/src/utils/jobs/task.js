const axios = require("axios");
const { FetchAllStats } = require(".");

async function fetchStats() {
    try {
        await FetchAllStats();    
    } catch (error) {
        console.error(error);
    } 
}

async function updateFBToken(token) {
    try {
        await GetFacebookAccessToken(token);
        await FetchAllStats();
        console.log('Successfully updated token');
    } catch (error) {
        console.error(error);
    }
}
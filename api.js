const axios = require("axios");
const url = "https://financialmodelingprep.com/api/v3/"
require('dotenv').config()
const key = process.env.API_KEY;

// Data to return
let data = {
    quarterlyEarnings: [], // Gross Profit and revenue
    quarterlySharePrice: [], // Share Price
    quarterlyRatios: [], // All Ratios --> Equity ratio is needed
}

function quartalDates(date) {
    switch(date) {
        case "03-28":
            return "Q1";
            break;
        case "06-27":
            return "Q2";
            break;
        case "09-26":
            return "Q3";
            break;
        case "12-26":
            return "Q4";
            break;
    }
}

let api = {

    getCompanySharePrice: async (company) => {
        console.log("2/6 - Getting enterprise vales")
        await axios.get(`${url}enterprise-values/${company}?period=quarter&limit=100&apikey=${key}`).then(res => {
            data.quarterlySharePrice = res.data;
        })
    },

    getCompanyIncomeStatement: async (company) => {
        console.log("3/6 - Getting key metrics")
        await axios.get(`${url}key-metrics/${company}?period=quarter&limit=100&apikey=${key}`).then(res => {
            data.quarterlyEarnings = res.data;
        })
    },

    getCompanyRatios: async (company) => {
        console.log("4/6 - Getting ratios")
        await axios.get(`${url}ratios/${company}?period=quarter&limit=100&apikey=${key}`).then(res => {
            data.quarterlyRatios = res.data;
        })
    },

    transformData: () => {
        let outputArray = [];

        for(let i = 0; i < data.quarterlySharePrice.length; i++) {
            let outputData = {
                Datum: "",
                PreisProAktie: "",
                UmsatzProAktie: "",
                Gewinn: "",
                EigenkapitalQuote: ""
            }

            outputData.PreisProAktie = data.quarterlySharePrice[i].stockPrice.toFixed(2) + "$";
            outputData.Datum = data.quarterlyEarnings[i].period + " " + data.quarterlySharePrice[i].date.substring(0, 4);
            outputData.UmsatzProAktie = data.quarterlyEarnings[i].revenuePerShare.toFixed(2) + "$";
            outputData.Gewinn = data.quarterlyEarnings[i].netIncomePerShare.toFixed(2) + "$";
            outputData.EigenkapitalQuote = ((1 - data.quarterlyRatios[i].debtRatio) * 100).toString().substring(0, 5) + "%";

            outputArray.push(outputData);
        }

        return outputArray
    }
}

module.exports = api;
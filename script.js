const chalk = require("chalk");
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv
const api = require("./api.js");
const fs = require("fs");
require('dotenv').config()
const ObjectsToCsv = require('objects-to-csv');

// Accepting the CLI arguments (company) for the API Call
if (argv.company) {
    console.log("Selected company: " + chalk.green(argv.company));
} else {
    console.log(chalk.red("Error: No company selected or wrong name \n" + "Make sure to tell me which company I should look for with: --company=COMPANY_NAME"))
}

console.log(chalk.green("Starting Script"));

let csvName = "";

if(argv.fileName) {
    csvName = argv.fileName + ".csv";
} else {
    csvName = argv.company + ".csv";
}

console.log("1/6 - Creating empty CSV file")
fs.writeFile(__dirname + "/reports/" + csvName,"Creating an empty .csv file", (e) => {
    if(e) {
        console.log(e)
    }
})

// THIS IS ART
api.getCompanySharePrice(argv.company).then(() => {
    api.getCompanyIncomeStatement(argv.company).then(() => {
        api.getCompanyRatios(argv.company).then(() => {

            const data = api.transformData();
            if(data.length < 1) {
                console.log(chalk.red("Could not get data from API, the company does not exist. Look at the symbols table from the repository to see which companies are available."))
            } else {
                const csv = new ObjectsToCsv(data)

                async function generateCSV() {
                    console.log("5/6 - Parsing data to csv file")
                    await csv.toDisk(__dirname + "/reports/" + csvName);
                    console.log("6/6 - Script completed")
                }

                generateCSV();
            }


        })
    })
})









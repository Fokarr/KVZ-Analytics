# KVZ-Analytics

KVZ is a script which gives you detailed financial data of a company up to the last 30 years and converts the data into a readable CSV file.

KVZ currently supports:

| Index | Financial Metrics |
| ----------- | ----------- |
| 1 | Date (Year and Quarter |
| 2 | Price per share |
| 3 | Revenue per share |
| 4 | Gross profit per share |
| 5 | equity ratio |

## Setup

```
git clone REPOSITORY
npm install
node script.js --company=AALP --fileName=apple-example  
```

**--company** required 
**--fileName** optional

The script is generating your csv file into the reports folder.


## Symbols

| Symbol | Company |
| ----------- | ----------- |
| AAPL | Apple |
| MSFT | Microsoft |
| GOOG | Alphabet Class C |
| TSLA | Tesla |
| FB | Facebook |

For more symbols, look here: https://www.nasdaq.com/market-activity/stocks/screener

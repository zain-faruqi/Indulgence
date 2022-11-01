// ALGORITHM THAT SORTS A USER'S API OBJECT TRANSACTIONS INTO SINS
const { response } = require('express');
const { lust, gluttony, greed, envy, pride, sloth, wrath, not_sin } = require('./sins.js');

// ex API_obj
const ex = {
    "accounts": [{Object}],
    "transactions": [{
       "account_id": "vokyE5Rn6vHKqDLRXEn5fne7LwbKPLIXGK98d",
       "amount": 2307.21,
       "iso_currency_code": "GBP",
       "unofficial_currency_code": null,
       "category": [
         "Shops",
         "Computers and Electronics"
       ],
       "category_id": "19013000",
       "date": "2017-01-03",
       "authorized_date": "2017-01-27",
       "location": {
        "address": "null",
        "city": "null",
        "region": "null",
        "postal_code": "null",
        "country": "null",
        "lat": null,
        "lon": null,
        "store_number": "1235"
       },
       "name": "Apple Store",
       "payment_meta": Object,
       "payment_channel": "in store",
       "pending": false,
       "pending_transaction_id": null,
       "account_owner": null,
       "transaction_id": "lPNjeW1nR6CDn5okmGQ6hEpMo4lLNoSrzqDje",
       "transaction_code": null,
       "transaction_type": "place"
      }, {
       "account_id": "XA96y1wW3xS7wKyEdbRzFkpZov6x1ohxMXwep",
       "amount": 78.5,
       "iso_currency_code": "GBP",
       "unofficial_currency_code": null,
       "category": [
         "Food and Drink",
         "Restaurants"
       ],
       "category_id": "13005000",
       "date": "2017-01-29",
       "authorized_date": "2017-01-28",
       "location": {
         "address": "null",
         "city": "null",
         "region": "null",
         "postal_code": "null",
         "country": "null",
         "lat": null,
         "lon": null,
         "store_number": "null"
       },
       "name": "Pret A Manger",
       "payment_meta": Object,
       "payment_channel": "in store",
       "pending": false,
       "pending_transaction_id": null,
       "account_owner": null,
       "transaction_id": "4WPD9vV5A1cogJwyQ5kVFB3vPEmpXPS3qvjXQ",
       "transaction_code": null,
       "transaction_type": "place"
     }],
     "item": {Object},
     "total_transactions": Number,
     "request_id": "45QSn"
   }

function arbiter(API_obj) {
    let res = {
        'sin': '',
        'greed_score': 0,
        'lust_score': 0,
        'pride_score': 0,
        'sloth_score': 0,
        'wrath_score': 0,
        'envy_score': 0,
        'gluttony_score': 0
    };

    // iterate through each purchase obj
    for (let x = 0; x < API_obj.transactions.length; x++ ) {
        let purchase = API_obj.transactions[x];
        let id = purchase.category_id;
        if (id in lust) { res.lust_score += 1 };
        if (id in greed) { res.greed_score += 1 };
        if (id in pride) { res.pride_score += 1 };
        if (id in sloth) { res.sloth_score += 1 };
        if (id in wrath) { res.wrath_score += 1 };
        if (id in envy) { res.envy_score += 1 };
        if (id in gluttony) { res.gluttony_score += 1 };
    }

    res.sin = Math.max(res.greed_score, res.lust_score, 
                        res.pride_score, res.sloth_score, 
                        res.wrath_score, res.envy_score, 
                        res.gluttony_score
                    );
    return res;
}

console.log(arbiter(ex));
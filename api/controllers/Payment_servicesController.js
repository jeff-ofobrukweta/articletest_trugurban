/**
 * Payment_servicesController
 *
 * @description :: Server-side logic for managing payment_services
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var paystack = require('paystack')('sk_live_ce43805c577ecf01e6ee5c3f88056ff6eff1af23');
module.exports = {
    listcustomers(req,res){
        paystack.transaction.list({perPage: 20})
	.then(function(body) {
		// console.log(body);
		// console.log("this is the body-part"+JSON.stringify(body.data[0].gateway_response,null,2));
	}).catch((err)=> {
        console.log(err)
    });

  },
  payingcustomers(req,res){
  const show = req.body.show
  const collect1 = req.body
  console.log(">>>>>//>>>"+req.body)
        // if(show.length=0){
        //   console.log('no show')
        // }
        //checking if a user has paid for a language before creating a trans
        //step1:find the user logged in
        User.findOne({
          email:collect1.email
        }).exec(function (err, founduser){
          if (err) {
            const resp = Object.keys((err.invalidAttributes)).join(',');
            res.json({"message":"there is error in parameter passed in"}); 
          }
          if (!founduser) {
            return res.json('Could not find user session now or check the email field , sorry.');
          }
          //this part store the user session
           req.session.founduserId = founduser;
          //  console.log("here >>>?"+JSON.stringify(req.session.founduserId,null,2))
          //  console.log("the end of world")
           //get the sessioned user id and find the correspondind id via payment in Paymode schema
           Paymentmode.find({payment:req.session.founduserId.id,Language:req.body.language}).exec(function (err, usersNamedFinn){
            //check if the payment exist in the user-payment shema
            if(Object.keys(usersNamedFinn).length>=1){
              return res.json('transaction was already made earlier')
            }
            //if it exists 
            else{
              //find the user paying through email
                //add the transaction schema to the User schema
                User.findOne({email:collect1.email}).then((result) => { 
                  //this part checks if the sessioned user has paid
                  const sd = Paymentmode.create({transactionRefrence:collect1.show,Language:collect1.language});
                  return Promise.all([sd,result]);
                }).then((result) => { 
                paystack.transaction.verify(collect1.show)
                .then(function(error, body) {
                 res.json(error.data.status,null,2);
              //  console.log("this is the point of reconning"+show)
                    return Promise.all([error,show])
                }).then((reponses)=>{
                    res.json(reponses,null,2)
                });
                  //  console.log("this is the part i need to check"+JSON.stringify(result,null,2))
                  result[1].languageTransactions.add(result[0].id);
                  result[1].save().then(()=>{});
                  res.json('transaction creation sucessful')
                }).catch((err) => {
                  const resp = Object.keys((err.invalidAttributes)).join(',');
                  res.json({"message":"there is error in parameter passed in"}); 
              });
            }
            if (err) {
              // return res.serverError(err);
              const resp = Object.keys((err.invalidAttributes)).join(',');
              res.json({"message":"there is error in parameter passed in"}); 
            }
          });
          return res.json(founduser);
        });
    },
    transactioninit(){
      paystack.transaction.initialize({
        "reference": "Di9vX8MEk85usKEpVDtD",
        "amount": 1000000,
        "email": "oghenerukevwejeff@gmail.com",
        "plan": null
      }, function(err, body) {
        console.log(body);
      });
      
      paystack.transaction.verify("222222222", function(err, body) {
        console.log(body);
      });
    },
    createpaymentToken(req, res) {
      //when  a user ask/demands for a token that is when the transaction-model is added to the user-schema
      const message="please use the given token for transaction"
      const tokenPaystack = Math.floor(Math.random() * 6) + 1 + 2000 + Math.random();
      
      return res.json({tokenPaystack,message})
    },
    Paymentoflanguages(req, res) {
      const transactionRefrence = req.body.transactionRefrence
      const Language = req.body.Language
      Paymentmode.create({transactionRefrence,Language}).then((transactions) => {
        res.json(200, {transactions});
    }).catch((err) => {
     const resp = Object.keys((err.invalidAttributes)).join(',');
     res.json({"message":"the field"+" "+resp+" "+"is unclear or the field exist already!!","message2":"error"}); 
    });
    },

    ViewuserwithPayment(req, res) {
      User.find().populate('languageTransactions').then((videos) => {
         // sails.log(videos)
          // console.log(sails.hooks.http.app);    
          return res.json(videos);
      })
  },

  initialisetransactAccess(req, res) { 
      const email=req.body.email;
      // view all users and their transactions for all individual users
      User.find({email:email}).populate('languageTransactions').then((users) => {
        sails.log(users)
        // console.log(sails.hooks.http.app);    
        return res.json(users);
      })
  },

  listingcustormer(req,res){
    var paystack = require('paystack')('sk_test_cfe746c8ad3887628323dafd09041f0bee704f46');
  
    paystack.transaction.verify("0.9243191383796863", function(err, body) {
      console.log(">>>>>>>>>>>>>>>>>>///>>>>"+JSON.stringify(body.data,null,2));
    });
  }
};








//mailgun test credentials
// key-93d6716947451ad87507355e4dad1981
// sandbox1dfeb5e2670d426dab73efb63e695acb.mailgun.org



/*this is the body-part{
  "status": true,
  "message": "Transactions retrieved",
  "data": [
    {
      "id": 13867405,
      "domain": "test",
      "status": "abandoned",
      "reference": "000000",
      "amount": 10000,
      "message": null,
      "gateway_response": "The transaction was not completed",
      "paid_at": null,
      "created_at": "2018-02-08T18:38:59.000Z",
      "channel": "card",
      "currency": "NGN",
      "ip_address": "169.159.122.119",
      "metadata": {
        "custom_fields": [
          {
            "display_name": "Mobile Number",
            "variable_name": "mobile_number",
            "value": "+2348012345678"
          }
        ],
        "referrer": "http://localhost:1337/pay"
      },
      "log": {
        "time_spent": 26,
        "attempts": 0,
        "authentication": null,
        "errors": 0,
        "success": false,
        "mobile": false,
        "input": [],
        "channel": "bank",
        "history": [
          {
            "type": "open",
            "message": "Opened payment page",
            "time": 26
          }
        ]
      },
      "fees": null,
      "fees_split": null,
      "customer": {
        "id": 1396803,
        "first_name": "",
        "last_name": "",
        "email": "oghenerukevwejeff@gmail.com",
        "customer_code": "CUS_4aah3zr3bskk8l5",
        "phone": "",
        "metadata": null,
        "risk_action": "default"
      },
      "authorization": {},
      "plan": {},
      "subaccount": {},
      "paidAt": null,
      "createdAt": "2018-02-08T18:38:59.000Z"
    },
    {
      "id": 13861397,
      "domain": "test",
      "status": "success",
      "reference": "123456",
      "amount": 10000,
      "message": null,
      "gateway_response": "Successful",
      "paid_at": "2018-02-08T18:37:21.000Z",
      "created_at": "2018-02-08T17:29:26.000Z",
      "channel": "card",
      "currency": "NGN",
      "ip_address": "169.159.122.119",
      "metadata": {
        "custom_fields": [
          {
            "display_name": "Mobile Number",
            "variable_name": "mobile_number",
            "value": "+2348012345678"
          }
        ],
        "referrer": "http://localhost:1337/pay"
      },
      "log": {
        "time_spent": 29,
        "attempts": 1,
        "authentication": null,
        "errors": 0,
        "success": true,
        "mobile": false,
        "input": [],
        "channel": null,
        "history": [
          {
            "type": "input",
            "message": "Filled these fields: card number, card expiry, card cvv",
            "time": 26
          },
          {
            "type": "action",
            "message": "Attempted to pay",
            "time": 26
          },
          {
            "type": "success",
            "message": "Successfully paid",
            "time": 28
          },
          {
            "type": "close",
            "message": "Page closed",
            "time": 29
          }
        ]
      },
      "fees": 150,
      "fees_split": null,
      "customer": {
        "id": 1396803,
        "first_name": "",
        "last_name": "",
        "email": "oghenerukevwejeff@gmail.com",
        "customer_code": "CUS_4aah3zr3bskk8l5",
        "phone": "",
        "metadata": null,
        "risk_action": "default"
      },
      "authorization": {
        "authorization_code": "AUTH_knpzxwz6cv",
        "bin": "408408",
        "last4": "4081",
        "exp_month": "01",
        "exp_year": "2020",
        "channel": "card",
        "card_type": "visa DEBIT",
        "bank": "Test Bank",
        "country_code": "NG",
        "brand": "visa",
        "reusable": true,
        "signature": "SIG_LCVU3cE29EuH0VL49ks2"
      },
      "plan": {},
      "subaccount": {},
      "paidAt": "2018-02-08T18:37:21.000Z",
      "createdAt": "2018-02-08T17:29:26.000Z"
    },
    {
      "id": 13861032,
      "domain": "test",
      "status": "success",
      "reference": "12345",
      "amount": 10000,
      "message": null,
      "gateway_response": "Successful",
      "paid_at": "2018-02-08T17:23:51.000Z",
      "created_at": "2018-02-08T17:22:26.000Z",
      "channel": "card",
      "currency": "NGN",
      "ip_address": "41.78.174.77",
      "metadata": {
        "custom_fields": [
          {
            "display_name": "Mobile Number",
            "variable_name": "mobile_number",
            "value": "+2348012345678"
          }
        ],
        "referrer": "http://localhost:1337/pay"
      },
      "log": {
        "time_spent": 85,
        "attempts": 1,
        "authentication": null,
        "errors": 0,
        "success": true,
        "mobile": false,
        "input": [],
        "channel": null,
        "history": [
          {
            "type": "input",
            "message": "Filled these fields: card number, card expiry, card cvv",
            "time": 82
          },
          {
            "type": "action",
            "message": "Attempted to pay",
            "time": 82
          },
          {
            "type": "success",
            "message": "Successfully paid",
            "time": 84
          },
          {
            "type": "close",
            "message": "Page closed",
            "time": 85
          }
        ]
      },
      "fees": 150,
      "fees_split": null,
      "customer": {
        "id": 1396803,
        "first_name": "",
        "last_name": "",
        "email": "oghenerukevwejeff@gmail.com",
        "customer_code": "CUS_4aah3zr3bskk8l5",
        "phone": "",
        "metadata": null,
        "risk_action": "default"
      },
      "authorization": {
        "authorization_code": "AUTH_x70lyhqjhh",
        "bin": "408408",
        "last4": "4081",
        "exp_month": "01",
        "exp_year": "2020",
        "channel": "card",
        "card_type": "visa DEBIT",
        "bank": "Test Bank",
        "country_code": "NG",
        "brand": "visa",
        "reusable": true,
        "signature": "SIG_LCVU3cE29EuH0VL49ks2"
      },
      "plan": {},
      "subaccount": {},
      "paidAt": "2018-02-08T17:23:51.000Z",
      "createdAt": "2018-02-08T17:22:26.000Z"
    },
    {
      "id": 11044923,
      "domain": "test",
      "status": "abandoned",
      "reference": "Bx0nePDrsPQ6e4x",
      "amount": 10000,
      "message": null,
      "gateway_response": "The transaction was not completed",
      "paid_at": null,
      "created_at": "2018-01-15T07:08:35.000Z",
      "channel": "card",
      "currency": "NGN",
      "ip_address": "160.152.27.196",
      "metadata": {
        "referrer": "http://localhost:3000/"
      },
      "log": {
        "time_spent": 9,
        "attempts": 0,
        "authentication": null,
        "errors": 0,
        "success": false,
        "mobile": false,
        "input": [],
        "channel": "bank",
        "history": [
          {
            "type": "open",
            "message": "Opened payment page",
            "time": 3
          },
          {
            "type": "close",
            "message": "Page closed",
            "time": 9
          }
        ]
      },
      "fees": null,
      "fees_split": null,
      "customer": {
        "id": 1396803,
        "first_name": "",
        "last_name": "",
        "email": "oghenerukevwejeff@gmail.com",
        "customer_code": "CUS_4aah3zr3bskk8l5",
        "phone": "",
        "metadata": null,
        "risk_action": "default"
      },
      "authorization": {},
      "plan": {},
      "subaccount": {},
      "paidAt": null,
      "createdAt": "2018-01-15T07:08:35.000Z"
    },
    {
      "id": 11013242,
      "domain": "test",
      "status": "abandoned",
      "reference": "D=ec3nTh0Wg22MZ",
      "amount": 10000,
      "message": null,
      "gateway_response": "The transaction was not completed",
      "paid_at": null,
      "created_at": "2018-01-14T21:56:34.000Z",
      "channel": "card",
      "currency": "NGN",
      "ip_address": "160.152.27.196",
      "metadata": {
        "referrer": "http://localhost:3000/"
      },
      "log": {
        "time_spent": 7,
        "attempts": 0,
        "authentication": null,
        "errors": 0,
        "success": false,
        "mobile": false,
        "input": [],
        "channel": null,
        "history": [
          {
            "type": "close",
            "message": "Page closed",
            "time": 7
          }
        ]
      },
      "fees": null,
      "fees_split": null,
      "customer": {
        "id": 1396803,
        "first_name": "",
        "last_name": "",
        "email": "oghenerukevwejeff@gmail.com",
        "customer_code": "CUS_4aah3zr3bskk8l5",
        "phone": "",
        "metadata": null,
        "risk_action": "default"
      },
      "authorization": {},
      "plan": {},
      "subaccount": {},
      "paidAt": null,
      "createdAt": "2018-01-14T21:56:34.000Z"
    },
    {
      "id": 11012691,
      "domain": "test",
      "status": "abandoned",
      "reference": "Av6hqztXmXcCQii",
      "amount": 10000,
      "message": null,
      "gateway_response": "The transaction was not completed",
      "paid_at": null,
      "created_at": "2018-01-14T21:50:05.000Z",
      "channel": "card",
      "currency": "NGN",
      "ip_address": "160.152.27.196",
      "metadata": {
        "referrer": "http://localhost:3000/"
      },
      "log": {
        "time_spent": 3,
        "attempts": 0,
        "authentication": null,
        "errors": 0,
        "success": false,
        "mobile": false,
        "input": [],
        "channel": null,
        "history": [
          {
            "type": "close",
            "message": "Page closed",
            "time": 3
          }
        ]
      },
      "fees": null,
      "fees_split": null,
      "customer": {
        "id": 1396803,
        "first_name": "",
        "last_name": "",
        "email": "oghenerukevwejeff@gmail.com",
        "customer_code": "CUS_4aah3zr3bskk8l5",
        "phone": "",
        "metadata": null,
        "risk_action": "default"
      },
      "authorization": {},
      "plan": {},
      "subaccount": {},
      "paidAt": null,
      "createdAt": "2018-01-14T21:50:05.000Z"
    },
    {
      "id": 11001183,
      "domain": "test",
      "status": "abandoned",
      "reference": "2IzXCb6q0WtrVGL",
      "amount": 10000,
      "message": null,
      "gateway_response": "The transaction was not completed",
      "paid_at": null,
      "created_at": "2018-01-14T17:09:46.000Z",
      "channel": "card",
      "currency": "NGN",
      "ip_address": "160.152.27.196",
      "metadata": {
        "referrer": "http://localhost:3000/"
      },
      "log": {
        "time_spent": 209,
        "attempts": 1,
        "authentication": null,
        "errors": 0,
        "success": false,
        "mobile": false,
        "input": [],
        "channel": "bank",
        "history": [
          {
            "type": "action",
            "message": "Attempted to pay",
            "time": 67
          },
          {
            "type": "action",
            "message": "Switched payment type to: bank",
            "time": 93
          },
          {
            "type": "close",
            "message": "Page closed",
            "time": 209
          }
        ]
      },
      "fees": null,
      "fees_split": null,
      "customer": {
        "id": 1396803,
        "first_name": "",
        "last_name": "",
        "email": "oghenerukevwejeff@gmail.com",
        "customer_code": "CUS_4aah3zr3bskk8l5",
        "phone": "",
        "metadata": null,
        "risk_action": "default"
      },
      "authorization": {},
      "plan": {},
      "subaccount": {},
      "paidAt": null,
      "createdAt": "2018-01-14T17:09:46.000Z"
    },
    {
      "id": 10305859,
      "domain": "test",
      "status": "abandoned",
      "reference": "6019",
      "amount": 5000000,
      "message": null,
      "gateway_response": "The transaction was not completed",
      "paid_at": null,
      "created_at": "2018-01-05T22:22:34.000Z",
      "channel": "card",
      "currency": "NGN",
      "ip_address": "105.112.22.47",
      "metadata": {
        "custom_fields": [
          {}
        ],
        "referrer": "http://localhost:1337/"
      },
      "log": {
        "time_spent": 463,
        "attempts": 0,
        "authentication": null,
        "errors": 0,
        "success": false,
        "mobile": false,
        "input": [],
        "channel": null,
        "history": [
          {
            "type": "close",
            "message": "Page closed",
            "time": 463
          }
        ]
      },
      "fees": null,
      "fees_split": null,
      "customer": {
        "id": 1349031,
        "first_name": "",
        "last_name": "",
        "email": "customer@email.com",
        "customer_code": "CUS_bfswwahzqodlu3z",
        "phone": "",
        "metadata": null,
        "risk_action": "default"
      },
      "authorization": {},
      "plan": {},
      "subaccount": {},
      "paidAt": null,
      "createdAt": "2018-01-05T22:22:34.000Z"
    }
  ],
  "meta": {
    "total": 8,
    "total_volume": 20000,
    "skipped": 0,
    "perPage": "20",
    "page": 1,
    "pageCount": 1
  }
}

info:
*/


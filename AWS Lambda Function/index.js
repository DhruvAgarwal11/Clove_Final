const Stripe = require('stripe');
const stripe = Stripe('sk_test_51LV1ErJLT225WxyG5cIBLIc7r8BYQ6mjA19uWLDbZVPVt8U6ZtsVsZCe94Dgm3Lfhhe0GsauYc35WGnb77okNv0H00gyEYG5US'); //stripe secret test key
//Lambda function

exports.handler = async function(event, context, callback){

  var emailAddress = '';
  var donationAmount = 0;
  if (event.hasOwnProperty('queryStringParameters') && event.queryStringParameters != null && event.queryStringParameters.hasOwnProperty('email')){
    emailAddress = event.queryStringParameters.email;
    donationAmount = event.queryStringParameters.donationAmount;
  }
  
  if(emailAddress != ''){
    
    //find the customer
    var customer = await stripe.customers.list({
        email: emailAddress
    });
    
    //if the customer doesn't exist create them
    if (customer.data.length == 0){
      customer = await stripe.customers.create({
        email: emailAddress
      });
    }
    //otherwise find the current customer
    else{
      customer = customer.data[0];
    }
    var customerStripeId = customer.id;
    const subscriptions = await stripe.subscriptions.list({
      customer: customerStripeId,
    });
    if (subscriptions.data.length > 0){
      const usageRecord = await stripe.subscriptionItems.createUsageRecord(
        subscriptions.data[0].items.data[0].id,
        {quantity: donationAmount, timestamp: Math.floor(Date.now() / 1000)}
      );
      const response = {
        statusCode: 200,
        body: JSON.stringify(usageRecord)
      };
    }
    else{
      const response = {
        statusCode: 200,
        body: JSON.stringify(customerStripeId)
      };
      return response;
    }
    

    //Creating subscription for a customer
    //const subscription = await stripe.subscriptions.create({
    //  customer: customerStripeId,
    //  items: [
    //    {price: 'price_1LUQDBRFMftfGVcRQdu59S2j'}, //change here for one-time-fee or subscription...
    //  ],
    //});

    // callback(null, {
    //   statusCode: 200,
    //   body: JSON.stringify(message),
    //   headers: {'Content-Type': 'application/json'}
    // });
    // return customerStripeId;
    const response = {
      statusCode: 200,
      body: JSON.stringify("Error")
    };
    return response;
  

  }else{
    const response2 = {
      statusCode: 200,
      body: JSON.stringify('missing params'),
    };
    return response2;
  }

};

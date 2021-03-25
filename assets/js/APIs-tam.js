
// curl -d "grant_type=client_credentials&client_id={CLIENT-ID}&client_secret={CLIENT-SECRET}"
//               https://api.petfinder.com/v2/oauth2/token
// curl -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}" GET 
//               https://api.petfinder.com/v2/{CATEGORY}/{ACTION}?{parameter_1}={value_1}&{parameter_2}={value_2};

// var adoptAPetAPIKEY = "uX6OHJkjYlNy9eLD9RKw6iJ5LB08IAWqgeGrkz7KMq56QX3QOU";
// var adoptAPetSECRET = "ofgHmo9uEQRltYORcc6MZ1frZdJXJzY7Y8hcrMXj";
// var positionStackAPIKEY = "cbfda538c5445110ea0ae5fb6a27ebb4";

var form = new FormData();

var token = "";

form.append('grant_type', 'client_credentials');
form.append('client_id', 'uX6OHJkjYlNy9eLD9RKw6iJ5LB08IAWqgeGrkz7KMq56QX3QOU');
form.append('client_secret', 'ofgHmo9uEQRltYORcc6MZ1frZdJXJzY7Y8hcrMXj');


//when ever u search for a pet, we general a new token
fetch('https://api.petfinder.com/v2/oauth2/token', {
    method: 'POST',
    body: form,
}).then(response => {
    return response.json()
}).then(data => {
    token = data.access_token;
    
    //after getting token, we make the call request
    console.log(token)
    getData();
    
}).catch(error => {
    console.error(error);
})


// the option 
var value = 'dog'         //cat  
var parameter = 'type'   // page 123 ,  
var ACTION = '?'
var CATEGORY = 'animals'
// + &{parameter_2}={value_2}

var url = `https://api.petfinder.com/v2/${CATEGORY}${ACTION}${parameter}=${value}&page=2`

function getData() {

    $.ajax({
        url: "https://api.petfinder.com/v2/animals?type=dog&page=2",
        dataType: 'json',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        success: function (data) {
            console.log(data)
            return data
        // getting data, do like normal
            
        },
        error: function (error) {
            console.log(error)
        }
    })
} 



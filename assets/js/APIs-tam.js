
// curl -d "grant_type=client_credentials&client_id={CLIENT-ID}&client_secret={CLIENT-SECRET}"
//               https://api.petfinder.com/v2/oauth2/token
// curl -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}"
//               https://api.petfinder.com/v2/{CATEGORY}/{ACTION}?{parameter_1}={value_1}&{parameter_2}={value_2};


// This is a information should appear in the Petfinder credit file

/* openapi: 3.0.2
info:
  title: Petfinder API
  description: |
    The Petfinder API allows you to access the Petfinder database of hundreds
    of thousands of pets ready for adoption and over ten thousand animal
    welfare organizations.
  termsOfService: 'https://www.petfinder.com/api-terms-of-service/'
  contact:
    name: Petfinder API Help
    url: 'https://www.petfinder.com/developers/support/'
    email: help@petfinder.com
  version: 1.0.0
servers:
  - url: 'https://api.petfinder.com/v2'
externalDocs:
  description: Petfinder API Documentation
  url: 'https://www.petfinder.com/developers/v2/docs/'
*/



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
    // make request here
    getData();
    
}).catch(error => {
    console.error(error);
})


// the option   
var value = 'dog'        // can be : what ever fit with parameter, they also have other pet like rabbit, bird ...



var parameter = 'type'   // can be : Id, type, breed, size, gender, location, distance, before, after, sort, page, limit
                         // age, color, coat, status, name, organization, good_with_children, state, country
                         // good_with_dogs, good_with_cats, house_trained, declawed, special_needs	
var ACTION = '?'
var CATEGORY = 'animals'

var url = `https://api.petfinder.com/v2/${CATEGORY}${ACTION}${parameter}=${value}`  //can add more parameter, value by  &{parameter_2}={value_2}

function getData() {

    $.ajax({
        url: "https://api.petfinder.com/v2/animals?type=dog&page=2",    // this url is just example the real one is line 45
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



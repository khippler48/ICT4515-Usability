/* Kate Hippler
   ICT 4510 - Advanced Website Design & Management
   Winter Quarter 2023
   March 9, 2023

   The following JavaScript code uses a fetch to send login information from our HTML login 
   form then checks to makes sure the input is correct. A new request function is created
   that communicates to the login API using the 'POST' method. 
   
   While the API is authenticating the users credenticals, an alert appears to let the user
   know the webpage is thinking. If their credentials are correct, the API will send back
   a response of 200. This will trigger the program to remove the alert, and return the
   user object. It will then remove the form and headings from the page and replace
   it will display "Welcome {first_name}" then redirect the user to the admin dashboard.
   
   If the response is not 200, the user will receive an error alert letting them know
   that either their username or password are incorrect and to try again and the form
   will reset itself.
   */

   'use strict';

   let login = (function () {
   
    'use strict';

    let URL = 'https://ict4510.herokuapp.com/api/login';
    
    let obj = {};

    

    let authenticate = function () {

        document.querySelector('#alert').innerHTML = '<div class="alert alert-info">Hold tight! We are checking username and password.</div>';

        let User = {
            username: document.querySelector('#username').value.trim(),
            password: document.querySelector('#password').value.trim()
        };

        let request = new Request(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(User),
            mode: 'cors'
        });

        fetch(request)
            .then(function(response) {

                if (response.status === 200) {
                    document.querySelector('#alert').style.display = 'none'
                    console.log(response);
                    return response.json();
                    

                } else {
                    document.querySelector('#alert').innerHTML = '<div class="alert alert-danger">Oops! Looks like your username or password are incorrect.</div>';
                    // clear form fields
                    document.querySelector('#form').reset();
                    return false;
                }
            })
            .then(function (json) {

                if (json !== false) {
                    console.log(json);
                    // hides login form and subheading from view 
                    document.querySelector('#subhead').style.display = 'none';
                    document.querySelector('#form').style.display = 'none';
                    document.querySelector('#signin').style.display = 'none';

                    //saves user obect to sessionStorage 
                    window.sessionStorage.setItem('user', JSON.stringify(json));
                    //converts json string to an object 
                    JSON.parse(window.sessionStorage.getItem('user'));
                    console.log(json.user.first_name);

                    // creates a new string with first name from sessionStorage object 
                    let string = 'Welcome ' + json.user.first_name + '!';

                    // replaces existing h1 inner HTML with a new message welcoming the user 
                    document.querySelector('#adminTitle').innerHTML = string;

                    // shows full menu and form to add menu items 
                    setTimeout(function() {
                        window.location.href = '../pages/adminDashboard.html';
                    }, 50);


                    

                } else {
                 return false;
                }
            });

    };

    

    obj.init = function () {
        
        /* assigns a click event to the login button and stops browser from automatically refreshing*/
        document.querySelector('#submit').addEventListener('click', function(e) {
            e.preventDefault();
            authenticate();
        });



    };
    

    return obj;

}());

// init function attached onclick event handler to login button when the page loads
login.init();
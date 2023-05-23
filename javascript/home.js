


    let searchBar = function () {
   
        'use strict';
        
        //swaps out icon for the search field when user clicks
        
        document.querySelector('#search').innerHTML = '<form class="d-flex"><input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"><button class="btn btn-outline-light" type="submit">Search</button></form>';
    
        //swaps out icon for the search field when user clicks
        setTimeout(function () {
            document.querySelector('#message').innerHTML = '';
        }, 500);
    
    };

       
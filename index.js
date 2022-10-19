function wantItalian()
{
    fetch("Italian.json")
    .then(function(response){
        return response.json();
    })
    .then(function(italian){
        let placeholder = document.querySelector("#data-output")
        let output = "";

        for(let place of italian){
            output += ` 
            <div>
                <div class = "card">                                       
                    <img class = "cardimage" src="${place.cardimage}">
                    <h2>${place.restuarant}</h2>
                    <h3>${place.details}</h3>
                    
                    <button id = "check resturant">View Details</button>
                </div>
            </div>
            `;
            }
        placeholder.innerHTML = output;
        })
}

function wantSteak()
{
    fetch("steakhouses.json")
    .then(function(response){
        return response.json();
    })
    .then(function(steakhouses){
        let placeholder = document.querySelector("#data-output")
        let output = "";

        for(let place of steakhouses){
            output += ` 
            <div>
                <div class = "card">                                       
                    <img class = "cardimage" src="${place.cardimage}">
                    <h2>${place.restuarant}</h2>
                    <h3>${place.details}</h3>
                    
                    <button id = "check resturant">View Details</button>
                </div>
            </div>
            `;
            }
        placeholder.innerHTML = output;
        })
}
function wantSushi()
{
    fetch("sushi.json")
    .then(function(response){
        return response.json();
    })
    .then(function(sushi){
        let placeholder = document.querySelector("#data-output")
        let output = "";

        for(let place of sushi){
            output += ` 
            <div>
                <div class = "card">                                       
                    <img class = "cardimage" src="${place.cardimage}">
                    <h2>${place.restuarant}</h2>
                    <h3>${place.details}</h3>
                    
                    <button id = "check resturant">View Details</button>
                </div>
            </div>
            `;
            }
        placeholder.innerHTML = output;
        })
}
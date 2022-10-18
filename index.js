
function wantPizza()
{
    fetch("pizza.json")
    .then(function(response){
        return response.json();
    })
    .then(function(pizza){
        let placeholder = document.querySelector("#data-output")
        let output = "";

        for(let place of pizza){
            output += ` 
            <div>
                <div class = "card">                                       
                    <img class = "cardimage" src="${place.cardimage}">
                    <h2>${place.restuarant}</h2>
                    <h3>${place.details}</h3>
                    <p>${place.specialties}</p>
                    <button id = "check resturant">View Details</button>
                </div>
            </div>
            `;
            }
        placeholder.innerHTML = output;
        })
}

function wantItalian()
{
    fetch("italian.json")
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
                    <p>${place.specialties}</p>
                    <button id = "check resturant">View Details</button>
                </div>
            </div>
            `;
            }
        placeholder.innerHTML = output;
        })
}
function wantAsian()
{
    
}



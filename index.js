async function findFood(selectedValue)
{
    let data = await fetch("Options_JsonFiles/"+selectedValue+".json")
    let foodChoice = await data.json();

    console.log(foodChoice)

    let placeholder = document.querySelector("#data-output")
    let output = "";

    for(let place of foodChoice){
        output += ` 
        <div>
            <div class = "card">                                       
                <img class = "card-image" src="${place.cardimage}">
                <h2>${place.title}</h2>
                <h3>${place.details}</h3>
                <button class = "card-button" onclick="window.location.href='${place.link}';">Visit ${place.title}</button>
            </div>
        </div>
        `;
        }
    placeholder.innerHTML = output;
    
}
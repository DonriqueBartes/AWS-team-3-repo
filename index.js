async function findFood(selectedValue)
{
        let data = await fetch(`./files/${selectedValue}.json`);
        let foodChoice = await data.json();
        let foodHolder = document.querySelector("#data-output");
        let output = "";
        
        for(let place of foodChoice){
            output += ` 
            <div id ="content-open">
                <div class = "card">                                       
                    <img class = "card-image" src="${place.cardimage}">
                    <h2 style ="font-weight: bold;">${place.title}</h2>
                    <div class ="card-description">${place.details}</div>
                    <div class = "card-button-container">
                        <button class ="card-button" onclick="window.location.href='${place.link}';">Visit ${place.title}</button>
                        <button class ="card-button" id="${place.location}" onClick="reply_click(this.id)" data-toggle="modal" data-target="#myModal">Map</button>
                    </div>
                </div>
            </div>
            `;
            }
        foodHolder.innerHTML = output;
}


function reply_click(clicked_id)
{
    let placeHolder = document.querySelector("#output-stuff");
    placeHolder.innerHTML = `
    <div class = "container">
        <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog">
            
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>

                        <h4 style="color: black;"><b>Where can you find this place?</b></h4>
                        </div>
                            <div class="modal-body">
                                <p>
                                <iframe src="${clicked_id}" width="550" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                </p>
                            </div>
                        <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}

function openForm() {
    document.getElementById("loginForm").style.display = "block";
  }
  function openRegister() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
  }
  function closeLogin() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "none";
  }
  function closeRegister() {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("registerForm").style.display = "none";
  }
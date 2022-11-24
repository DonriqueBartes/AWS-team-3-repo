async function findFood(selectedValue)
{
        const data = await fetch(`./files/${selectedValue}.json`);
        const foodChoice = await data.json();
        const foodHolder = document.querySelector("#data-output");
        let output = "";
        for(const place of foodChoice){
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
    const placeHolder = document.querySelector("#output-stuff");
    placeHolder.innerHTML = `
        <div class="overlay" id="this-overlay"></div>
        <div class = "modal-container" id="this-modal">
        Where can you find this place?
            <div class="modal-body">
                <p>
                <iframe src="${clicked_id}" width="700" height="450vh" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </p>
            </div>
            <button type="button" id="close-this" class="close-default">Close</button>
        </div>
    `;

    const targetDiv = document.getElementById("this-overlay");
    const targetModal = document.getElementById("this-modal");
    const btn = document.getElementById("close-this");
    //---Close modal if close button is pressed 
    btn.onclick =function() 
    {
        
        if (targetDiv.style.display !== "none"){
            targetDiv.style.display = "none";
            targetModal.style.display = "none";
        } else {
            targetDiv.style.display = "block";
        }
    };
    //---Close modal if 'Escape' key is pressed
    document.onkeydown = function(evt) {
        evt = evt || window.event;
        var isEscape = false;
        if ("key" in evt) {
            isEscape = (evt.key === "Escape" || evt.key === "Esc");
        } else {
            isEscape = (evt.keyCode === 27);
        }
        if (isEscape) {
            targetDiv.style.display = "none";
            targetModal.style.display = "none";
        }
    };
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
function openCurrent(){
    document.getElementById("current-login").style.display = "block";
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "none";
}
function closeCurrentLogin(){
    document.getElementById("current-login").style.display = "none";
}

      
function registerButton() {
    const username = document.getElementById("emailInputRegister").value;
    const password = document.getElementById("passwordInputRegister").value;
    const passwordConfirm = document.getElementById("confirmationpassword").value;
    const personalname = document.getElementById("personalnameRegister").value;
    let poolData;  
    
    if (password != passwordConfirm) {
        alert("Passwords Do Not Match!");
        throw "Passwords Do Not Match!";
    }
  
  poolData = {
          UserPoolId : _config.cognito.userPoolId, // Your user pool id here
          ClientId : _config.cognito.clientId // Your client id here
      };	
	
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  const attributeList = [];
  const dataEmail = {
      Name : 'email', 
      Value : username, //get from form field
  };
  
  const dataPersonalName = {
      Name : 'name', 
      Value : personalname, //get from form field
  };

  const attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
  const attributePersonalName = new AmazonCognitoIdentity.CognitoUserAttribute(dataPersonalName);
  attributeList.push(attributeEmail);
  attributeList.push(attributePersonalName);
  userPool.signUp(username, password, attributeList, null, function(err, result){
      if (err) {
          alert(err.message || JSON.stringify(err));
          return;
      }
      cognitoUser = result.user;
      console.log('user name is ' + cognitoUser.getUsername());
      //change elements of page
      alert("Check Your Email For Verification"); 
      location.reload();
  });
}

function signInButton() {
    var authenticationData = {
        Username : document.getElementById("inputUsername").value,
        Password : document.getElementById("inputPassword").value,
    };

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    var poolData = {
        UserPoolId : _config.cognito.userPoolId, // Your user pool id here
        ClientId : _config.cognito.clientId, // Your client id here
    };

    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
        Username : document.getElementById("inputUsername").value,
        Pool : userPool,
    };

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            var accessToken = result.getAccessToken().getJwtToken();
            document.getElementById("formid").innerHTML= document.getElementById("inputUsername").value;
            document.getElementById("currentUser").innerHTML = document.getElementById("inputUsername").value;
            document.getElementById("formid").setAttribute( "onClick","openCurrent();");
            document.getElementById("loginForm").style.display = "none";
            document.getElementById("registerForm").style.display = "none";
            console.log(cognitoUser);
        },
        onFailure: function(err) {
            alert(err.message || JSON.stringify(err));
        },
    });
  }

function forgotpasswordButton() {
  var poolData = {
      UserPoolId : _config.cognito.userPoolId,
      ClientId : _config.cognito.clientId,
  };

  var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  var userData = {
      Username : document.getElementById("inputUsername").value,
      Pool : userPool,
  };

  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.forgotPassword({
      onSuccess: function (result) {
            console.log('call result: ' + result);
      },
      onFailure: function(err) {
            alert(err);
            console.log(err);
      },
      inputVerificationCode() {
            var verificationCode = prompt('Please input verification code ' , '');
            var newPassword = prompt('Enter new password ' ,'');
            cognitoUser.confirmPassword(verificationCode, newPassword, this);
      }
  });
}
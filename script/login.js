
document.getElementById('login-button').addEventListener('click',function(){

    const userName=document.getElementById('username').value;
    const passWord=document.getElementById('password').value;
    
    if(userName=='admin' && passWord=='admin123'){
        // go to home.html
        alert("Login Sucessful");
        // window.location.replace("./home.html");
        window.location.href = "home.html";
    }
    else{
        // show wrong password alert
        alert("Wrong Username or Password");
        document.getElementById('username').value="";
        document.getElementById('password').value="";
    }
    
});
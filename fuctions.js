let passwrodShower = document.getElementById('showPasswordbtn');
let pswrdInput = document.getElementById('password');

passwrodShower.onclick = function() {
    if (pswrdInput.type == "password") {
        passwrodShower.textContent = "Hide";
        pswrdInput.type = "text";
    } else {
        passwrodShower.textContent = "Show";
        pswrdInput.type = "password";
    }
}
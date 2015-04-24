/**
 * Created by nina on 4/23/15.
 */

function AuthenticateService(){

};


AuthenticateService.prototype.create = function(object){
    makeAjaxCall('/authenticateRouter', 'POST', object, done);
};


AuthenticateService.prototype.get = function(email, password){
    //get id //in reality passing an email to search
    makeAjaxCall('/authenticateRouter/'+email+'/'+password,'GET', null, done);
};
/*
AuthenticateService.prototype.getAll = function(){
    makeAjaxCall('/contacts', 'GET', null, done);
};

AuthenticateService.prototype.update = function(id, object){
    console.log('Update key fired!');
    makeAjaxCall('/contacts/'+id, 'PUT', object, done);
};

AuthenticateService.prototype.delete = function(id){
    makeAjaxCall('/contacts/'+id, 'DELETE', null, done);
};
*/

/****SESSION ID /UUID*****/

function getUUID(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}


/**** Some callback function*****/
function done(){
    console.log("Authenticating..");
};

/*****AJAX Call******/
function makeAjaxCall(url, HttpVerb, Object, callback){
    var xhr = new XMLHttpRequest();
    xhr.open(HttpVerb, url); //get or post or any other verb
    // if the httpVerb is post, modify the request header - content-type, xhr.send(JSON.stringify(obj))
    if(HttpVerb == 'POST' || HttpVerb == 'PUT' && typeof Object != null){
        //set the request header
        xhr.setRequestHeader('content-type', 'application/json');
    }
    xhr.addEventListener('readystatechange',function(){
        if(xhr.readyState === 4){
            if (xhr.status == 200) {
                callback(xhr);
                //var  data = xhr.responseText;
                //var jsonResponse = JSON.parse(data);
                //if(HttpVerb === 'POST') createDiv(jsonResponse);
            }
        }
    });

    if(HttpVerb == 'POST' || HttpVerb == 'PUT')  xhr.send(JSON.stringify(Object));
    if(HttpVerb == 'GET') xhr.send();
    if(HttpVerb == 'DELETE') xhr.send();
};

/***Function to validate both passwords match****/
function passMatch(parent){
    var pass1 = parent.password.value;
    var pass2 = parent.checkPassword.value;
    if(pass1 === pass2 && pass1 !== null) return true;
    else return false;
};

/******Create element*******/

function createElement(elementType, parent, className, innerHTML, custom) {
   var element = document.createElement(elementType);
   if (parent) parent.appendChild(element);
   if (className) element.className = className;
   if (innerHTML) element.innerHTML = innerHTML;
   if (typeof custom !== 'undefined') {
       for (var prop in custom) {
           element.setAttribute(prop, custom[prop]);
       }
   }
   return element;
};

/*****DOM CONTENT LOADED*****/
document.addEventListener('DOMContentLoaded',function(){
    var signUpForm = document.forms.signUp;
    signUpForm.addEventListener('submit',function(event){
        event.preventDefault();
    });
    var submit = signUpForm.SignUp;
    submit.addEventListener('click',function(){
       if(passMatch(signUpForm)){
           //proceed to AJAX call
           var email = signUpForm.email.value;
           var pwd = signUpForm.password.value;
           var service = new AuthenticateService();
           var signUpObj = {email: email, password: pwd};
           service.create(signUpObj);
       }
       else{
           //create a span on form and display error
           createElement('span',signUpForm,'error','Passwords do not match or are blank');
       }
    });


    /****For the Login form***/
    var logInForm = document.forms.login;
    logInForm.addEventListener('submit',function(event){
        event.preventDefault();
    });
    var logInButton = logInForm.LogIn;
    logInButton.addEventListener('click', function(){
        var email = logInForm.loginEmail.value;
        var pwd = logInForm.loginPassword.value;
        var service = new AuthenticateService();
        var logInObj = {email: email, password: pwd};
        //service.get(email, pwd);
        service.create(logInObj);
    });
});
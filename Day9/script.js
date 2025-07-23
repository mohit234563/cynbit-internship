

const form=document.querySelector('.form-container');
const subBtn=document.getElementById("submit");
subBtn.addEventListener("click",function(e){
    e.preventDefault();
    const fname=document.querySelector('#fname').value.trim();
    const lname=document.querySelector('#lname').value.trim();
    const email=document.querySelector('#email').value.trim();
    const phone=document.querySelector('#phone').value.trim();
    const password=document.querySelector('#password').value.trim();
    const Cpassword=document.querySelector('#co-password').value.trim();
    const gender=document.querySelector('input[name="Gender"]:checked');
    const terms=document.getElementById("terms").checked;
    //regex 
    let emptyRegex=/^\s*$/;
    let emailRegex=/^[a-zA-Z0-9]+@gmail\.com$/;
    let phoneRegex=/^[6-9]\d{9}$/;
    let passwordRegex=
     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
    // for fname
    if(emptyRegex.test(fname)){
        alert("first name is required!");
        return;
    }
    //for lname
    if(emptyRegex.test(lname)){
        alert("last name is required!");
        return;
    }
    // for email
    if(!emailRegex.test(email)){
        alert("wrong email!");
        return;
    }
    //for phone number
    if(!phoneRegex.test(phone)){
        alert("wrong phone number");
        return;
    }
    //for password
    if(!passwordRegex.test(password)){
        alert("password does not contains required formate!");
        return;
    }
    //for confirm password
    if(password!=Cpassword){
        alert("password do not match!");
        return;
    }
    //for the terms and conditions
    if(!terms){
        alert("select the terms and conditions");
        return;
    }
    // for genders
    if(!gender){
        alert("select your gender");
        return;
    }
    // all validations passed
    alert("Form submitted successfully!");
    form.reset();

});


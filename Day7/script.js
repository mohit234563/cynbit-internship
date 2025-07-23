const users=[
    {Name:"Mohit",Year:"2027",Branch:"AIDS",Email:"mohit@gmail.com"},
    {Name:"Yash",Year:"2027",Branch:"cyberSecurity",Email:"Yash@gmail.com"},
    {Name:"Lakshay",Year:"2027",Branch:"CSE",Email:"LAkshay@gmail.com"},
    {Name:"Mridul",Year:"2027",Branch:"AIDS",Email:"Mridul@gmail.com"},
    {Name:"Naman",Year:"2028",Branch:"CSAI",Email:"naman@gmail.com"},
    {Name:"Sachin",Year:"2029",Branch:"IT",Email:"SAchin@gmail.com"},
];
let input=document.querySelector("#userInput");
let btn=document.querySelector("#submit-btn");
let mainSection=document.querySelector(".card-container");
function displayUser(UsersToDisplay){
    mainSection.innerHTML="";
    UsersToDisplay.forEach(user => {
        const card=document.createElement("div");
        card.className="card-container";
        card.innerHTML=`
        <h3>${user.Name}</h3>
      <p><strong>Branch:</strong> ${user.Branch}</p>
      <p><strong>Email:</strong> ${user.Email}</p>
      <p><strong>Year:</strong> ${user.Year}</p>
        `;
        card.setAttribute('style','border:1px solid black');
        card.style.backgroundColor="wheat";
        card.style.borderRadius="5px";
        card.style.padding="10px";
        mainSection.appendChild(card);
    });
    
}
input.addEventListener("input",()=>{
    const query=input.value.toLowerCase();
    const filtered=users.filter(user=>
        user.Name.toLowerCase().includes(query)||
        user.Branch.toLowerCase().includes(query)
    );
    displayUser(filtered);
});
btn.addEventListener("click",()=>{
    users.sort((a,b)=>a.Year-b.Year);
    displayUser(users);
});
    displayUser(users);
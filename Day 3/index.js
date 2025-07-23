let userInput=document.getElementById('userInput');
let submit=document.getElementById('submit');
let op=document.getElementById('fpara');
submit.addEventListener("click",function(){
    let temp=userInput.value.trim();
    op.textContent=temp?`you entered: ${temp}`:"Enter here";
})
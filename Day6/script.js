const motivation=["Code is like humor. When you have to explain it, it’s bad.",
      "First, solve the problem. Then, write the code.",
      "Experience is the name everyone gives to their mistakes.",
      "Simplicity is the soul of efficiency.",
      "Talk is cheap. Show me the code.",
      "Dream it. Code it. Ship it."];
const bg=['#fef9c3', '#e0f2fe', '#d1fae5', '#fce7f3', '#ede9fe', '#fff7ed'];
let bt=document.querySelector('button');
let motivate=document.querySelector('.motivation');
bt.addEventListener("click",()=>{
    let res=motivation[Math.floor(Math.random()*motivation.length)];
    let col=bg[Math.floor(Math.random()*bg.length)];
    motivate.innerText=res;
    motivate.style.backgroundColor=col;
})      
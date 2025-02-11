let type = document.querySelector("#type");
let btn1 = document.querySelector(".btn1");
let btn2 = document.querySelector(".btn2");
let p1 = document.querySelector("#p1");
let div1 = document.querySelector(".div1");
let p2 = document.querySelector("#p2");
let quotePara;
let isTimerRunning;

type.disabled = true;
btn1.addEventListener("click", async function(){
      let quoteApi = "https://quoteslate.vercel.app/api/quotes/random?minLength=250&maxLength=260"
      let res = await fetch(quoteApi);
      let data = await res.json();

      if (quotePara) {
        quotePara.remove();
      } 

      quotePara = document.createElement("p");
      div1.insertBefore(quotePara, p1).innerText = data.quote;
      p1.innerText = "Start Typing...";
      type.value = "";
      type.disabled = false;
      
      isTimerRunning = true;
      let c = 59;
      let interval = setInterval(() => {
        if (c >= 0) {
            p2.innerText = c;
            c--;
        } else {
            clearInterval(interval);
            p1.innerText = "Stop Typing...";
            isTimerRunning = false;
            type.disabled = true;
            btn1.disabled = false;
        }
    }, 1000);
    btn1.disabled = true;
    btn2.innerText = "Check Speed";
    // btn1.style.Color = "black";
})



btn2.addEventListener("click", function(){
   if (!quotePara){
     alert("Click To Start");
   }
   if (isTimerRunning) {
    alert("Keep typing until the timer stops!"); 
    return;
   }
   if (type.value.trim() === "") {
      if(p2.innerText == "0"){
        alert("You didn't type anything.");
        return;
      }
   }
   btnTwo();
})
 


function btnTwo(){
    let text = type.value.split(" ");
      let words = text.filter(word => word.length > 0);
      // console.log(words);
      
      let originalQuote = quotePara.innerText.split(" ");
      // console.log(originalQuote);
      
      rightWord = 0; 
      for(let i = 0; i < words.length; i++){
           if(words[i] === originalQuote[i]){
              rightWord++;
           }
      } 
      // console.log(rightWord);
      accuracy = ((rightWord/words.length)*100).toFixed(2);
      // console.log(accuracy);
      
      btn2.innerText = words.length+" "+"WPM";
      p1.innerText = `${accuracy}%accuracy`;
}   

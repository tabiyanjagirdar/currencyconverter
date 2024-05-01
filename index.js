const BASE_URL = "https://api.exchangerate-api.com/v4/latest"
  const dropdowns = document.querySelectorAll(".dropdown select");
  const btn = document.querySelector("form button");
  const fromCurr = document.querySelector(".from select");
  const toCurr = document.querySelector(".to select");
  const msg = document.querySelector(".msg")


  const updateFlag = (element) =>{
    let currCode = element.value;
    let contryCode = countryList[currCode]
    let newSrc = `https://flagsapi.com/${contryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
  }

  for(let select of dropdowns){
    for(let currCode in countryList){
      let newOption =document.createElement('option');
      newOption.innerText = currCode;
      newOption.value = currCode;
      if(select.name == "from" && currCode == "USD"){
        newOption.selected = "selected";
      }else if(select.name == "to" && currCode == "INR"){
        newOption.selected = "selected";
      }
      select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
updateFlag(evt.target);
    })
  }

  const upadteExchangeRate = async () =>{
    let amount = document.querySelector('.amount input');
    let amtValue = amount.value;
       if(amtValue == "" || amtValue < 1 ){
    amtValue = 1;
    amount.value = "1";
    }

   
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}json`;
  

let response = await fetch(URL);
let data = await response.json();
let rate = data.rates[toCurr.value];

let finalAmount = amtValue * rate ;

msg.innerHTML= `${amtValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
  }

  

  

  btn.addEventListener("click",  (evt)=>{
    evt.preventDefault();
    upadteExchangeRate();
  })


  window.addEventListener("load",()=>{
    upadteExchangeRate();
  })
  
  
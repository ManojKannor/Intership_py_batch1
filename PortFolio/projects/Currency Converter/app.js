let BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

let selects = document.querySelectorAll("select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
let img = document.querySelectorAll("img");
const btn = document.querySelector("form button");

for(let select of selects) {

        for(currcode in countryList){
            const newOption = document.createElement("option");
            newOption.innerText = currcode;
            newOption.value = currcode;
            if(select.name == "from" && currcode == "USD"){
                newOption.selected = "selected";
            }
            else if(select.name == "to" && currcode == "INR"){
                newOption.selected = "selected";
            }
            select.append(newOption);

        }

        select.addEventListener("change" , (evt) => {
            updateFlag(evt.target);

        });

}

const updateExchangeRate = () => {
    let amount = document.querySelector("form input");
    let amtVal = amount.value;
    if(amtVal < 1 || amtVal == ""){
        amtVal = 1;
        amount.value = "1";
    }

    // Currency Covertor API 
    let url = `https://api.currencyapi.com/v3/latest?apikey=cur_live_W9gk7MIskfqeBqVLaxC3cNTbYj9f0rjIqazeNhVl`;
    let response =  fetch(url);
    response.then((data) => {
        return data.json();
    }).then((res) => {
        return res.data;
    }).then((finalData) => {
        let fFromCurr = fromCurr.value;
        let fToCurr = toCurr.value;

        let fromCurrency = finalData[fFromCurr].value;
        let toCurrency = finalData[fToCurr].value;
        let finalAmt = amtVal * (toCurrency/fromCurrency);
        
        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`
        
    })
}


const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}


btn.addEventListener('click' , (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
})


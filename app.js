// variables
const fromList = document.querySelectorAll("#dropDown select");
const inputAmount = document.querySelector(".amount input")
const outputBox = document.querySelector("#outputBox")
const getExchBtn = document.querySelector(".getExchRate")
const BASE_URL = `https://open.er-api.com/v6/latest/`

function updateFlag() {
  
}

function initialPopulizaton() {
  fromList.forEach((list) => {
    for (const currency in countryList) {
      let newOption = document.createElement("option");
      newOption.value = currency;
      newOption.innerText = currency;
      // let newOption = `<option value="${currency}">${currency}</option>`
      list.appendChild(newOption);

      if (list.name == "fromCountry" && currency === "USD") {
        newOption.selected = true;
      } else if (list.name == "toCountry" && currency === "INR") {
        newOption.selected = true;
      }
      }
      list.addEventListener("change", (e)=> {
        let img = document.querySelector(`#${list.name}`)
        let targetCountry = countryList[e.target.value]
        img.src = `https://flagsapi.com/${targetCountry}/flat/64.png`
      })
  });
}
initialPopulizaton()

// async function getExchRate () {
//   const URL = `${BASE_URL}`
// }

function getExchRateAndShowResult () {
  getExchBtn.addEventListener("click", async (e)=> {
      e.preventDefault();
      const inputValue = inputAmount.value
      if (!isNaN(parseFloat(inputValue)) && isFinite(inputValue)) {
      const fromCountry = fromList[0].value
      const toCountry = fromList[1].value

    

      const URL = `${BASE_URL}${fromCountry}`
      let response = await fetch(URL);
      let final = await response.json()

      const conversionRate = final.rates[toCountry]
      const ans = Math.round(conversionRate*inputValue*100)/100
      const finalAns = `${inputValue} ${fromCountry} = ${ans} ${toCountry}`

      outputBox.innerText = finalAns;
  } 
  else {
    alert("Please Enter a valid amount")
  }
  })
}

getExchRateAndShowResult()


window.addEventListener("load", async ()=> {
  const fromCountry = fromList[0].value
  const toCountry = fromList[1].value
  const inputValue = inputAmount.value

  const URL = `${BASE_URL}${fromCountry}`
  let response = await fetch(URL);
  let final = await response.json()

  const conversionRate = final.rates[toCountry]
  const ans = Math.round(conversionRate*100)/100

  const finalAns = `1 USD = ${ans} INR`

  outputBox.innerText = finalAns;
})
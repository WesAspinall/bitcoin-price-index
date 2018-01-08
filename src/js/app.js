import $ from 'jquery';
import getCurrencyList from './currencyList';

const currency = getCurrencyList();

const URL         = 'https://api.coindesk.com/v1/bpi/currentprice.json';
const priceIndex  = document.querySelector('.price-index');
const lastUpdated = document.querySelector('#last-updated');
const disclaimerText  = document.querySelector('#disclaimer');
const select     = document.querySelector('#select');


function renderBpi(data) {
  return `
         <div class='currency'>
         <ul>
           <li>${data.code} (${data.symbol})</li>
           <li>Rate: ${data.rate}</li>
           <li>Rate Float: ${data.rate_float}</li>
         </ul>
         </div>
        `
}

function renderOptions(data) {

  if(data.currency === 'USD'){
       return `<option value='${data.currency}' selected='selected'>${data.currency} (${data.country})</option>`
  } else {
    return `<option value='${data.currency}'>${data.currency} (${data.country})</option>`
  }
}

function renderUpdatedTime(data) {
  return `
    <p>last updated: ${data}</p>
    `
}

function renderDisclaimer(data) {
  return `
    <p>last updated: ${data}</p>
    `
}

// fetch(URL)
//   .then((res) => res.json())
//   .then((data) => {

//       const bpi        = Object.values(data.bpi);
//       const disclaimer = data.disclaimer;
//       const time       = data.time.updated;
//       const bpiHtml    = bpi.map((item) => renderBpi(item)).join('');

//       const timeHtml   = renderUpdatedTime(time);
//       const disclaimerHtml = renderDisclaimer(disclaimer);
 
//       lastUpdated.innerHTML = timeHtml;
//       priceIndex.innerHTML = bpiHtml;
//       disclaimerText.innerHTML = disclaimerHtml;
//   });


// console.log(currency);

select.innerHTML = currency.map((item) => renderOptions(item)).join('');

select.onchange = function(){
  const val = this.value
  fetch(`https://api.coindesk.com/v1/bpi/currentprice/${this.value}.json
`)
.then((res) => res.json())
.then((data) => {
  let foo = data.bpi;
  let bar = Object.values(foo);
  console.log(bar[1].rate);
});

}






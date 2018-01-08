import getCurrencyList from './currencyList';

const currency = getCurrencyList();
const HIST = 'https://api.coindesk.com/v1/bpi/historical/close.json';
const URL         = 'https://api.coindesk.com/v1/bpi/currentprice.json';
const priceIndex  = document.querySelector('#price-index');
const lastUpdated = document.querySelector('#last-updated');
const disclaimerText  = document.querySelector('#disclaimer');
const select      = document.querySelector('#select');
const otherCurrencies = document.querySelector('#other-currencies');



function renderBpi(data) {
  return `
         <div class='currency'>
         <ul>
           <li>${data.code} </li>
           <li>${data.symbol} ${data.rate}</li>
         </ul>
         </div>
        `
}

function renderOptions(data) {

  if(data.currency === 'XAU'){
       return `<option value='${data.currency}' selected='selected'>${data.currency} (${data.country})</option>`
  } else {
    return `<option value='${data.currency}'>${data.currency} (${data.country})</option>`
  }
}

function renderOtherCurrency(data) {
  return `<p id='rate'>${data.rate}</p>
          <p id='description'>${data.description}</p>
          `
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

function getMainInfo() {
  return fetch(URL)
    .then((res) => res.json())
    .then((data) => {

        const bpi        = Object.values(data.bpi);
        const disclaimer = data.disclaimer;
        const time       = data.time.updated;
        const bpiHtml    = bpi.map((item) => renderBpi(item)).join('');

        const timeHtml   = renderUpdatedTime(time);
        const disclaimerHtml = renderDisclaimer(disclaimer);
   
        lastUpdated.innerHTML = timeHtml;
        priceIndex.innerHTML = bpiHtml;
        disclaimerText.innerHTML = disclaimerHtml;
    });
}



// renders select options
select.innerHTML = currency.map((item) => renderOptions(item)).join('');



function getSelectVal() {
  let val = select.value;

  return fetch(`https://api.coindesk.com/v1/bpi/currentprice/${val}.json`)
  .then((res) => res.json())
  .then((data) => { 

   const otherBpi = data.bpi;
   const bpiVal = Object.values(otherBpi);
   const currency = bpiVal[1];

   otherCurrencies.innerHTML = renderOtherCurrency(currency);
  });
}

getMainInfo();
getSelectVal();
select.onchange = getSelectVal;


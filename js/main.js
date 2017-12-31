(function(){

  const URL         = 'https://api.coindesk.com/v1/bpi/currentprice.json';
  const priceIndex  = document.querySelector('#price-index');
  const lastUpdated = document.querySelector('#last-updated');
  const disclaimerText  = document.querySelector('#disclaimer');

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

  fetch(URL)
    .then((res) => res.json())
    .then((data) => {

        bpi        = Object.values(data.bpi);
        disclaimer = data.disclaimer;
        time       = data.time.updated;
        bpiHtml    = bpi.map((item) => renderBpi(item)).join('');

        timeHtml   = renderUpdatedTime(time);
        disclaimerHtml = renderDisclaimer(disclaimer);
   
        lastUpdated.innerHTML = timeHtml;
        priceIndex.innerHTML = bpiHtml;
        disclaimerText.innerHTML = disclaimerHtml;
    });

})();
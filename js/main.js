(function(){

  const URL         = 'https://api.coindesk.com/v1/bpi/currentprice.json';
  const priceIndex  = document.querySelector('#price-index');
  const lastUpdated = document.querySelector('#last-updated');

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
    return `<p>last updated: ${data.updated}</p>`
  }

  fetch(URL)
    .then((res) => res.json())
    .then((data) => {

        bpi        = data.bpi;
        bpiInfo    = Object.values(bpi);
        disclaimer = data.disclaimer;
        time       = data.time;

        bpiHtml    = bpiInfo
                      .map((item) => renderBpi(item))
                      .join('');

        timeHtml   = renderUpdatedTime(time);
        
        lastUpdated.innerHTML = timeHtml;
        priceIndex.innerHTML = bpiHtml;
    });

})();
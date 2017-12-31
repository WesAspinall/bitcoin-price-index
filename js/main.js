(function(){

  const URL = 'https://api.coindesk.com/v1/bpi/currentprice.json';

  const root = document.querySelector('#root');

  function renderBpiTemplate(data) {
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

  fetch(URL)
    .then((res) => res.json())
    .then((data) => {

        bpi        = data.bpi;
        bpiInfo    = Object.values(bpi);
        disclaimer = data.disclaimer;
        time       = data.time.updated;
        
        bpiHtml    = bpiInfo
                      .map((item) => renderBpiTemplate(item))
                      .join('');
        
        root.innerHTML = bpiHtml;
    });

})();
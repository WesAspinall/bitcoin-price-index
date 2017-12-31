(function(){

  const URL = 'https://api.coindesk.com/v1/bpi/currentprice.json';

  const root = document.querySelector('#root');

  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
        bpi = data.bpi;

        bpiInfo = Object.values(bpi);

        html = bpiInfo.map((item) => {
          return `
           <div class='currency'>
           <ul>
             <li>${item.code} (${item.symbol})</li>
             <li>Rate: ${item.rate}</li>
             <li>Rate Float: ${item.rate_float}</li>
           </ul>
           </div>
          `;

        }).join('');
        
        root.innerHTML = html;
    });

})();
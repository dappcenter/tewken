var tronWeb;
var currentAddr;
var tewkens;


window.onload = function() {
          if (!window.tronWeb) {
                    const HttpProvider = TronWeb.providers.HttpProvider;
                    const fullNode = new HttpProvider('https://api.trongrid.io');
                    const solidityNode = new HttpProvider('https://api.trongrid.io');
                    const eventServer = 'https://api.trongrid.io/';

                    const tronWeb = new TronWeb(
                        fullNode,
                        solidityNode,
                        eventServer,
                    );

                window.tronWeb = tronWeb;
          }
          
          once();
};

async function once() {
          tronWeb = window.tronWeb;
          tewkens = await tronWeb.contract().at("TAtpSCSsbFGsTNci6MGZTBVBjVcBc3UGdG");

          currentAddr = tronWeb.defaultAddress['base58'];
          console.log(currentAddr);
          
          setTimeout(function() {}, 2000);
          setInterval(function() {
                    main();
          }, 2000);
}

function main() {
          totalBalance();
}

function nFormatter(num) {
    isNegative = false
    if (num < 0) {
        isNegative = true
    }
    num = Math.abs(num)
    if (num >= 1000000000) {
        formattedNumber = (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    } else if (num >= 1000000) {
        formattedNumber = (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (num >= 1000) {
        formattedNumber = (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    } else {
        formattedNumber = num;
    }
    if (isNegative) {
        formattedNumber = '-' + formattedNumber
    }
    return formattedNumber;
}

function buy() {
          var ref = $('#ref').val();
          var val = $('#spend').val();
          
          tewkens.buy(ref).send( {value: val} ).then(result => {
                    
          }).catch((err) => {
                    console.log(err)
          });
}

function totalBalance() {
          tewkens.totalTronBalance().call().then(result => {
                    var balance = result.toString();
                    var value = balance/1e6;
                    var data = nFormatter(value)

                    $("#globalTron").text(data);
          }).catch((err) => {
                    console.log(err)
          });
}

function sell() {
          var tokens = 10;
          
          tewkens.sell(tokens).send().then(result => {
          }).catch((err) => {
                    console.log(err)
          });
}

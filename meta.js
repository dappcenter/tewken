var tronWeb;
var currentAddr;
var tycoon;


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
          tycoon = await tronWeb.contract().at("TPexUXMe63YHcARbMnhDRdcmsk3SWJ1fWN");

          currentAddr = tronWeb.defaultAddress['base58'];
          console.log(currentAddr);
          
          setTimeout(function() {}, 2000);
          setInterval(function() {
                    main();
          }, 2000);
}

function main() {
          getAllMyRv();
          
          myBalance();
          
          globalTron();
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

function getAllMyRv() {
          tycoon.AllmyRv().call().then(result => {
                    var all = result.toString();
                    addRv(all);

                    all = (all / 2e6);
                    all = nFormatter(all);
                  
                    $('#myRv').text(all);
          });
}

function addRv(myRv){        
          var rv100 = (myRv / 2e6);
        
          var value = (rv100).toFixed(0);
         
          var data = value.toString();
          $('#sellprv').val(data);
}

function sell() {
          var value = $('#sellprv').val();
          
          tycoon.Sell(value).send().then(result => {
                    callback();
          }).catch((err) => {
                    console.log(err)
          });
}

function withdraw() {
          tycoon.Withdraw().send().then(result => {
                    callback();
          }).catch((err) => {
                    console.log(err)
          });
}

function myBalance() {
          tycoon.Balance().call().then(result => {
                    var balance = result.toString();
                    var value = balance/1e6;
                    var data = nFormatter(value);
                    
                    $("#tron").val(data);
          });
}

function globalTron() {
          tycoon.tron().call().then(result => {
                    var balance = result.toString();
                    var value = balance/1e6;
                    var data = nFormatter(value)

                    $("#globalTron").text(data);
    });
}

function claimBasic() {
          var code = $("#claim").val();
          
          tycoon.ClaimBasic(code).send().then(result => {
                    callback();
          }).catch((err) => {
                    console.log(err)
          });
}

let adBlockEnabledd = false;
async function detectAdBlock() {
  const googleAdUrl = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
  try {
      const keywordsToCheck = ['uBlock', "adblock",
        'height:1px!important', 'height:1px !important', 'display:none!important', 'display:none !important', 'height:1px!important', 'height:1px !important',
        'height: 1px!important', 'height: 1px !important', 'display: none!important', 'display: none !important', 'height: 1px!important', 'height: 1px !important'
      ];
      const response = await fetch(new Request(googleAdUrl));
      if (!response.headers.get('content-length')) {
          adBlockEnabledd = true;
      }
      const responseText = await response.text();
      const adBlockDetected = keywordsToCheck.some(keyword => responseText.includes(keyword));
      if (adBlockDetected) {
          adBlockEnabledd = true;
      }
  } catch (e) {
      adBlockEnabledd = true;
  } finally {
      console.log(`AdBlock Enabled: ${adBlockEnabledd}`);
  }
  return adBlockEnabledd;
}
function loadChecking() {
 let href = window.location.href;
 if(!href.includes(atob("YWxvbnNvYWxpYWdhLmdpdGh1Yi5pbw=="))) return;
 let link = atob("aHR0cHM6Ly9hbG9uc29hcGkuZGlzY2xvdWQuYXBwL2NoZWNraW5nP3NpdGU9PHNpdGU+JmtleT08a2V5PiZsb2NrPTxsb2NrPg==")
  .replace(/<site>/g,"alonsohosting").replace(/<key>/g,"KEY-A")
  .replace(/<lock>/g,(adBlockEnabledd) ? "yes" : "no");
 let counter = document.getElementById("online-counter");
 if(counter) {
   $.ajax({
     url: link,
     type: "GET", /* or type:"GET" or type:"PUT" */
     dataType: "json",
     data: {
     },
     success: function (result) {
        //console.log(`Total fails: ${counter.dataset.failed}`)
        counter.dataset.failed = "0";
        counter.style.display = "flex";
        if(isNaN(result)) {
         counter.textContent = `🟡 You shouldn't be reading this. Report it on https://alonsoaliaga.com/discord`;
         counter.style.backgroundColor = "yellow";
        }else{
         //counter.textContent = `🟢 ${result} user${result==1?``:`s`} online using our Minecraft Profile Picture Generator!`;
         counter.textContent = `🟢 ${result} online looking for a good hosting on AlonsoHosting!`;
         counter.style.backgroundColor = "green";
        }
     },
     error: function (e) {
      //console.log(`Total fails: ${counter.dataset.failed}`)
      if(counter.style.display != "none") {
        let currentFails = +counter.dataset.failed;
        if(currentFails >= 1){
          counter.style.display = "none"
        }else{
          counter.textContent = `🔴 Check your internet connection!`;
          counter.style.backgroundColor = "#7c0000";
          counter.dataset.failed = `${currentFails + 1}`
        }
      }
     }
   });
 }
}

let times = 0;
function loadCounter() {
 let link = atob("aHR0cHM6Ly9hbG9uc29hcGkuZGlzY2xvdWQuYXBwL2NvdW50ZXI/c2l0ZT08c2l0ZT4ma2V5PTxrZXk+").replace(/<site>/g,"alonsohosting").replace(/<key>/g,"KEY-A");
 let counter = document.getElementById("counter-amount");
 if(counter) {
   $.ajax({
     url: link,
     type: "GET", /* or type:"GET" or type:"PUT" */
     dataType: "json",
     data: {
     },
     success: function (result) {
       if(isNaN(result))
         document.getElementById("counter-amount").innerHTML = "Click to return!";
       else document.getElementById("counter-amount").innerHTML = `Visits: ${result}`;
     },
     error: function (e) {
       times++;
       document.getElementById("counter-amount").innerHTML = "Click to return!";
       if(times <= 1) {
        setTimeout(()=>{
          loadCounter();
        },1000*10);
       }
     }
   });
 }
}
async function checkSite(window) {
  try{
    await detectAdBlock();
  }catch(e){}
  setTimeout(()=>{
    let href = window.location.href;
    //console.log(href)
    if(!href.includes(atob("YWxvbnNvYWxpYWdhLmdpdGh1Yi5pbw==")) || href.startsWith("file:")) {
      try{document.title = `Page stolen from https://${atob("YWxvbnNvYWxpYWdhLmdpdGh1Yi5pbw==")}`;}catch(e){}
      window.location = `https://${atob("YWxvbnNvYWxpYWdhLmNvbS9BbG9uc29Ib3N0aW5n")}/`}
  },1000);
}
setTimeout(()=>{
  loadChecking();
  setInterval(()=>{
    loadChecking();
  },10000)
},2500)
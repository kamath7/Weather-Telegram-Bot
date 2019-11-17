const dotenv = require('dotenv');
const TelegramBot = require('node-telegram-bot-api');
const Agent = require('socks5-https-client/lib/Agent');
dotenv.config({path: `${__dirname}/config/dev.env`});
const token = process.env.TELEGRAM;
const port = process.env.PORT||3000;
const host = process.env.HOST;
const bot = new TelegramBot(token,{webHook:{port:port, host: host}});
// const bot = new TelegramBot(token, {
//               polling:true,
//               request: {
//                 agentClass: Agent,
//                 agentOptions: {
//                   socksHost: process.env.PROXY_SOCKS5_HOST,
//                   socksPort: process.env.PROXY_SOCKS5_PORT,
//                   socksUsername: process.env.PROXY_SOCKS5_USERNAME,
//                   socksPassword:process.env.PROXY_SOCKS5_PASSWORD
//                 }
//               }});
const request = require('request');
// app.listen(port,()=>{
//   bot.onText(/\/weather (.+)/, (msg,match)=>{
//     let city = match[1];
//     let chatId = msg.chat.id;

//     request(`http://kams-weather-api.herokuapp.com/${city}`,(error,response,body)=>{
//         if(!error && body){
//                 let res = JSON.parse(body);
        
//                 let celsiusTemp = ((res.temperature-32) * (5/9)).toFixed(2);
//                   if(res.error){
//                     bot.sendMessage(chatId,`Please enter an appropriate city!`);
//                     return ;
//                   }  
//                     bot.sendMessage(chatId,`The current temperature for ${city} is ${celsiusTemp}°C. The summary of the weather: ${res.summary}`);
//                 }
//     });
// });
// });
bot.onText(/\/weather (.+)/, (msg,match)=>{
      let city = match[1];
      let chatId = msg.chat.id;
  
      request(`http://kams-weather-api.herokuapp.com/${city}`,(error,response,body)=>{
          if(!error && body){
                  let res = JSON.parse(body);
          
                  let celsiusTemp = ((res.temperature-32) * (5/9)).toFixed(2);
                    if(res.error){
                      bot.sendMessage(chatId,`Please enter an appropriate city!`);
                      return ;
                    }  
                      bot.sendMessage(chatId,`The current temperature for ${city} is ${celsiusTemp}°C. The summary of the weather: ${res.summary}`);
                  }
      });
  });
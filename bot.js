const token = process.env.TOKEN;
const TelegramBot = require('node-telegram-bot-api');
let bot;
if(process.env.NODE_ENV === 'production'){
  bot = new TelegramBot(token);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
}else{
  bot = new TelegramBot(token,{polling:true});
}

console.log(`Bot server started in ${process.env.NODE_ENV} mode`);

const request = require('request');

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

  module.exports = bot;
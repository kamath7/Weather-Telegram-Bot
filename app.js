const dotenv = require('dotenv');
const TelegramBot = require('node-telegram-bot-api');

dotenv.config({path: `${__dirname}/config/dev.env`});
const token = process.env.TELEGRAM;

const bot = new TelegramBot(token,{polling:true});
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
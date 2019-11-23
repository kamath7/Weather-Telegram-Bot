const express = require('express');
const pkgInfo = require('./package.json');

let app = express();

app.get('./',(req,res)=>{
    res.json({version: pkgInfo.version});
});

const server = app.listen(process.env.PORT, function(){
    let host = server.address().address;
    let port = server.address().port;

    console.log(`Web server started http://${host}:${port}`);
});
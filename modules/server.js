var http = require('http');
var colors = require('colors');
var url = require('url');
var handlers = require('./handlers');

function start(){
    function onRequest(request, response){
        console.log("Odebrano zapytanie");
        const parsedUrl = url.parse(request.url);
        response.writeHead(200, {"Content-type": " text/plain; charset=utf-8"});
        switch (parsedUrl.pathname){
            case '/':
            case '/start':
                handlers.welcome(request,response);
                break;
            case '/upload':
                handlers.upload(request, response);
                break;
            case '/show':
                handlers.show(request, response);
                break;
            default:
                handlers.error(request, response);
        }
    }
    http.createServer(onRequest).listen(9000);
    console.log("Uruchomiono serwer".green);
}

exports.start = start;


var fs = require('fs');
var formidable = require('formidable');
var colors = require('colors');
var url = require('url');

exports.upload = function(request, response){
    console.log("Rozpoczynam obsługę żadania upload");
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files){
        console.log(colors.magenta(JSON.stringify(files.upload.name)));
        fs.renameSync(files.upload.path, files.upload.name);
        console.log('etap 2');
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show?file=${files.name} />");
        response.end();
    })
}

exports.welcome = function(request, response){
    console.log("Rozpoczynam obsługę żądania welcome");
    fs.readFile('templates/start.html', function(err, html){
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
        response.write(html);
        response.end();
    })
}

exports.show = function(request, response) {
    const parsedUrl = url.parse(request.url, true);
    fs.readFile(parsedUrl.query.file, "binary", function(error, file) {
        response.writeHead(200, {"Content-Type": "image/png"});
        response.write(files, "binary");
        response.end();
    })
}

exports.error = function(request, response){
    console.log("Nie wiem co robić");
    response.write("404");
    response.end();
}


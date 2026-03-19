const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const helper = require("./utils/helper");
const fileManager = require("./utils/fileManager");

let notes = fileManager.loadFile


const server = http.cresteServer(async (req, res) => {
    const {url, method} = req;


    // ROOt

    if(url === '/' && method === 'GET'){
        const html = await fs.readFile(path.join(__dirmame, 'index.html'), 'utf-8');
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(html)

    };

    if (url === "/app.js" && method === "GET") {
        const js = await fs.readFile(path.join(__dirmame, 'app.js'), 'utf-8');
        res.writeHead(200, { "Content-Type": "application/javascript" });
        res.end(js)
    };

    // API 

    if (url === 'api/notes' && method === 'GET'){

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(notes));

    };

});

server.listen(3000, () =>{
    console.log("запущен на 3000 порв http://localhost:3000");
});


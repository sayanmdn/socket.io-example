const content = require('fs').readFileSync(__dirname + '/index.html', 'utf8');

const httpServer = require('http').createServer((req, res) => {
    // serve the index.html file
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(content));
    res.end(content);
});

const io = require('socket.io')(httpServer);

io.on('connect', socket => {
    let counter = 0;
    setInterval(() => {
        socket.emit('hello', ++counter);
        console.log(`No - ${counter}`)
    }, 1000);
});

httpServer.listen(3000, () => {
    console.log('go to http://localhost:3000');
});


// here i send an object (counter) to the browser, but i can also send a function in the place of an object with a callback
// like in the example https://gist.github.com/daffl/0647ac1a85458389c3b253a1388eb194
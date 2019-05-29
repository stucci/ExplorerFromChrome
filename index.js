var http = require('http');
var spawn = require('child_process').spawn;

var server = http.createServer(function(req, res) {
  if (req.method == 'POST') {
    var body = '';
    // data受信イベントの発生時に断片データ(chunk)を取得
    // body 変数に連結
    req.on('data', function(chunk) {
        body += chunk;
    });

    // 受信完了(end)イベント発生時
    req.on('end', function() {
      var decoded_body = decodeURIComponent(body).replace(/\/\\/,'\\');
      spawn("cmd", ["/C","explorer " + decoded_body]);
      // spawn("cmd", ["/C","explorer " + decodeURIComponent(body)]);
      // spawn("explorer", body);
      console.log(decoded_body);
      // console.log(decodeURIComponent(body));
      res.end();
    });
  } else {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('This server is made for chrome extension `Explorer from Chrome`\n');
  }
}).listen(8080);

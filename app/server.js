var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var os = require("os");
var morgan = require('morgan');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('static'));
app.use(morgan('combined'));

// Configuration
var port = process.env.PORT || 8080;
var message = process.env.MESSAGE || "Hello world!";
var nodeName = process.env.MY_NODE_NAME || "nodeName";
var nodeIP = process.env.MY_NODE_IP || "nodeIP";
var podName = process.env.MY_POD_NAME || "podName";
var podNamespace = process.env.MY_POD_NAMESPACE || "podNamespace";
var podIP = process.env.MY_POD_IP || "podIP";
var podServiceAccount = process.env.MY_POD_SERVICE_ACCOUNT || "podServiceAccount";

app.get('/', function (req, res) {
  res.render('home', {
    message: message,
    platform: os.type(),
    release: os.release(),
    hostName: os.hostname(),
    nodeName: nodeName,
    nodeIP: nodeIP,
    podName: podName,
    podNamespace: podNamespace,
    podIP: podIP,
    podServiceAccount: podServiceAccount,
  });
});

// Set up listener
app.listen(port, function () {
  console.log("Listening on: http://%s:%s", os.hostname(), port);
});
var express = require('express');
var app = express();
var execFile = require('child_process').execFile;
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
	res.send("42");
})

app.post('/depstrt', function (req, res) {
  console.log("Deploy config handler");
    // console.log(req.info.address);
  	console.log(req.body);
  	console.log(req.payload);
  if (req.body && req.body.push){
	  for (var i = 0; i < req.body.push.changes.length; i++) {
	    console.log(req.body.push.changes[i].new);
	    if (req.body.repository.name === "handz_services" && req.body.push.changes[i].new.name === "feature/product") {
	      execFile('scripts/autoDeployServer.sh', function(error, stdout, stderr) {
	        // Log success in some manner
	        console.log( error );
	        console.log( stdout );
	        console.log( 'exec handz_services auto Deploy complete' );
	      });
	      break;
	    } else if (req.body.repository.name === "sassy_mobile_final" && req.body.push.changes[i].new.name === "master") {
	      execFile('scripts/autoDeployMobile.sh', function(error, stdout, stderr) {
	        // Log success in some manner
	        console.log( error );
	        console.log( stdout );
	        console.log( 'exec sassy_mobile_final auto Deploy complete' );
	      });
	      break;
	    } else console.log("No changes made");
	  };
  }
  res.status(200).send("done");
});

var server = app.listen(9000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Auto-deploy listening at http://%s:%s', host, port);
});
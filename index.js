var express = require('express');
var app = express();

app.get('/', function (req, res) {
	res.send("42");
})

app.post('/startDeploy', function (req, res) {
  console.log("Deploy config handler");
    // console.log(req.info.address);
  for (var i = 0; i < req.payload.push.changes.length; i++) {
    console.log(req.payload.push.changes[i].new);
    if (req.payload.repository.name === "handz_services" && req.payload.push.changes[i].new.name === "feature/product") {
      execFile('scripts/autoDeployServer.sh', function(error, stdout, stderr) {
        // Log success in some manner
        console.log( error );
        console.log( stdout );
        console.log( 'exec handz_services auto Deploy complete' );
      });
      break;
    } else if (req.payload.repository.name === "sassy_mobile_final" && req.payload.push.changes[i].new.name === "master") {
      execFile('scripts/autoDeployMobile.sh', function(error, stdout, stderr) {
        // Log success in some manner
        console.log( error );
        console.log( stdout );
        console.log( 'exec sassy_mobile_final auto Deploy complete' );
      });
      break;
    } else console.log("No changes made");
  };

  
  res.status(200).send("done");
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Auto-deploy listening at http://%s:%s', host, port);
});
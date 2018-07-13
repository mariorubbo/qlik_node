var express = require('express');
var router = express.Router();
//var qlikApps = require('../models/qlikapps');
var qlikApps = [];

const createSession = require('./session');
const session = createSession();

// Uncomment to see the websocket traffic:
//session.on('traffic:*', (direction, data) => console.log(`Session: Traffic (${direction}): ${JSON.stringify(data)}`));

session.open()
.then(global => global.getDocList().then((docList) => 
{

    //console.log(`\n\n\n\n\nresult: ${JSON.stringify( docList ) }`);
    console.log(`\n\n\n\n\nlength: ${docList.length}`);
    //for( var doc in docList )
    //{
    //    console.log(`qDocName: ${JSON.stringify(docList[doc].qDocName ) }`)
    //
        //return qDocName, qConnectedUsers, qFileTime,qFileSize, qDocId, qMeta.qTitle, qMeta.description, qMeta.LastReloadTime
    //}

    //qlikApps =  docList ;


    for ( var i=0; i < docList.length; i++) 
    {
        var obj = docList[i];
        qlikApps.push({
          "qDocIndex" : i,  
          "qDocName" : obj.qDocName ,     
          "qFileSize" : obj.qFileSize ,
          "qFileTime" : obj.qFileTime ,
          "qDocId" : obj.qDocId ,
          "qTitle" : obj.qMeta.qTitle,
          "qLastReloadTime" : obj.qMeta.LastReloadTime,
          "qDescription" : obj.qMeta.description   ,
          "qConnectedUsers" :  obj.qConnectedUsers    
        });

    };

    console.log(`\n\n\n\n\n qlik apps: ${JSON.stringify( qlikApps ) }`);


}));


/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('qlikapps', { title: 'Qlik Apps', qDocList: qlikApps.getAppList()  });
  //res.send('<html><body>hello' + qlikApps + '</body></html>');
  //res.render('qlikapps', { title: 'Qlik Apps', qDocList: qlikApps  });
  res.write("<html>");
  res.write("<head>");
  res.write('<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">');
  res.write('<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>');
  res.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>');
  res.write('<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>');
  res.write("</head>");  
  res.write("<body>");


  res.write('<div class="accordion" id="accordionExample">');


  for ( var i=0; i < qlikApps.length; i++) 
  {

      res.write('<div class="card">');
      res.write('<div class="card-header" id="heading' + qlikApps[i].qDocIndex + '">');
      res.write('<h5 class="mb-0">');
      res.write('<button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse' + qlikApps[i].qDocIndex + '" aria-expanded="true" aria-controls="collapse' + qlikApps[i].qDocIndex + '">');
      res.write(qlikApps[i].qDocName );
      res.write('</button>');
      res.write('</h5>');
      res.write('</div>');

      res.write('<div id="collapse' + qlikApps[i].qDocIndex + '" class="collapse hide" aria-labelledby="heading' + qlikApps[i].qDocIndex + '" data-parent="#accordionExample">');
      res.write('<div class="card-body">');
      
      if (qlikApps[i].qDescription )
      {
        res.write('<p>' + unescape(escape( qlikApps[i].qDescription )) );
      }

      if (qlikApps[i].qDocId )
      {
        res.write('<p>DocId: ' + unescape(escape( qlikApps[i].qDocId )) );
      }
 
      res.write('<p>');

      if (qlikApps[i].qFileSize )
      {
        res.write('<span>Size: ' + unescape(escape( qlikApps[i].qFileSize )) + '</span>' );
      }
 
      if (qlikApps[i].qFileTime )
      {
        res.write('&nbsp;&nbsp;&nbsp;<span>Time: ' + unescape(escape( qlikApps[i].qFileTime ))  + '</span>' );
      }
 
      if (qlikApps[i].qLastReloadTime )
      {
        res.write('<span>Last Reload Time: ' + unescape(escape( qlikApps[i].qLastReloadTime ))  + '</span>');
      }
 
      res.write('<p>');
      if (qlikApps[i].qConnectedUsers )
      {
        res.write('<span>Currently connected users: ' + unescape(escape( qlikApps[i].qConnectedUsers ))  + '</span>');
      }     
   
      res.write('</div>');
      res.write('</div>');
      res.write('</div>');
  };

  res.write('</div>');
  res.write("</body>");
  res.write("</html>");
  res.end;
});

module.exports = router;

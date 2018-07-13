

module.exports.getAppList = function()
{

    const createSession = require('../controllers/session');
    const session = createSession();
    
    // Uncomment to see the websocket traffic:
    //session.on('traffic:*', (direction, data) => console.log(`Session: Traffic (${direction}): ${JSON.stringify(data)}`));
    
    session.open()
    .then(global => global.getDocList().then((docList) => 
    {
    
        console.log(`\n\n\n\n\nDoc name: ${JSON.stringify( docList ) }`);
        //for( var doc in docList )
        //{
        //    console.log(`qDocName: ${JSON.stringify(docList[doc].qDocName ) }`)
        //
            //return qDocName, qConnectedUsers, qFileTime,qFileSize, qDocId, qMeta.qTitle, qMeta.description, qMeta.LastReloadTime
        //}

        return docList;
    
    }));
    
}

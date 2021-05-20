const cp = require('child_process');
const https = require('https');

const delay = 3 * 60 * 100;
const endpointUrl = 'https://exampleendpointurl.com/'


const main = async () => {

    https.get(endpointUrl, (res) => {
        const statCode = res.statusCode;
        onStatusCode(statCode);
    
        res.on('error', error => {
            console.error(error)
        })
    })
    .on('error', (err) => {
        console.log('error');
    })
}

const onStatusCode = (code) => {
    console.log(code);
    //succes
    if(code > 199 && code < 300){   //200 - 299
        console.log('ok');
        turnOffApp();
        return;
    }
    //server down
    if((code > 499 && code < 600) // server error or not found
     || code == 404){
        console.log('not running');
        turnOnApp();
    }
}

const turnOnApp = () => {
    cp.exec('bash start.sh',
    (error, stdout, stderr) => {
        console.log(stderr);
    });
}
const turnOffApp = () => {
    cp.exec('bash stop.sh',
    (error, stdout, stderr) => {
        console.log(stderr);
    });
}

const interval = setInterval(main, delay);

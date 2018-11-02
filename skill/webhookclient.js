const urlMappings = {
    repubblica: "http://www.repubblica.it",
    gazzetta: "http://www.gazzetta.it"
};

const gatewayUrl = 'insert_public_gateway_url';
const gatewayPath = '/api/webhook/pushpayload';

class WebHookClient {
    
    async requestHttps (method, body) {
        const https = require('https');
        
        var options = {
            hostname: gatewayUrl,
            port: 443,
            path: gatewayPath,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        return new Promise(function(resolve, reject) {
            var req = https.request(options, function(res) {
            res.setEncoding('utf8');
        
            let returnData = '';
        
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error(`${res.statusCode}: ${res.req.getHeader('host')} ${res.req.path}`));
            }
        
            res.on('data', (chunk) => {
                returnData += chunk;
            });
        
            res.on('end', () => {
                resolve(JSON.parse(returnData));
            });
        
            res.on('error', (error) => {
                reject(error);
            });
        
            });
            req.on('error', (error) => {
                reject(error);
            });
        
            if(body) {
                const json = JSON.stringify(body);
                console.log(json);
                req.write(json);
            }
            req.end();
        });  
    };
    
    async postHttps (body) {
        return await this.requestHttps('POST', body);
    };

    async openWebPage (url, groups) {
        
        if(url) {
            url = url.toLowerCase();
            url = decodeURIComponent(url).trim();
            
            if(urlMappings[url]) {
                url = urlMappings[url];
            }
            
            if(!url.startsWith("http://")) {
                url = "http://" + url;
            }            
        
            let body = {
                "ContentType": "ShellExecute",
                "Content": url
            };
            if(groups && groups.length > 0) {
                body.Groups = groups.join(',');
            }
            
            await this.postHttps(body);
        }
    };
};

module.exports = new WebHookClient();

const urlMappings = {
    repubblica: "http://www.repubblica.it",
    gazzetta: "http://www.gazzetta.it"
};

const gatewayUrl = 'insert_public_gateway_url';
const gatewayPath = '/api/webhook/pushpayload';
const bookmarksUrl = 'insert_public_bookmarks_url';
const bookmarksPath = '/bookmarks.json';

class WebHookClient {
    
    async requestHttps (urlHost, urlPath, method, body) {
        const https = require('https');
        
        var options = {
            hostname: urlHost,
            port: 443,
            path: urlPath,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        console.log(JSON.stringify(options));
        
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
    
    async postActionToGateway (body) {
        return await this.requestHttps(gatewayUrl, gatewayPath, 'POST', body);
    };

    async getBookmarks () {
        return await this.requestHttps(bookmarksUrl, bookmarksPath, 'GET');
    };

    parseUrl(url) {

        let parsedUrl = decodeURIComponent(url.toLowerCase()).trim();

        let parts = parsedUrl.split(' ');
        if(parts && parts.length > 0) {
            parsedUrl = parts.join('.');
        }

        if(urlMappings[parsedUrl]) {
            
            parsedUrl = urlMappings[parsedUrl];
        }

        if(!parsedUrl.startsWith("http://") && !parsedUrl.startsWith("https://")) {
            parsedUrl = "http://" + parsedUrl;
        }

        return parsedUrl;
    }

    async openWebPage (url, groups) {
        
        if(url) {           
            
            url = this.parseUrl(url);
        
            let body = {
                "ContentType": "ShellExecute",
                "Content": url
            };
            if(groups && groups.length > 0) {
                body.Groups = groups.join(',');
            }
            
            await this.postActionToGateway(body);
        }
    };

    async openBookmark (bookmark, groups) {
        
        if(bookmark) {
            let bookmarks = await this.getBookmarks();

            if(bookmarks && bookmarks.length > 0) {
                let bookmarkAction = bookmarks.find(b => b.bookmark === bookmark.toLowerCase());
                if(bookmarkAction && bookmarkAction.payload) {
                    if(groups && groups.length > 0) {
                        bookmarkAction.payload.Groups = groups.join(',');
                    }
                    await this.postActionToGateway(bookmarkAction.payload);
                    return true;
                }
            }
        }

        return false;
    };
};

module.exports = new WebHookClient();

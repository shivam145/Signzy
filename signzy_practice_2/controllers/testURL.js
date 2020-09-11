const Wikipedia = require("../models/wikipedia");
const request = require("request");

function promisedRequest(url) {
    return new Promise((resolve, reject) => {
        request(url, (err, res, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        });
    });
}

async function test(matchedKeyword, searchedKeyword, webURL, callback) {
    let summary = [],
        imgURL = [];
    for (let i = 0; i < matchedKeyword.length; i++) {
        let keyword = matchedKeyword[i];
        let url = `https://en.wikipedia.org/api/rest_v1/page/summary/${keyword}`;
        await promisedRequest(url)
            .then((data) => {
                console.log(data);
                summary[i] = data.extract;
                imgURL[i] = data.originalimage.source;
            })
            .catch((err) => {
                console.log(err);
            });
    }
    callback({ searchedKeyword, matchedKeyword, summary, imgURL, webURL });
}

module.exports.getSearchPage = (req, res, next) => {
    res.render("search.ejs");
};

module.exports.postSearchPage = (req, res, next) => {
    let keyword = req.body.keyword.toLowerCase().trim();
    console.log(keyword);
    let newWiki;
    Wikipedia.findByKeyword(keyword)
        .then((result) => {
            if (!result) {
                console.log(!result);
                let url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${keyword}&format=json`;
                return promisedRequest(url);
            } else {
                return result;
            }
        })
        .then((wikiData) => {
            if (!wikiData["_id"]) {
                console.log("SaVING");

                let searchedKeyword = wikiData[0];
                let matchedKeyword = wikiData[1];
                let webURL = wikiData[3];

                test(matchedKeyword, searchedKeyword, webURL, (result) => {
                    return result;
                });

                // newWiki.save();
                // return wikiData;
            } else {
                res.render("displaywiki.ejs", {
                    wikiItems: wikiData,
                });
            }
        })
        .then((result) => {
            const newWiki = new Wikipedia(
                result.searchedKeyword,
                result.matchedKeyword,
                result.summary,
                result.imgURL,
                result.webURL
            );
            return newWiki;
        })
        .then((newWiki) => {
            return newWiki.save();
        })
        .then(() => {
            return Wikipedia.findByKeyword(keyword);
        })
        .then((result) => {
            console.log(result);
            res.render("displaywiki.ejs", {
                wikiItems: result,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

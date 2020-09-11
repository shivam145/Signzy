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
                newWiki = new Wikipedia(
                    wikiData[0],
                    wikiData[1],
                    wikiData[2],
                    wikiData[3]
                );
                return newWiki;
            } else {
                res.render("displaywiki.ejs", {
                    wikiItems: wikiData,
                });
            }
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

const getDB = require("../util/getInstance").getDB;

class Wikipedia {
    constructor(searchedKeyword, matchedkeywords, summary, webURL) {
        this.searchedKeyword = searchedKeyword;
        this.matchedkeywords = matchedkeywords;
        this.summary = summary;
        this.webURL = webURL;
    }

    save() {
        let db = getDB();
        return db.collection("wiki").insertOne(this);
    }

    static findByKeyword(searchKeyword) {
        let db = getDB();
        return db
            .collection("wiki")
            .findOne({
                searchedKeyword: searchKeyword,
            })
            .then((result) => {
                // console.log(result);
                return result;
            })
            .catch((err) => {
                console.log(err);
                return err;
            });
    }
}

module.exports = Wikipedia;

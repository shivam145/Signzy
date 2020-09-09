const getDB = require("../util/getInstance").getDB;
const mongodb = require("mongodb");
class Wikipedia {
    constructor(searchedKeyword, matchedkeywords, body, webURL) {
        this.searchedKeyword = searchedKeyword;
        this.matchedkeywords = matchedkeywords;
        this.body = body;
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

    static findByWikiId(wikiId) {
        let db = getDB();
        return db
            .collection("wiki")
            .findOne({
                _id: new mongodb.ObjectID(wikiId),
            })
            .then((result) => {
                return result;
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

module.exports = Wikipedia;

// const getDB = require("../util/getInstance").getDB;

// class Wikipedia {
//     constructor(searchedKeyword, matchedkeywords, summary, webURL) {
//         this.searchedKeyword = searchedKeyword;
//         this.matchedkeywords = matchedkeywords;
//         this.summary = summary;
//         this.webURL = webURL;
//     }

//     save() {
//         let db = getDB();
//         return db.collection("wiki").insertOne(this);
//     }

//     static findByKeyword(searchKeyword) {
//         let db = getDB();
//         return db
//             .collection("wiki")
//             .findOne({
//                 searchedKeyword: searchKeyword,
//             })
//             .then((result) => {
//                 // console.log(result);
//                 return result;
//             })
//             .catch((err) => {
//                 console.log(err);
//                 return err;
//             });
//     }
// }

// module.exports = Wikipedia;

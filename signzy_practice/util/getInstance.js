const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let uri =
    "mongodb+srv://shivam145:shivam145@testcluster.pl4tq.mongodb.net/Signzy";
let _db;
const mongoConnect = (callback) => {
    MongoClient.connect(uri)
        .then((client) => {
            console.log("DB connection successful");
            _db = client.db();
            callback();
        })
        .catch((err) => {
            console.log(err);
        });
};

const getDB = () => {
    if (_db) return _db;
    return null;
};

module.exports.mongoConnect = mongoConnect;
module.exports.getDB = getDB;

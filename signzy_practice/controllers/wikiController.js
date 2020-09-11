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
  let keyword = req.params.keyword.toLowerCase().trim();
  // req.body.keyword.toLowerCase().trim();
  console.log(keyword);
  let newWiki;
  let searchedKeyword;
  let matchedKeyword;
  let webURL;

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
        console.log("Saving");

        searchedKeyword = wikiData[0];
        matchedKeyword = wikiData[1];
        webURL = wikiData[3];

        console.log("hey this is a before callback");
        let promises = [];
        for (let i = 0; i < matchedKeyword.length; i++) {
          let keyword = matchedKeyword[i].trim();
          let url = `https://en.wikipedia.org/api/rest_v1/page/summary/${keyword}`;
          promises[i] = promisedRequest(url);
        }

        return Promise.all(promises);
        console.log("hey this is a after callback");
      } else {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "*");
        res.setHeader("Access-Control-Allow-Headers", "*");
        res.json({
          wikiItems: wikiData,
        });
      }
    })
    .then((result) => {
      const newWiki = new Wikipedia(
        searchedKeyword,
        matchedKeyword,
        result,
        webURL
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
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "*");
      res.setHeader("Access-Control-Allow-Headers", "*");
      res.json({
        wikiItems: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.getWikiPage = (req, res, next) => {
  console.log("inside wiki log ", req.params.pageId);
  const wikiId = req.params.wikiId;
  const pageId = req.params.pageId;
  Wikipedia.findByWikiId(wikiId)
    .then((result) => {
      result.pageId = pageId;
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "*");
      res.setHeader("Access-Control-Allow-Headers", "*");
      res.json({
        wikiData: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

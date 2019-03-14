const express = require("express");
const amazon = require("amazon-product-api");
const router = new express.Router();

const client = amazon.createClient({
  awsId: "AKIAJOZAOCMSDD6LDEHQ",
  awsSecret: "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"
});

router.post("/info", async (req, res) => {
  const regex = /dp\/(.*?)\//gm;
  let resultRegex = regex.exec(req.body.amazonUrl);
  try {
    if (resultRegex === null) throw Error("Invalid Url Provided");
    let asin = resultRegex[1];
    let result = await client.itemLookup({
      itemId: asin,
      responseGroup: "Medium,Reviews,SalesRank"
    });
    let bookInfo = {
      title: result[0].ItemAttributes[0].Title[0],
      authorName: result[0].ItemAttributes[0].Author[0],
      synopsis: result[0].EditorialReviews[0].EditorialReview[0].Content[0],
      cover: result[0].LargeImage[0].URL[0],
      salesRank: result[0].SalesRank ? result[0].SalesRank[0] : "FREE",
      reviewsIframe: result[0].CustomerReviews[0].IFrameURL[0]
    };
    return res.status(200).json({
      success: true,
      message: "Kindle book info fetched successfully!",
      bookInfo
    });
  } catch (error) {
    let reportError = "defaultError";
    error.message
      ? (reportError = error.message)
      : (reportError = error[0].Error[0].Message[0]);
    return res.status(200).json({
      success: false,
      message: reportError
    });
  }
});

module.exports = router;

const express = require("express");
const Udemy = require("udemy-api");
const router = new express.Router();

udemyApiClient = new Udemy(
  "j9VJ4Dmj9OzqGtQcQGQf07sDHyOzKvdLz5oLDy7o",
  "uCmB4RhaDUwWo47V3KrvVlYaD24UHCABylox1UwIahK3DnD4bPtfyE7yerHcLsZMBesEYGhP9Qfet77ELUrf55TMRIId2BLoj2ujBc48CaqkoLL2y2Kn8M5hvupskNmb"
);

router.post("/info", async (req, res) => {
  const regex = /udemy.com\/(.*?)\//gm;
  let resultRegex = regex.exec(req.body.udemyUrl);
  try {
    if (resultRegex === null) throw Error("Invalid Url Provided");
    let course = resultRegex[1];
    const Udemy = require('udemy-api');
    udemyApiClient = new Udemy('your Udemy API client ID', 'Your Udemy API client secret');
    let courseDetails = await udemyApiClient.get(`courses${course}?fields[course]=title,headline,description`);
    return res.status(200).json({
      success: true,
      message: "Udemy course info fetched successfully!",
      course: courseDetails
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

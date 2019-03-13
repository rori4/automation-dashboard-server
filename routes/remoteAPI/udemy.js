const { htmlToTextFormat } = require("../../utilities/customHelpers");
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
    await udemyApiClient.get(
      `courses/${course}?fields[course]=title,description,image_480x270,num_reviews,num_reviews,visible_instructors,price,status_label`,
      function(err, response, courseDetails) {
        if (err) return console.error(err);
        let course = JSON.parse(courseDetails);
        let courseInfo = {
          title: course.title,
          instructorName: course.visible_instructors[0].display_name,
          summary: htmlToTextFormat(course.description),
          courseCover: course.image_480x270,
          price: course.price ? course.price : "FREE",
          numberOfReviews: course.num_reviews
        };
        return res.status(200).json({
          success: true,
          message: "Udemy course info fetched successfully!",
          course: courseInfo
        });
      }
    );
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

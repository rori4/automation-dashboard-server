const express = require("express");
const authCheck = require("../config/auth-check");
const BookPromotion = require("../models/Book/BookPromotion");
const CoursePromotion = require("../models/Course/CoursePromotion");
const GiveawayPromotion = require("../models/Giveaway/GiveawayPromotion");
const AmazonRank = require("../models/Book/AmazonRank");
const Book = require("../models/Book/Book");
const Giveaway = require("../models/Giveaway/Giveaway");
const Course = require("../models/Course/Course");

const router = new express.Router();

//TODO: Validate Actual Book Submit!!!

router.post("/save", authCheck, async (req, res, next) => {
  try {
    let promotion = req.body;
    let type = promotion.type;
    const id = promotion._id;
    let Model = retrieveType(type);
    let ModelPromotion = retrieveTypePromotion(type);
    let message;
    if (!id) {
      let itemFound = await Model.findById(req.body.parentId);
      promotion[type] = itemFound;
      promotion.user = req.user;
      let promotionAdded = await ModelPromotion.create(promotion);
      await promotionAdded.save();
      message = "Promotion added successfully!";
    } else {
      delete promotion._id;
      await ModelPromotion.findOneAndUpdate({ _id: id }, promotion);
      message = "Promotion edited successfully!";
    }
    return res.status(200).json({
      success: true,
      message
    });
  } catch (error) {
    console.log(error);
    let message = "Something went wrong :( Check the form for errors.";
    if (error.code === 11000) {
      message = "Book with the given name already exists.";
    }
    return res.status(200).json({
      success: false,
      message: message
    });
  }
});

router.delete("/delete", authCheck, async (req, res, next) => {
  try {
    let íd = req.query.id;
    let type = req.query.type;
    let ModelPromotion = retrieveTypePromotion(type)
    await ModelPromotion.findOneAndDelete(íd);
    return res.status(200).json({
      success: true,
      message: "Promotion deleted successfully!"
    });
  } catch (error) {
    console.log(error);
    let message = "Something went wrong :(";
    return res.status(200).json({
      success: false,
      message: message
    });
  }
});

router.get("/get", authCheck, async (req, res, next) => {
  try {
    let bookId = req.query.id;
    let book = await Book.findOne({ _id: bookId, user: req.user }).populate(
      "rankHistory"
    );
    return res.status(200).json({
      success: true,
      message: "Amazon book fetched successfully!",
      book
    });
  } catch (error) {
    let message = "Something went wrong :(";
    return res.status(200).json({
      success: false,
      message: message
    });
  }
});

router.get("/list", authCheck, async (req, res) => {
  try {
    //TODO: Feth by user
    let type = req.query.type;
    let Model = retrieveTypePromotion(type);
    let books = await Model.find({ user: req.user }).populate(type);
    return res.status(200).json({
      success: true,
      message: "Promotions fetched successfully",
      data: books
    });
  } catch (error) {
    console.log(error);
    const message = "Something went wrong when fetching data :(";
    return res.status(200).json({
      success: false,
      message: message
    });
  }
});

// router.get("/list", authCheck, async (req, res) => {
//   try {
//     //TODO: Feth by user
//     let search = req.query.search;
//     let query =
//       search !== ""
//         ? {
//             user: req.user,
//             $or: [
//               { title: { $regex: search, $options: "i" } },
//               { authorName: { $regex: search, $options: "i" } },
//               { authorEmail: { $regex: search, $options: "i" } },
//               { keywords: { $regex: search, $options: "i" } }
//             ]
//           }
//         : { user: req.user };
//     let promotions = await BookPromotion.find(query).populate("Book");
//     return res.status(200).json({
//       success: true,
//       message: "Promotions fetched successfully",
//       data: promotions
//     });
//   } catch (error) {
//     console.log(error);
//     const message = "Something went wrong when fetching data :(";
//     return res.status(200).json({
//       success: false,
//       message: message
//     });
//   }
// });

function retrieveTypePromotion(type) {
  switch (type) {
    case "book":
      return BookPromotion;
    case "giveaway":
      return GiveawayPromotion;
    case "course":
      return CoursePromotion;
  }
}

function retrieveType(type) {
  switch (type) {
    case "book":
      return Book;
    case "giveaway":
      return Giveaway;
    case "course":
      return Course;
  }
}

module.exports = router;

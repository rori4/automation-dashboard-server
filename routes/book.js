const express = require("express");
const authCheck = require("../config/auth-check");
const Book = require("../models/Book/Book");
const BookPromotion = require("../models/Book/BookPromotion");
const AmazonRank = require("../models/Book/AmazonRank");

const router = new express.Router();

//TODO: Validate Actual Book Submit!!!
function validateBookCreateForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = "";

  payload.price = parseFloat(payload.price);

  if (
    !payload ||
    typeof payload.title !== "string" ||
    payload.title.length < 3
  ) {
    isFormValid = false;
    errors.name = "Book name must be at least 3 symbols.";
  }

  if (
    !payload ||
    typeof payload.description !== "string" ||
    payload.description.length < 10 ||
    payload.description.length > 200
  ) {
    isFormValid = false;
    errors.description =
      "Description must be at least 10 symbols and less than 120 symbols.";
  }

  if (!payload || !payload.price || payload.price < 0) {
    isFormValid = false;
    errors.price = "Price must be a positive number.";
  }

  if (
    !payload ||
    typeof payload.image !== "string" ||
    !(
      payload.image.startsWith("https://") ||
      payload.image.startsWith("http://")
    ) ||
    payload.image.length < 14
  ) {
    isFormValid = false;
    errors.image =
      "Please enter valid Image URL. Image URL must be at least 14 symbols.";
  }

  if (!isFormValid) {
    message = "Check the form for errors.";
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

router.post("/save", authCheck, async (req, res, next) => {
  try {
    let book = req.body;
    const id = book._id;
    let message;
    if (!id) {
      book.user = req.user;
      let bookAdded = await Book.create(book);
      if (book.salesRank !== "FREE") {
        let bookRank = await AmazonRank.create({
          rank: book.salesRank,
          book: bookAdded
        });
        bookAdded.rankHistory.push(bookRank);
      }
      await bookAdded.save();
      message = "Amazon book added successfully!";
    } else {
      delete book._id;
      // if(req.user._id !== book.user._id) throw Error("This is not your book") //TODO: ADMIN
      let updatedBook = await Book.findOneAndUpdate({ _id: id }, book);
      message = "Amazon book edited successfully!";
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
    let bookId = req.query.id;
    await Book.findOneAndDelete(bookId);
    return res.status(200).json({
      success: true,
      message: "Amazon book deleted successfully!"
    });
  } catch (error) {
    console.log(error);
    let message = "Something went wrong :( Check the form for errors.";
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

router.post("/promotion", authCheck, async (req, res, next) => {
  try {
    let bookPromotion = req.body;
    const id = bookPromotion._id;
    let message;
    if (!id) {
      let book = await Book.findOne(bookPromotion.book);
      bookPromotion.book = book;
      let promotion = await BookPromotion.create(bookPromotion);
      await promotion.save();
      message = "Book promotion added successfully!";
    } else {
      delete bookPromotion._id;
      // if(req.user._id !== book.user._id) throw Error("This is not your book") //TODO: ADMIN
      await Book.findOneAndUpdate({ _id: id }, bookPromotion);
      message = "Book edited successfully!";
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

router.get("/list", authCheck, async (req, res) => {
  try {
    //TODO: Feth by user
    let search = req.query.search;
    let query =
      search !== ""
        ? {
            user: req.user,
            $or: [
              { title: { $regex: search, $options: "i" } },
              { authorName: { $regex: search, $options: "i" } },
              { email: { $regex: search, $options: "i" } },
              { keywords: { $regex: search, $options: "i" } }
            ]
          }
        : { user: req.user };
    let books = await Book.find(query);
    return res.status(200).json({
      success: true,
      message: "Books fetched successfully",
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

router.get("/all", authCheck, async (req, res) => {
  try {
    //TODO: Feth by user
    let search = req.query.search;
    let query =
      search !== ""
        ? {
            $or: [
              { title: { $regex: search, $options: "i" } },
              { authorName: { $regex: search, $options: "i" } },
              { email: { $regex: search, $options: "i" } },
              { keywords: { $regex: search, $options: "i" } }
            ]
          }
        : { };
    let books = await Book.find(query);
    return res.status(200).json({
      success: true,
      message: "Books fetched successfully",
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

module.exports = router;

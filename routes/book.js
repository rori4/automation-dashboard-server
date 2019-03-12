const express = require("express");
const authCheck = require("../config/auth-check");
const Book = require("../models/Amazon/Book");

const router = new express.Router();

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

router.post("/add", authCheck, async (req, res, next) => {
  try {
    let book = req.body;
    book.user = req.user;
    let bookAdded = await Book.create(book);
    await bookAdded.save();
    return res.status(200).json({
      success: true,
      message: "Amazon book added successfully!"
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
                {title: { $regex: search, $options: "i" }}, 
                {authorName: { $regex: search, $options: "i" }},
                {authorEmail: { $regex: search, $options: "i" }},
                {keywords: { $regex: search, $options: "i" }}
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

module.exports = router;

const express = require("express");
const authCheck = require("../config/auth-check");
const Course = require("../models/Course/Course");

const router = new express.Router();

router.post("/save", authCheck, async (req, res, next) => {
  try {
    let course = req.body;
    const id = course._id;
    let message;
    if (!id) {
      course.user = req.user;
      let courseAdded = await Course.create(course);
      await courseAdded.save();
      message = "Udemy course added successfully!"
    } else {
      delete course._id;
      // if(req.user._id !== course.user._id) throw Error("This is not your course") //TODO: ADMIN
      await Course.findOneAndUpdate({ _id: id }, course);
      message = "Udemy course edited successfully!"
    }
    return res.status(200).json({
      success: true,
      message
    });
  } catch (error) {
    console.log(error);
    let message = "Something went wrong :( Check the form for errors.";
    if (error.code === 11000) {
      message = "Course with the given name already exists.";
    }
    return res.status(200).json({
      success: false,
      message: message
    });
  }
});

router.delete("/delete", authCheck, async (req, res, next) => {
  try {
    let courseId = req.query.id;;
    await Course.findOneAndDelete(courseId)
    return res.status(200).json({
      success: true,
      message: "Udemy course deleted successfully!"
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
    let courseId = req.query.id;
    let course = await Course.findOne({ _id: courseId, user: req.user })
    return res.status(200).json({
      success: true,
      message: "Udemy course fetched successfully!",
      course
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
    let search = req.query.search;
    let query =
      search !== ""
        ? {
            user: req.user,
            $or: [
              { title: { $regex: search, $options: "i" } },
              { authorName: { $regex: search, $options: "i" } },
              { authorEmail: { $regex: search, $options: "i" } },
              { keywords: { $regex: search, $options: "i" } }
            ]
          }
        : { user: req.user };
    let books = await Course.find(query);
    return res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
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
              { authorEmail: { $regex: search, $options: "i" } },
              { keywords: { $regex: search, $options: "i" } }
            ]
          }
        : { };
    let books = await Course.find(query);
    return res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
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

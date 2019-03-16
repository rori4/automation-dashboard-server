const express = require("express");
const authCheck = require("../config/auth-check");
const Giveaway = require("../models/Giveaway/Giveaway");
const cloud = require("./remoteAPI/cloudinary");

const router = new express.Router();

router.post("/save", authCheck, async (req, res, next) => {
  try {
    let giveaway = req.body;
    if (req.files) {
      let file = req.files.cover.data;
      giveaway.cover = await cloud.uploadFileBuffer(file);
    }
    const id = giveaway._id;
    let message;
    if (!id) {
      giveaway.user = req.user;
      let giveawayAdded = await Giveaway.create(giveaway);
      await giveawayAdded.save();
      message = "Giveaway added successfully!";
    } else {
      delete giveaway._id;
      // if(req.user._id !== giveaway.user._id) throw Error("This is not your giveaway") //TODO: ADMIN
      await Giveaway.findOneAndUpdate({ _id: id }, giveaway);
      message = "Giveaway edited successfully!";
    }
    return res.status(200).json({
      success: true,
      message
    });
  } catch (error) {
    console.log(error);
    let message = "Something went wrong :( Check the form for errors.";
    if (error.code === 11000) {
      message = "Giveaway with the given name already exists.";
    }
    return res.status(200).json({
      success: false,
      message: message
    });
  }
});

router.delete("/delete", authCheck, async (req, res, next) => {
  try {
    let giveawayId = req.query.id;
    await Giveaway.findOneAndDelete(giveawayId);
    return res.status(200).json({
      success: true,
      message: "Giveaway deleted successfully!"
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
    let giveawayId = req.query.id;
    let giveaway = await Giveaway.findOne({ _id: giveawayId, user: req.user });
    return res.status(200).json({
      success: true,
      message: "Udemy giveaway fetched successfully!",
      giveaway
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
              { prize: { $regex: search, $options: "i" } },
              { sponsorName: { $regex: search, $options: "i" } },
              { sponsorEmail: { $regex: search, $options: "i" } }
            ]
          }
        : { user: req.user };
    let books = await Giveaway.find(query);
    return res.status(200).json({
      success: true,
      message: "Giveaways fetched successfully",
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
              { prize: { $regex: search, $options: "i" } },
              { sponsorName: { $regex: search, $options: "i" } },
              { sponsorEmail: { $regex: search, $options: "i" } }
            ]
          }
        : { };
    let books = await Giveaway.find(query);
    return res.status(200).json({
      success: true,
      message: "Giveaways fetched successfully",
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

const authRoutes = require("../routes/auth");
const bookRoutes = require("../routes/book");
const courseRoutes = require("../routes/course");
const giveawayRoutes = require("../routes/giveaway");
const promotionRoutes = require("../routes/promotions");
const amazonRoutes = require("../routes/remoteAPI/amazon");
const udemyRoutes = require("../routes/remoteAPI/udemy");

module.exports = app => {
  app.use("/auth", authRoutes);
  app.use("/amazon", amazonRoutes);
  app.use("/udemy", udemyRoutes);
  app.use("/books", bookRoutes);
  app.use("/courses", courseRoutes);
  app.use("/giveaways", giveawayRoutes);
  app.use("/promotions", promotionRoutes);
};

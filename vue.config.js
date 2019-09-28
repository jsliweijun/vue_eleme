const sellerData = require("./data.json");

module.exports = {
  publicPath: process.env.NODE_ENV === "production"?  "/vue_eleme/":  "/",
  devServer: {
    port: 8080,
    before( app ) {
      //返回日期数组
      app.get("/api/seller", (req, res) => {
        res.json({
          errorCode:0,
          data :sellerData.seller
        });
      });
      app.get("/api/goods", (req, res) => {
        res.json({
          errorCode:0,
          data :sellerData.goods
        });
      });
      app.post("/api/ratings", (req, res) => {
        res.json({
          errorCode:0,
          data :sellerData.ratings
        });
      });
    }
  }
};
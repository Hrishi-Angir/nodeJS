const express = require("express");
const Category = require("./../models/category");
const Product = require("../models/product");
const product = require("../models/product");
const router = express.Router();

// router.get("/", (req, res) => {
//   //   res.send("All Categorys");
//   res.render("index", { title: "E-commerce" });
// });

router.post("/category/add", (req, res) => {
  const category = new Category({
    categoryName: req.body.categoryName,
  });

  category.save((err) => {
    if (err) {
      res.json({ message: err.message, type: "danger" });
    } else {
      req.session.message = {
        success: true,
        message: "Category created Successfully!",
      };
      res.redirect("/");
    }
  });
});

// get all category  route
router.get("/", (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      res.json({ message: err.message });
    } else {
      res.render("index", {
        title: "categories",
        categories: categories,
      });
    }
  });
});

router.get("/category/add", (req, res) => {
  res.render("add_category", { title: "Add Category" });
});

// edit an category
router.get("/category/edit/:id", (req, res) => {
  let id = req.params.id;
  Category.findById(id, (err, category) => {
    if (err) {
      res.redirect("/");
    } else {
      if (category == null) {
        res.redirect("/");
      } else {
        res.render("edit_category", {
          title: "Edit Category",
          category: category,
        });
      }
    }
  });
});

// update user route
router.post("/category/edit/:id", (req, res) => {
  let id = req.params.id;
  Category.findByIdAndUpdate(
    id,
    {
      categoryName: req.body.categoryName,
    },
    (err, result) => {
      if (err) {
        res.json({ message: err.message, type: "danger" });
      } else {
        req.session.message = {
          type: "success",
          message: "Category Updated successfully!",
        };
        res.redirect("/");
      }
    }
  );
});

// delete category route

router.get("/category/delete/:id", (req, res) => {
  let id = req.params.id;
  Category.findByIdAndRemove(id, (err, result) => {
    if (err) {
      res.json({ message: err.message });
    } else {
      req.session.message = {
        type: "info",
        message: "Category deleted successfully!",
      };
      res.redirect("/");
    }
  });
});

//---------------------------------------------products routes----------------------------------

// get all categories in drop down
router.get("/product/add", (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      res.json({ message: err.message });
    } else {
      res.render("add_product", {
        title: "categories",
        categories: categories,
      });
    }
  });
});

// add product
router.post("/product/add", (req, res) => {
  const product = new Product({
    productName: req.body.productName,
    categoryId: req.body.categoryId,
  });

  product.save((err) => {
    if (err) {
      res.json({ message: err.message, type: "danger" });
    } else {
      req.session.message = {
        success: true,
        message: "Product created Successfully!",
      };
      res.redirect("/");
    }
  });
});

// edit product
router.post("/product/edit/:id", (req, res) => {
  let id = req.params.id;
  product.findByIdAndUpdate(
    id,
    {
      productName: req.body.productName,
    },
    (err, result) => {
      if (err) {
        res.json({ message: err.message, type: "danger" });
      } else {
        req.session.message = {
          type: "success",
          message: "Product Updated successfully!",
        };
        res.redirect("/");
      }
    }
  );
});

// delete products
router.get("/product/delete/:id", (req, res) => {
  let id = req.params.id;
  Product.findByIdAndRemove(id, (err, result) => {
    if (err) {
      res.json({ message: err.message });
    } else {
      req.session.message = {
        type: "info",
        message: "Product deleted successfully!",
      };
      res.redirect("/");
    }
  });
});

module.exports = router;

const express = require("express");
const blogController = require("../controllers/blogController");

const blogRouter = express.Router();

blogRouter.get("/create", blogController.blog_create_get);
blogRouter.get("/", blogController.blog_index);
blogRouter.post("/", blogController.blog_create_post);
blogRouter.get("/:id", blogController.blog_details);
blogRouter.delete("/:id", blogController.blog_delete);

module.exports = blogRouter;

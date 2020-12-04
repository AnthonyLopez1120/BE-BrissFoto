const express = require("express");
const Blog = require("./blog-model.js");
const router = express.Router();

router.get("/", (req, res) => {
  Blog.find()
    .then((blog) => {
      res.json(blog);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get blogs", err });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Blog.findById(id)
    .then((blog) => {
      blog
        ? res.json(blog)
        : res.status(404).json({ message: "Failed to get blog" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get blog by id", err });
    });
});

router.post("/", (req, res) => {
  const blogData = req.body;

  Blog.add(blogData)
    .then((blog) => {
      res.status(201).json(blog);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "There was an error in adding the blog" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Blog.findById(id)
    .then((blog) => {
      if (blog) {
        Blog.update(changes, id).then((updateBlog) => {
          res.json(updateBlog);
        });
      } else {
        res.status(404).json({ message: "No such blog with that ID exixst" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "There was an error updating the blog", err });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Blog.remove(id)
    .then((deleted) => {
      if (deleted) {
        res.json({ remove: deleted });
      } else {
        res
          .status(404)
          .json({ errorMessage: "No such blog with that ID exist" });
      }
    })
    .catch((err) => {
      res
        .json(500)
        .json({ message: "There was an error in deleting you blog", err });
    });
});

module.exports = router;

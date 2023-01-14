const express = require("express");

const dotenv = require("dotenv");

const app = express();
dotenv.config();

let Posts = [
  {
    id: 1,
    title: "nodeJs V12",
     body:"It is a famous languages Backend"
  },
  {
    id: 2,
    title: "pyson",
     body:"It is a second languages Backend"
  },
  {
    id: 3,
    title: "php",
     body:"It is a Third languages Backend"
  }
];
app.use(express.json());
app.get("/GetAllPosts", (req, res, next) => {
  res.json({ message: "Done", postData: Posts });
});

app.get("/getPostReversed", (req, res, next) => {
  const copyPosts = [...Posts];
  const postReversed = copyPosts.reverse();
  res.json({ message: "Done", postData: postReversed });
});
app.get("/SearchPost", (req, res, next) => {
  const { id } = req.body;
  const post = Posts.find((post) => post.id == id);
  if (post) {
    res
      .status(200)
      .json({ message: "post is founded successfully ", data: post });
  } else {
    res.status(404).json({ message: "This post is not found in database" });
  }
});
app.post("/Addpost", (req, res, next) => {
  const { title,body, id } = req.body;

  Posts.push({ id, title, body });
  return res.json({ message: "Post is added successfully" });
});
app.put("/updatepost", (req, res, next) => {
  const {  id ,title ,body} = req.body;
  const Post = Posts.find((post) => post.id == id);
  if (Post) {
    Post.title = title ? title : Post.title;
    Post.body= body ? body : Post.body;

    return res.status(200).json({ message: "post is updated successfully" });
  }

  return res.json({ message: "this post is not Exists " });
});
app.delete("/deletePost", (req, res, next) => {
  const { id } = req.body;
  const post = Posts.find((post) => post.id == id);
  if (post) {
    const index = Posts.indexOf(post);
    Posts.splice(index, 1);
    res.status(200).json({ message: "post is deleted successfully" });
  } else {
    res.status(404).json({ message: "This post is not found in database" });
  }
});

app.all("*", (req, res, next) => {
  return res.json({ message: "This rout Is not Found Try again please " });
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

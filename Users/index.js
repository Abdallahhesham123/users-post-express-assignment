const express = require("express");

const dotenv = require("dotenv");

const app = express();
dotenv.config();

let Users = [
  {
    id: 1,
    name: "mai",
    age: 29,
    email: "abdallahhesham@gmail.com",
    password: 123,
  },
  {
    id: 2,
    name: "amany",
    age: 30,
    email: "abdallahhesham456@gmail.com",
    password: 123,
  },
  {
    id: 3,
    name: "abdallah",
    age: 60,
    email: "abdallahhesham456@gmail.com",
    password: 123,
  },
  {
    id: 4,
    name: "hesham",
    age: 60,
    email: "abdallahhesham789@gmail.com",
    password: 123,
  },
];
app.use(express.json());
app.get("/GetAllUsers", (req, res, next) => {
  res.json({ message: "Done", userData: Users });
});

app.get("/getUserSorted", (req, res, next) => {
  const UserSorted = Users.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  res.json({ message: "Done", userData: UserSorted });
});
app.get("/SearchUser", (req, res, next) => {
  const { id } = req.body;
  const user = Users.find((user) => user.id == id);
  if (user) {
    res
      .status(200)
      .json({ message: "user is founded successfully ", data: user });
  } else {
    res.status(404).json({ message: "This user is not found in database" });
  }
});
app.post("/AddUser", (req, res, next) => {
  const { name, age, email, password, id } = req.body;
  const CheckUser = Users.find((user) => {
    return user.email == email;
  });
  if (CheckUser) {
    return res.json({ message: "Email Exist" });
  }

  Users.push({ id, name, age, email, password });
  return res.json({ message: "User is added successfully" });
});
app.put("/updateuser", (req, res, next) => {
  const { name, email, password, age, id } = req.body;
  const checkUser = Users.find((user) => user.id == id);
  if (checkUser) {
    checkUser.name = name ? name : checkUser.name;
    checkUser.email = email ? email : checkUser.email;
    checkUser.password = password ? password : checkUser.password;
    checkUser.age = age ? age : checkUser.age;
    return res.status(200).json({ message: "user is updated successfully" });
  }

  return res.json({ message: "this user is not Exists " });
});
app.delete("/deleteUser", (req, res, next) => {
  const { id } = req.body;
  const user = Users.find((user) => user.id == id);
  if (user) {
    const index = Users.indexOf(user);
    Users.splice(index, 1);
    res.status(200).json({ message: "user is deleted successfully" });
  } else {
    res.status(404).json({ message: "This user is not found in database" });
  }
});

app.all("*", (req, res, next) => {
  return res.json({ message: "This rout Is not Found Try again please " });
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

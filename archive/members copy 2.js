const express = require("express");
const app = express();
const uuid = require("uuid");
const router = express.Router();
const Member = require("../models/members");
const mongoose = require("mongoose"); // Installs mongoose

const members = [];
getMembers();

async function getMembers() {
  await Member.find()
    .then((result) => {
      result.forEach((member) => members.push(member));
      //   console.log(members);
      return members;
    })
    .catch((error) => console.log(`An error happened: ${error}`));
}

async function newMember(data) {
  await Member.create(data)
    .then((user) => console.log(`The user is saved. ${user}`))
    .catch((error) =>
      console.log("An error happened while saving a new user:", error)
    );
}

// GET ROUTE - GETTING ALL MEMBERS
router.get("/", async (req, res) => {
  await getMembers();
  res.json(members);
});

// GET ROUTE - SINGLE MEMBER
const idFilter = (req) => (member) => member.id === parseInt(req.params.id);
router.get("/:id", (req, res) => {
  const found = members.some(idFilter(req));
  if (found) {
    res.json(members.filter(idFilter(req)));
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// // POST ROUTE - CREATING A NEW MEMBER
router.post("/", async (req, res) => {
  const addMember = {
    ...req.body,
    id: uuid.v4(),
    status: "active",
    email: req.body.email,
    name: req.body.name,
  };
  if (!addMember.name || !addMember.email) {
    return res.status(400).json({ msg: "Please include a name and email" });
  }
  await newMember(addMember);
  console.log(this, "<------ this");
  res.redirect("/");
});

// // UPDATE ROUTE - UPDATE MEMBER
// router.put("/:id", (req, res) => {
//   const found = members.some(idFilter(req));
//   if (found) {
//     members.forEach((member, i) => {
//       if (idFilter(req)(member)) {
//         const updMember = { ...member, ...req.body };
//         members[i] = updMember;
//         res.json({ msg: "Member updated", updMember });
//       }
//     });
//   } else {
//     res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
//   }
// });
function doSomething() {
    alert('clicked')
}

document.body.addEventListener('click', doSomething());



// DELETE ROUTE - DELETE MEMBER
router.post("/delete", async (req, res) => {
const deletingMember = {
    ...req.body,
    id: req.body.id,
  };
  console.log(deletingMember);
  res.send(deletingMember);
  // const deleteMember = {
  //     ...req.body,
  //     id: uuid.v4(),
  //     status: "active",
  //     email: req.body.email,
  //     name: req.body.name,
  //   };
  // res.send('Got a DELETE request')
  // console.log('Got a DELETE request')
  //   const idFilter = (req) => (member) => member.id === parseInt(req.params.id);
  //   const found = members.some(idFilter(req));
  //   if (found) {
  //     res.json({
  //       msg: "Member deleted",
  //       members: members.filter((member) => !idFilter(req)(member)),
  //     });
  //   } else {
  //     res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  //   }
});

module.exports = router;

const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const Member = require("../../models/members");

const members = [];
getMembers();

async function getMembers() {
  await Member.find()
    .then((result) => {
      result.forEach((member) => {
      members.push(member);//   console.log(members);
      });
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
  res.redirect("/");
});

// // UPDATE ROUTE - UPDATE MEMBER
router.post("/:id/update", async (req, res) => {
    const updateMember = {
        ...req.body,
      };
    await Member.findOneAndUpdate({ id: req.params.id }, { email: updateMember.email, name: updateMember.name }, { new: true });
    res.redirect('/');
});

// DELETE ROUTE - DELETE MEMBER
router.post("/:id/delete", async (req, res) => {
    console.log(req.params.id);
    await Member.find({ id: req.params.id }).deleteOne().exec();
    res.redirect('/');
});

module.exports = router;

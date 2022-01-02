const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const Member = require('../models/members');
const mongoose = require("mongoose"); // Installs mongoose


// const members = require('../../index');

// GET ROUTE - GETTING ALL MEMBERS
router.get("/", (req, res) => res.json(members));

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

// POST ROUTE - CREATING A NEW MEMBER
router.post("/", (req, res) => {
  const newMember = {
    ...req.body,
    id: uuid.v4(),
    status: "active",
    email: 'testemail',
    name: "testname",
  };
  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "Please include a name and email" });
  }
  members.push(newMember);
  // res.json(members);
  res.redirect("/");
});

// UPDATE ROUTE - UPDATE MEMBER
router.put('/:id', (req, res) => {
  const found = members.some(idFilter(req));
  if (found) {
    members.forEach((member, i) => {
      if (idFilter(req)(member)) {

        const updMember = {...member, ...req.body};
        members[i] = updMember;
        res.json({ msg: 'Member updated', updMember });
      }
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// DELETE ROUTE - DELETE MEMBER
router.delete("/:id", (req, res) => {
  const found = members.some(idFilter(req));
  if (found) {
    res.json({
      msg: "Member deleted",
      members: members.filter((member) => !idFilter(req)(member)),
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

module.exports = router;

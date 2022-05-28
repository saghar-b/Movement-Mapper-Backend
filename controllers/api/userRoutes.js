const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require("bcrypt");
const Op = require('sequelize').Op;

// login
router.post('/login', async (req, res) => {
  try {
    const foundUser = await User.findOne({
      where: {
        user_name: req.body.user_name
      }
    })
    if (!foundUser) {
      return res.status(400).json({ msg: "wrong login credentials" })
    }
    if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      req.session.user = {
        id: foundUser.id,
        user_name: foundUser.user_name,
        offset: req.body.timeZoneOffset,
        logged_in: true
      }
      const today = new Date();
      const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date + ' ' + time;
      const invites = await Event.findAll({
        include: [{
          model: User,
          as: 'attendees',
        }],
        where: {
          '$attendees.id$': req.session.user?.id,
          '$attendees.attendee.rsvp_status$': 0,
          creator_id: { [Op.ne]: req.session.user?.id },
          start_time: { [Op.gt]: dateTime },
        }
      })
      req.session.user.noti = invites.length;
      return res.json(foundUser)
    } else {
      return res.status(400).json({ msg: "wrong login credentials" })
    }
  }
  catch (err) {
    res.status(500).json({ msg: "an error occured", err });
  }
});


// signup
router.post("/signup", (req, res) => {
  User.create(req.body)
    .then(newUser => {
      req.session.user = {
        id: newUser.id,
        user_name: newUser.user_name,
        logged_in: true
      }
      res.json(newUser);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "This username  exist.Please use another username ", err });
    });
});
module.exports = router;

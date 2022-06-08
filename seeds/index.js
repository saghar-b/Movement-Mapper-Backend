const sequelize = require("../config/connection");
const moment = require("moment");
const { User, Challenge, Scores, Logs } = require("../models");

const users = [
    {
        user_name: "Saghar",
        email: "behinaeen.saghar@gmail.com",
        password: "password",
    },
    {
        user_name: "Nicole",
        email: "Nicole@gmail.com",
        password: "password"
    },
    {
        user_name: "Pablo",
        email: "Pablo@gmail.com",
        password: "password"
    },
    {
        user_name: "Jonathan",
        email: "Jonathan@gmail.com",
        password: "password"
    }


]
const challenge = [
    {
        Challenge_type: "Hike",
        Challenge_name: "Mason lake Hike",
        creator_id: 1,
        start_time: "2022-05-24T15:30",
        end_time: "2022-06-24T17:45",
        description: "A hiking competition for those in the area, preferrebly at Greenlake but feel free to track your progress anywhere! Just get up and get started!",
        picture_path: "https://www.mountaineers.org/locations-lodges/seattle-branch/committees/seattle-hiking-backpacking/seattle-hiking-committee/course-templates/conditioning-hiking-series/activities/chs-1-hike-mason-lake/@@images/image",
        unit: "Mile"
    },
    {
        Challenge_type: "Run",
        Challenge_name: "Green Lake Run",
        creator_id: 1,
        start_time: "2022-05-24T15:30",
        end_time: "2022-08-24T17:45",
        description: "Beautifil Green lake run is fun!",
        picture_path: "https://images.squarespace-cdn.com/content/v1/5ba9cd765239588e7b5696d4/1582841361486-Y1RENSK5077XP1SIOGK3/IMG_4203.jpg",
        unit: "Mile"
    },
    {
        Challenge_type: "Run",
        Challenge_name: "Seattle Run",
        creator_id: 1,
        start_time: "2022-05-24T15:30",
        end_time: "2022-07-24T17:45",
        description: "Lets Run Seattle!",
        picture_path: "https://static.onecms.io/wp-content/uploads/sites/9/2017/06/fwx-running-seattle-2000.jpg",
        unit: "Mile"
    },
    {
        Challenge_type: "Swim",
        Challenge_name: "Fircrest Baby Sharkathon",
        creator_id: 2,
        start_time: "2022-05-24T15:30",
        end_time: "2022-05-24T17:45",
        description: "Mommy shark doo doo doo",
        picture_path: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        unit: "Mile"
    },
    {
        Challenge_type: "Row",
        Challenge_name: "Lake Washington Row",
        creator_id: 3,
        start_time: "2022-06-24T15:30",
        end_time: "2022-07-24T17:45",
        description: "Want to get into competitive rowing? Check out the club!",
        picture_path: "https://images.unsplash.com/photo-1652017771620-94e53c9edd94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        unit: "Mile"
    },
    {
        Challenge_type: "Bike",
        Challenge_name: "Interurban trialblazing",
        creator_id: 4,
        start_time: "2022-05-24T15:30",
        end_time: "2022-08-24T17:45",
        description: "Seattle area cyclists founded, but anyone is welcome to join!",
        picture_path: "https://images.unsplash.com/photo-1559235270-2df4dcfb4eca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        unit: "Mile"

    },
]
const scores = [
    {
        user_id: "1",
        challenge_id: "1",
        distance: "5.5",
        join: true,
    },
    {
        user_id: "1",
        challenge_id: "2",
        distance: "1",
        join: true,
    },
    {
        user_id: "2",
        challenge_id: "2",
        distance: "6",
        join: true,
    },
    {
        user_id: "3",
        challenge_id: "2",
        distance: "3",
        join: true,
    },
    {
        user_id: "4",
        challenge_id: "2",
        distance: "3",
        join: true,
    },
    {
        user_id: "4",
        challenge_id: "3",
        distance: "2",
        join: true,
    },
    {
        user_id: "4",
        challenge_id: "4",
        distance: "4",
        join: true,
    },

]
const feedMe = async () => {
    try {
        await sequelize.sync({ force: true })
        await User.bulkCreate(users, {
            individualHooks: true
        });
        await Challenge.bulkCreate(challenge);
        await Scores.bulkCreate(scores)
        process.exit(0);
    } catch (err) {
        console.log(err)
    }
}

feedMe()

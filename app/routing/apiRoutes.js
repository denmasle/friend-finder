var friendsInfo = require("../data/friends");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friendsInfo);
    });
    app.post("/api/friends", function (req, res) {
        var input = req.body;
        var answer = input.selection;
        // // console.log(answer);
        var checkArr = [];
        var friendArr = [];

        function sumAll(total, num) {
            return total + num;
        }
        // console.log(friendsInfo.length);
        for (var i = 0; i < friendsInfo.length; i++) {
            // console.log(friendsInfo[i].name);
            checkArr = [];
            for (var z = 0; z < answer.length; z++) {
                valueCheck = Math.abs(parseInt(answer[z]) - parseInt(friendsInfo[i].selection[z]));
                // console.log(valueCheck);
                checkArr.push(valueCheck);
            };
            // console.log(checkArr);
            friendArr.push(checkArr.reduce(sumAll));
        };
        // console.log(friendArr);
        var minSelection = friendArr.reduce(function (a, b) { return Math.min(a, b); });
        // console.log(minSelection);
        var compareIndex = friendArr.indexOf(minSelection);
        // console.log(compareIndex);
        var matchRes = {
            "name": friendsInfo[compareIndex].name,
            "photo": friendsInfo[compareIndex].photo
        }
        res.json(matchRes);
        friendsInfo.push(req.body);
    });
};
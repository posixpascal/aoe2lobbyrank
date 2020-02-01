const axios = require("axios");
const express = require('express')
const app = express();
const path = require("path");
const port = 3000

app.use(express.static('../web/build/'));

app.get('/api/lobbies', function (req, res) {
    axios.get(`https://aoe2.net/api/lobbies?game=aoe2de`).then(apiRes => {
        res.send(apiRes.data);
    });
});

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname + '/../web/build/index.html'));
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
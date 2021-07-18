require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;
const route = require("./routes");



app.use(cors()); 

//app.use(express.static(path.join(__dirname, '/img')));
app.use(express.json());

route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost`, port);
});

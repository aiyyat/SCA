const express = require('express');
const routes = require('./controller');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use("/", routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
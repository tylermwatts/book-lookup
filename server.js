const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const apiConfig = require('./api');

const port = process.env.PORT;

const app = express();
app.use(bodyParser.json());
apiConfig(app);

app.listen(port || 3001, () => {
  console.log(`Server running on http://localhost:${port} ...`);
});

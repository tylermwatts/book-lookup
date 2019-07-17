const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const express = require('express');
const apiConfig = require('./api.ts');
dotenv.config();

const port = process.env.PORT;

const app = express();
app.use(bodyParser.json());
apiConfig(app);

app.listen(port || 3001, () => {
  console.log(`Server running on http://localhost:${port} ...`);
});

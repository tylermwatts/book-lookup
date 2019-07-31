import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import apiConfig from './api';
import express = require('express');
dotenv.config();

const port = process.env.PORT;

const app: express.Application = express();
app.use(bodyParser.json());
apiConfig(app);

app.listen(port || 3001, () => {
  console.log(`Server running on http://localhost:${port} ...`);
});

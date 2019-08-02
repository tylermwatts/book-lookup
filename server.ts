import bodyParser from 'body-parser';
import apiConfig from './api';
const dotenv = require('dotenv');
import express = require('express');
import path = require('path');
dotenv.config();

const port = process.env.PORT;

const app: express.Application = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));
apiConfig(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(port || 3001, () => {
  console.log(`Server running on http://localhost:${port} ...`);
});

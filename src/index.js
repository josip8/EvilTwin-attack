import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/team_name_url', (req, res) => {
  console.log(req.body.name_field);
  res.end();
})

app.listen(process.env.PORT, () =>
  console.log(`EwilTwin app listening on port ${process.env.PORT}!`),
);


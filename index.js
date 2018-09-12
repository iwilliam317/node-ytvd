const express = require('express');
const fs = require('fs');
const ytdl = require('ytdl-core');
const bodyParser = require('body-parser');
const path = require('path')

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App is running on port ${port}`));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.post('/download', (req, res) => {
  const url = req.body.url;
  if (url === "") 
    return res.send("Invalid URL");

  ytdl(url)
  .pipe(fs.createWriteStream('video.flv'));

});

//download example
// ytdl('http://www.youtube.com/watch?v=A02s8omM_hI')
//   .pipe(fs.createWriteStream('video.flv'));

// gets url from a given url
// const url = 'http://www.youtube.com/watch?v=A02s8omM_hI'
// console.log(ytdl.getURLVideoID(url))
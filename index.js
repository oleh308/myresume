const fs = require('fs');
const path = require('path');
const express = require('express');

const PORT = 3000;
const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/src/index.html'));
});

// var wkhtmltox = require("wkhtmltox");

// instantiate a new converter.
// var converter = new wkhtmltox();

app.get('/resume', (req, res) => {
  // converter.pdf(fs.createReadStream('src/index.html'), { })
  //     .pipe(res)
  //     .on("finish", () => {
  //       console.log('done')
  //     });

  res.send('something')
});

const server_host = '0.0.0.0';

app.listen(PORT,  () => {
  console.log('Listening to port:', process.env.PORT || PORT);
});

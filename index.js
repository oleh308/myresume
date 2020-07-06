const fs = require('fs');
const path = require('path');
const pdf = require('html-pdf');
const express = require('express');

const PORT = 3000;
const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/src/index.html'));
});

var wkhtmltox = require("wkhtmltox");

// instantiate a new converter.
var converter = new wkhtmltox();

app.get('/resume', (req, res) => {
  // console.log(__dirname)
  //
  // const options = {
  //   base: 'file:///' + __dirname + '/public'
  // }
  // console.log(options)
  //
  // const html = fs.readFileSync('./src/index.html', 'utf8');
  // pdf.create(html, options).toBuffer(function(err, buffer) {
  //   if (err) return console.log(err);
  //
  //   res.end(buffer);
  // });
  // res.sendFile()

  converter.pdf(fs.createReadStream('src/index.html'), { })
      .pipe(res)
      .on("finish", () => {
        console.log('done')
      });
});



app.listen(PORT, () => {
  console.log('Listening to port:', PORT);
});

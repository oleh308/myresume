const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const express = require('express');
var wkhtmltopdf = require('wkhtmltopdf');
const { baseUrl } = require('./src/utils/url');


if (process.env.NODE_ENV === 'production') {
  wkhtmltopdf.shell = '/bin/ash';
  console.log('here');
}

const PORT = process.env.PORT || 3000
const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/src/index.html'));
});

// app.get('/resume/preview', (req, res) => {
//   console.log('here')
//   let $ = cheerio.load(fs.readFileSync('src/index.html'));
//
//   let html = $.html();
//   html = html.replace('css/style.css', baseUrl(req) + '/css/style.css')
//   console.log('here')
//
//   wkhtmltopdf(html, { marginTop: '2mm', marginLeft: '8mm', marginRight: '8mm' })
//     .pipe(res);
// });

app.get('/resume', async (req, res) => {
  let $ = cheerio.load(fs.readFileSync('src/index.html'));
  $('body').addClass("whiteBackground");
  let button = $('#downloadButton');

  let html = $.html();
  html = html.replace('css/style.css', baseUrl(req) + '/css/style.css')
  res.setHeader('Content-disposition', 'attachment; filename=OBuskoResume.pdf');

  wkhtmltopdf(html, { marginTop: '2mm', marginLeft: '8mm', marginRight: '8mm' })
    .pipe(res);
});

app.listen(PORT,  () => {
  console.log('Listening to port:', process.env.PORT || PORT);
});

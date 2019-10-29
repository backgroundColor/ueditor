document.getElementById("document")
.addEventListener("change", handleFileSelect, false);
function handleFileSelect(event) {
  var fileName = event.target.files[0]['name'].replace(/(.docx|.doc)/, '');
  downLoadControl(true);
  var options = {
    convertImage: mammoth.images.imgElement(function(image) {
      return image.read("base64").then(function(imageBuffer) {
        return {
          src: "data:" + image.contentType + ";base64," + imageBuffer
        };
      });
    }),
    styleMap: [
      "p[style-name='Section Title'] => h1:fresh",
      "p[style-name='Subsection Title'] => h2:fresh",
      "p.RightAlignedParagraph => p.right-align"
    ],
    includeDefaultStyleMap: false,
    includeEmbeddedStyleMap: false,
    ignoreEmptyParagraphs: false
  };
  readFileInputEventAsArrayBuffer(event, function(arrayBuffer) {
    mammoth.convertToHtml({arrayBuffer: arrayBuffer}, options)
    .then(function (result) {
      // document.getElementById('fileName').innerHTML = fileName;
      displayResult(result, fileName);
    })
    .done(function () { downLoadControl(false) });
  });
}

function displayResult(result, name) {
  // var iframeWindow = document.getElementById('output');
  var htmlTemp = createTemp(result.value, name);
  UE.getEditor('editor').setContent(result.value, false);
  // iframeWindow.srcdoc = htmlTemp;
  var messageHtml = result.messages.map(function(message) {
    return '<li class="' + message.type + '">' + escapeHtml(message.message) + "</li>";
  }).join("");
  document.getElementById('downLoadBtn').addEventListener('click', function () {
    var currentHtml = createTemp(UE.getEditor('editor').getContent(), name);
    createFile(currentHtml, name);
  }, false);
}

function readFileInputEventAsArrayBuffer(event, callback) {
  var file = event.target.files[0];

  var reader = new FileReader();

  reader.onload = function(loadEvent) {
    var arrayBuffer = loadEvent.target.result;
    callback(arrayBuffer);
  };

  reader.readAsArrayBuffer(file);
}

function downLoadControl (status) {
  var downLoadBtn = document.getElementById('downLoadBtn');
  downLoadBtn.disabled = status;
}

function createTemp (content, name) {
  var fileHtml = '<html>' +
  '<head>' +
  '<meta charset="utf-8">' +
  '<meta http-equiv="x-ua-compatible" content="ie=edge">' +
  '<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">' +
  '<meta name="format-detection" content="telephone=no">' +
  '<title>' +
  name +
  '</title>' +
  '<style>' +
  '* {margin: 0; padding: 0}' +
  'html { width: 100% }' +
  'body {' +
  'width: 100%;' +
  'padding: 1.67rem;' +
  'box-sizing: border-box;' +
  '}' +
  'table, th, td {' +
  'border-collapse: collapse;' +
  '}' +
  'table {' +
  'border-top: 1px solid #333;' +
  'border-left: 1px solid #333;' +
  '}' +
  'table tbody tr {' +
  'border-bottom: 1px solid #333;' +
  '}' +
  'table tbody td {' +
  'border-right: 1px solid #333;' +
  '}' +
  '@media only screen and (max-width: 1080px),' +
  'only screen and (max-device-width:1080px) {' +
  'html,' +
  'body {' +
  'font-size: 33.75px;' +
  '}' +
  '}' +
  '@media only screen and (max-width: 960px),' +
  'only screen and (max-device-width:960px) {' +
  'html,' +
  'body {' +
  'font-size: 30px;' +
  '}' +
  '}' +
  '@media only screen and (max-width: 800px),' +
  'only screen and (max-device-width:800px) {' +
  'html,' +
  'body {' +
  'font-size: 25px;' +
  '}' +
  '}' +
  '@media only screen and (max-width: 720px),' +
  'only screen and (max-device-width:720px) {' +
  'html,' +
  'body {' +
  'font-size: 22.5px;' +
  '}' +
  '}' +
  '@media only screen and (max-width: 640px),' +
  'only screen and (max-device-width:640px) {' +
  'html,' +
  'body {' +
  'font-size: 20px;' +
  '}' +
  '}' +
  '@media only screen and (max-width: 600px),' +
  'only screen and (max-device-width:600px) {' +
  'html,' +
  'body {' +
  'font-size: 18.75px;' +
  '}' +
  '}' +
  '@media only screen and (max-width: 540px),' +
  'only screen and (max-device-width:540px) {' +
  'html,' +
  'body {' +
  'font-size: 16.875px;' +
  '}' +
  '}' +
  '@media only screen and (max-width: 480px),' +
  'only screen and (max-device-width:480px) {' +
  'html,' +
  'body {' +
  'font-size: 15px;' +
  '}' +
  '}' +
  '@media only screen and (max-width: 414px),' +
  'only screen and (max-device-width:414px) {' +
  'html,' +
  'body {' +
  'font-size: 12.9375px;' +
  '}' +
  '}' +
  '@media only screen and (max-width: 400px),' +
  'only screen and (max-device-width:400px) {' +
  'html,' +
  'body {' +
  'font-size: 12.5px;' +
  '}' +
  '}' +
  '@media only screen and (max-width: 375px),' +
  'only screen and (max-device-width:375px) {' +
  'html,' +
  'body {' +
  'font-size: 11.71875px;' +
  '}' +
  '}' +
  '@media only screen and (max-width: 360px),' +
  'only screen and (max-device-width:360px) {' +
  'html,' +
  'body {' +
  'font-size: 11.25px;' +
  '}' +
  '}' +
  '@media only screen and (max-width: 320px),' +
  'only screen and (max-device-width:320px) {' +
  'html,' +
  'body {' +
  'font-size: 10px;' +
  '}' +
  '}' +
  '@media only screen and (max-width: 240px),' +
  'only screen and (max-device-width:240px) {' +
  'html,' +
  'body {' +
  'font-size: 7.5px;' +
  '}' +
  '}' +
  '</style>' +
  '</head>' +
  '<body>' +
  content +
  '</body>' +
  '</html>';
  // return fileHtml;
  return fileHtml;
}

function createFile (content, name) {
  // console.log(JSON.stringify(fileHtml, null, 4))
  var opt = {
    "indent_size": 4,
    "html": {
      "end_with_newline": true,
      "js": {
        "indent_size": 2
      },
      "css": {
        "indent_size": 2
      }
    },
    "css": {
      "indent_size": 1
    },
    "js": {
      "preserve-newlines": true
    }
  };
  var blob = new Blob([html_beautify(content, opt)], {type: "text/plain;charset=utf-8"});

  saveAs(blob, name + '.html');
}

function escapeHtml(value) {
  return value
  .replace(/&/g, '&amp;')
  .replace(/"/g, '&quot;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');
}

// 预览
function showMask () {
  var mask = document.getElementById('iframe_content');
  var iframe = document.getElementById('output');

  if (mask) {
    mask.style.display = 'block';
  };

  var currentHtml = UE.getEditor('editor').getContent();
  iframe.srcdoc = createTemp(currentHtml, 'test')
}
// 预览关闭
function closeMask () {
  var mask = document.getElementById('iframe_content');
  if (mask) {
    mask.style.display = 'none';
  }
}

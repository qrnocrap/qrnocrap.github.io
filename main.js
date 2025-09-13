var qrcode = new QRCode(document.getElementById("qrcode"), {
  text: "https://example.com",
  width: 1000,
  height: 1000,
});

var urlInput = document.getElementById("urlInput");

var buttonDownload = document.getElementById("download-button");
var buttonCopy = document.getElementById("copy-button");

urlInput.addEventListener("input", function () {
  var newUrl = urlInput.value;
  qrcode.clear();
  qrcode.makeCode(newUrl);
});

buttonDownload.addEventListener("click", function () {
  var canvas = document.querySelector("#qrcode canvas");
  var dataUrl = canvas.toDataURL("image/png");
  var a = document.createElement("a");
  a.href = dataUrl;
  a.download = "qrcode.png";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});

buttonCopy.addEventListener("click", function () {
  var canvas = document.querySelector("#qrcode canvas");
  canvas.toBlob(function (blob) {
    const item = new ClipboardItem({ "image/png": blob });
    navigator.clipboard.write([item]);
  });
});

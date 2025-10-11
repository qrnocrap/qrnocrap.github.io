var qrcode = new QRCode(document.getElementById("qrcode"), {
  text: "https://example.com",
  width: 1000,
  height: 1000,
});

var urlInput = document.getElementById("urlInput");

var ssidInput = document.getElementById("ssidInput");
var pwdInput = document.getElementById("pwdInput");
var encryptionInput = document.getElementById("encryptionInput");

var whatsappInput = document.getElementById("whatsappInput");

var buttonDownload = document.getElementById("download-button");
var buttonCopy = document.getElementById("copy-button");

if (urlInput) urlInput.addEventListener("input", updateCode);
if (ssidInput) ssidInput.addEventListener("input", updateCode);
if (pwdInput) pwdInput.addEventListener("input", updateCode);
if (encryptionInput) encryptionInput.addEventListener("input", updateCode);
if (whatsappInput) whatsappInput.addEventListener("input", updateCode);

buttonDownload.addEventListener("click", downloadCode);
buttonCopy.addEventListener("click", copyCodeToClipboard);

function updateCode() {
  if (urlInput) {
    updateTextCode();
  } else if (ssidInput) {
    updateWifiCode();
  } else if (whatsappInput) {
    updateWhatsappCode();
  }
}

function updateTextCode() {
  var newUrl = urlInput.value;
  qrcode.clear();
  qrcode.makeCode(newUrl);
}

function updateWhatsappCode() {
  // only numbers, spaces allowed, possibility of a leading +
  var phoneRegex = /^\+?[0-9 ]+$/;
  var isValid = phoneRegex.test(whatsappInput.value);
  if (!isValid && whatsappInput.value !== "") {
    whatsappInput.setCustomValidity("Please enter a valid phone number.");
    whatsappInput.reportValidity();
    return;
  } else {
    whatsappInput.setCustomValidity("");
  }
  var whatsappInputCleaned = whatsappInput.value
    .replace(/ /g, "")
    .replace(/^\+/, "");
  console.log(whatsappInputCleaned);
  var whatsappString = `https://wa.me/${whatsappInputCleaned}`;

  qrcode.clear();
  qrcode.makeCode(whatsappString);
}

function updateWifiCode() {
  var wifiString =
    encryptionInput.value !== "nopass"
      ? `WIFI:T:${encryptionInput.value};S:${ssidInput.value};P:${pwdInput.value};;`
      : `WIFI:T:nopass;S:${ssidInput.value};;`;
  if (encryptionInput.value === "nopass") {
    pwdInput.disabled = true;
  } else {
    pwdInput.disabled = false;
  }
  qrcode.clear();
  qrcode.makeCode(wifiString);
}

function downloadCode() {
  var canvas = document.querySelector("#qrcode canvas");
  var dataUrl = canvas.toDataURL("image/png");
  var a = document.createElement("a");
  a.href = dataUrl;
  a.download = "qrcode.png";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function copyCodeToClipboard() {
  var canvas = document.querySelector("#qrcode canvas");
  canvas.toBlob(function (blob) {
    const item = new ClipboardItem({ "image/png": blob });
    navigator.clipboard.write([item]);
  });
}

// Initial code
updateCode();

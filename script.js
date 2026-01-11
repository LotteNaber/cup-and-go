// wordt uitgevoerd wanneer qr code wordt gescand
function onScanSuccess(decodedText, decodedResult) {
    
    document.getElementById("qr-result").innerText = `Scanned: ${decodedText}`;
  
    // gaat naar de url als het link is
    if (decodedText.startsWith("http")) {
      window.location.href = decodedText;
    }
  }
  
  // start de scanner wanneer de pagina geload is
  document.addEventListener("DOMContentLoaded", () => {
    const qrScanner = new Html5QrcodeScanner("qr-reader", {
      fps: 10,
      qrbox: 250
    });
    qrScanner.render(onScanSuccess);

  });
  
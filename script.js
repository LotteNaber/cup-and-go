document.addEventListener("DOMContentLoaded", async () => {
  const qr = new Html5Qrcode("qr-reader");

  const config = {
    fps: 10,
    qrbox: 250,
    experimentalFeatures: {
      useBarCodeDetectorIfSupported: true
    },
    videoConstraints: {
      facingMode: "environment",
      focusMode: "continuous",
      advanced: [{ focusMode: "continuous" }]
    }
  };

  function onScanSuccess(decodedText) {
    document.getElementById("qr-result").innerText = `Scanned: ${decodedText}`;
    if (decodedText.startsWith("http")) {
      window.location.href = decodedText;
    }
  }

  try {
    await qr.start({ facingMode: "environment" }, config, onScanSuccess);
  } catch (err) {
    console.error("Camera start failed:", err);
  }
});


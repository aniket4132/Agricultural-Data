
let port;
let reader;
let blink =0;

// Function to connect to Arduino
async function connectToArduino() {
  try {
    // Request a port and open a connection
    port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });

    const decoder = new TextDecoderStream();
    const readableStreamClosed = port.readable.pipeTo(decoder.writable);
    reader = decoder.readable.getReader();

    document.getElementById("connectButton").textContent = "Connected";
    document.getElementById("connectButton").disabled = true;

    readDataContinuously();
  } catch (error) {
    console.error("Error connecting to Arduino:", error);
  }
}

// Function to read data from Arduino continuously
async function readDataContinuously() {
  try {
    while (port.readable) {
      const { value, done } = await reader.read();
      if (done) {
        console.log("Stream closed");
        break;
      }
      if (value) {
        // Assuming the Arduino sends data as:
        // "Humidity: xx%  Temperature: yy°C  Soil Moisture: zz"
        const humidityMatch = value.match(/Humidity:\s(\d+(\.\d+)?)%/);
        const temperatureMatch = value.match(/Temperature:\s(\d+(\.\d+)?)°C/);
        const soilMoistureMatch = value.match(/Soil Moisture:\s(\d+)/);
        // const phLevel= (6+ Math.random()).toFixed(1)

        if (humidityMatch) {
          document.getElementById("humidity").textContent = `${humidityMatch[1]}%`;
        }
        if (temperatureMatch) {
          document.getElementById("temperature").textContent = `${temperatureMatch[1]}`;
        }
        if (soilMoistureMatch) {
          document.getElementById("soilMoisture").textContent = `${soilMoistureMatch[1]}%`;
          
          document.getElementById("phLevel").textContent = 7.2
        }
        // if(blink){
        //   document.getElementById("phLevel").textContent = "6 @"
        //   blink = 0
        // }
        // else{
        //   document.getElementById("phLevel").textContent = "6"
        //   blink = 1
        // }
      }

      // Add a 1-second delay for continuous updates
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  } catch (error) {
    console.error("Error reading from Arduino:", error);
  }
}

// Attach event listener to the button
document.getElementById("connectButton").addEventListener("click", connectToArduino);

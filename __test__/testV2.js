import * as tf from "@tensorflow/tfjs";


// const tf = require("@tensorflow/tfjs");

// set the width and height of the image
const width = 224;
const height = 224;

// get the picture binary data
function getPictureBinary(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        // set the onload callback function
        reader.onload = () => {
            // the binary data is stored in the reader's result property
            resolve(reader.result);
        };

        // set the onerror callback function
        reader.onerror = () => {
            reject(new Error("Failed to read file"));
        };

        // read the file as an array buffer
        reader.readAsArrayBuffer(file);
    });
}
// create a function to convert the binary data to a tensor
async function imageToTensor(binaryImageData) {
    // create a new Uint8Array from the binary data
    const uint8Array = new Uint8Array(binaryImageData);

    // create a new ImageData object from the uint8Array
    const imageData = new ImageData(width, height);

    // add an alpha channel to the image data
    for (let i = 0; i < width * height; i++) {
        imageData.data[i * 4] = uint8Array[i * 3];
        imageData.data[i * 4 + 1] = uint8Array[i * 3 + 1];
        imageData.data[i * 4 + 2] = uint8Array[i * 3 + 2];
        imageData.data[i * 4 + 3] = 255;
    }

    // create a new canvas and draw the ImageData on it
    const canvas = document.createElement("canvas");
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    const ctx = canvas.getContext("2d");
    ctx.putImageData(imageData, 0, 0);

    // convert the canvas into a tensor
    const tensor = tf.browser.fromPixels(canvas);

    return tensor;
}

const fileInput = document.querySelector('input[type="file"]');
const file = fileInput.files[0];

if (file && file.type.startsWith("image/")) {
    getPictureBinary(file).then((binary) => {
        const tensor = imageToTensor(binary);
        console.log(tensor);  // this is the tensor of the picture
    });
} else {
    console.error("Please select a valid picture file.");
}

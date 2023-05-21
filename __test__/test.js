//1
// test file
const fileInput = document.querySelector('input[type="file"]');
const file = fileInput.files[0];

if (file && file.type.startsWith("image/")) {
    console.log("Valid file selected.");
} else {
    console.error("Please select a valid picture file.");
}





//2
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

        // read the file as binary data
        reader.readAsBinaryString(file);
    });
}


const fileInput = document.querySelector('input[type="file"]');
const file = fileInput.files[0];

if (file && file.type.startsWith("image/")) {
    getPictureBinary(file).then((binary) => {
        console.log(binary);  // this is the binary data of the picture
    });
} else {
    console.error("Please select a valid picture file.");
}












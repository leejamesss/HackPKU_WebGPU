async function readMnistImagesFile(filePath) {
    const response = await fetch(filePath);
    const buffer = await response.arrayBuffer();

    const dataView = new DataView(buffer);

    const magicNumber = dataView.getUint32(0);
    const numImages = dataView.getUint32(4);
    const numRows = dataView.getUint32(8);
    const numColumns = dataView.getUint32(12);

    if (magicNumber !== 2051) {
        throw new Error('Invalid magic number in MNIST images file!');
    }

    const images = [];

    for (let i = 0; i < numImages; i++) {
        const imageOffset = 16 + i * numRows * numColumns;

        // Read the pixel values of the current image and save them to a Uint8Array
        const pixels = new Uint8Array(numRows * numColumns);
        for (let j = 0; j < numRows * numColumns; j++) {
            pixels[j] = dataView.getUint8(imageOffset + j);
        }

        images.push(pixels);
    }

    return {
        numRows,
        numColumns,
        images,
    };
}









async function readMnistLabelsFile(filePath) {
    const response = await fetch(filePath);
    const buffer = await response.arrayBuffer();

    const dataView = new DataView(buffer);

    const magicNumber = dataView.getUint32(0);
    const numLabels = dataView.getUint32(4);

    if (magicNumber !== 2049) {
        throw new Error('Invalid magic number in MNIST labels file!');
    }

    const labels = [];

    for (let i = 0; i < numLabels; i++) {
        const labelOffset = 8 + i;

        // Read the label value of the current image and save it to a Uint8Array
        const labelValue = dataView.getUint8(labelOffset);

        labels.push(labelValue);
    }

    return labels;
}



const imagesFilePath = 'train-images-idx3-ubyte';
const labelsFilePath = 'train-labels-idx1-ubyte';

const imagesData = await readMnistImagesFile(imagesFilePath);
const labelsData = await readMnistLabelsFile(labelsFilePath);

console.log(`Loaded ${imagesData.images.length} images with ${imagesData.numRows} x ${imagesData.numColumns} pixels!`);
console.log(`Loaded ${labelsData.length} labels!`);

function readIdx3Uint8(buffer) {
    const dataView = new DataView(buffer);
    const magicNumber = dataView.getUint32(0, false);
    if (magicNumber !== 2051) {
        console.error('Invalid magic number in IDX3-ubyte file!');
        return null;
    }
    const numImages = dataView.getUint32(4, false);
    const numRows = dataView.getUint32(8, false);
    const numColumns = dataView.getUint32(12, false);
    const images = [];
    let offset = 16;
    for (let i = 0; i < numImages; ++i) {
        const image = new Uint8Array(numRows * numColumns);
        for (let j = 0; j < numRows * numColumns; ++j) {
            image[j] = dataView.getUint8(offset++);
        }
        images.push(image);
    }
    return { numRows, numColumns, images };
}

function readIdx1Uint8(buffer) {
    const dataView = new DataView(buffer);
    const magicNumber = dataView.getUint32(0, false);
    if (magicNumber !== 2049) {
        console.error('Invalid magic number in IDX1-ubyte file!');
        return null;
    }
    const numLabels = dataView.getUint32(4, false);
    const labels = new Uint8Array(numLabels);
    let offset = 8;
    for (let i = 0; i < numLabels; ++i) {
        labels[i] = dataView.getUint8(offset++);
    }
    return labels;
}

function loadIdx3Uint8File(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onerror = () => {
            reject(new Error('Failed to read IDX3-ubyte file!'));
        };
        fileReader.onload = () => {
            resolve(readIdx3Uint8(fileReader.result));
        };
        fileReader.readAsArrayBuffer(file);
    });
}

function loadIdx1Uint8File(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onerror = () => {
            reject(new Error('Failed to read IDX1-ubyte file!'));
        };
        fileReader.onload = () => {
            resolve(readIdx1Uint8(fileReader.result));
        };
        fileReader.readAsArrayBuffer(file);
    });
}

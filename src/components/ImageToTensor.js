// // import * as torch from 'webgpu-torch';

// // function imageToTensor(image, cin) {
// //     // 创建一个2D画布
// //     const canvas = document.createElement('canvas');
// //     canvas.width = image.width;
// //     canvas.height = image.height;
// //     const ctx = canvas.getContext('2d');
// //     // 将图片绘制到画布上
// //     ctx.drawImage(image, 0, 0);
// //     // 获取画布像素数据
// //     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
// //     // 创建对应形状的张量
// //     const tensor = torch.zeros([cin, canvas.height, canvas.width]);
// //     for (let c = 0; c < cin; c++) {
// //         for (let h = 0; h < canvas.height; h++) {
// //             for (let w = 0; w < canvas.width; w++) {
// //                 // 计算当前位置的像素索引
// //                 const idx = (h * canvas.width + w) * 4 + c;
// //                 // 将像素值归一化到[0,1]范围内
// //                 const value = imageData[idx] / 255;
// //                 tensor.set(value, c, h, w);
// //             }
// //         }
// //     }
// //     return tensor;
// // }


// // const img = new Image();
// // img.onload = () => {
// //     const tensor = imageToTensor(img, 3); // 3 表示颜色通道数
// //     console.log(tensor.size()); // [3, H, W]
// // };
// // img.src = 'example.jpg'

// // img.onload = () => {
// //     const tensor = imageToTensor(img, 3);
// //     console.log(tensor.shape);
// // };




import * as torch from 'webgpu-torch';

export function imageToTensor(image, cin) {
    // 创建一个2D画布
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');
    // 将图片绘制到画布上
    ctx.drawImage(image, 0, 0);
    // 获取画布像素数据
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    // 创建对应形状的张量
    const tensor = torch.zeros([cin, canvas.height, canvas.width]);
    for (let c = 0; c < cin; c++) {
        for (let h = 0; h < canvas.height; h++) {
            for (let w = 0; w < canvas.width; w++) {
                // 计算当前位置的像素索引
                const idx = (h * canvas.width + w) * 4 + c;
                // 将像素值归一化到[0,1]范围内
                const value = imageData[idx] / 255;
                tensor.set(value, c, h, w);
            }
        }
    }
    return tensor;
}






// // //Read the picture
// // const img = new Image("./example.jpg");
// // img.onload = () => {
// //     const tensor = imageToTensor(img, 3); // 3 表示颜色通道数
// //     console.log(tensor.size()); // [3, H, W]
// // }
// // img.src = 'example.jpg'



//导入tfjs
import * as tf from '@tensorflow/tfjs';

export async function loadIdx3Uint8File(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const buffer = reader.result;
            const dataView = new DataView(buffer);

            const magicNumber = dataView.getUint32(0);
            const numImages = dataView.getUint32(4);
            const numRows = dataView.getUint32(8);
            const numColumns = dataView.getUint32(12);

            if (magicNumber !== 2051) {
                reject(new Error('Invalid magic number in IDX3 file!'));
                return;
            }

            const images = [];

            for (let i = 0; i < numImages; i++) {
                const imageOffset = 16 + i * numRows * numColumns;

                // 读取当前图像的像素值，并将其保存到 Uint8Array 中
                const pixels = new Uint8Array(numRows * numColumns);
                for (let j = 0; j < numRows * numColumns; j++) {
                    pixels[j] = dataView.getUint8(imageOffset + j);
                }

                // 将像素值转换成 Tensor 对象，并保存到 images 数组中
                const tensor = tf.tensor(pixels, [numRows, numColumns], 'int32');
                images.push(tensor);
            }

            resolve({
                numRows,
                numColumns,
                images,
            });
        };

        reader.onerror = () => {
            reject(reader.error);
        };

        reader.readAsArrayBuffer(file);
    });
}

export async function loadIdx1Uint8File(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const buffer = reader.result;
            const dataView = new DataView(buffer);

            const magicNumber = dataView.getUint32(0);
            const numLabels = dataView.getUint32(4);

            if (magicNumber !== 2049) {
                reject(new Error('Invalid magic number in IDX1 file!'));
                return;
            }

            const labels = [];

            for (let i = 0; i < numLabels; i++) {
                const labelOffset = 8 + i;

                // 读取当前标签的值，并保存到 Uint8Array 中
                const labelValue = dataView.getUint8(labelOffset);

                // 将标签值转换成 Tensor 对象，并保存到 labels 数组中
                const tensor = tf.tensor(labelValue, [], 'int32');
                labels.push(tensor);
            }

            resolve(labels);
        };

        reader.onerror = () => {
            reject(reader.error);
        };

        reader.readAsArrayBuffer(file);
    });
}






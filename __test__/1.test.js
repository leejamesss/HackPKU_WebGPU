
import { imageToTensor } from '../src/components/ImageToTensor';
import { describe, test, expect } from 'jest';

describe('imageToTensor', () => {
    test('converts an image to a tensor', () => {
        const img = new Image();
        img.onload = () => {
            const tensor = imageToTensor(img, 3);
            expect(tensor.shape).toEqual([3, img.height, img.width]);
        };
        img.src = 'example.jpg';
    });
});




// describe('imageToTensor', () => {
//     let page;

//     beforeAll(async () => {
//         await page.goto('http://localhost:8080');
//     });

//     afterAll(async () => {
//         await page.close();
//     });

//     beforeEach(async () => {
//         page = await browser.newPage();
//     });

//     afterEach(async () => {
//         await page.close();
//     });

//     test('converts an image to a tensor', async () => {
//         const img = await page.$('#test-image');
//         const tensor = await page.evaluate(imageToTensor, img, 3);
//         expect(tensor.shape).toEqual([3, 100, 100]);
//     });
// });

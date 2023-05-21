<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->
<template>
  <div class="container">
    <h1>LeNet Training with WebGPU</h1>
    <p>Select a dataset and click the 'Train' button to start training:</p>
    <form @submit.prevent="trainModel">
      <label for="dataset">Dataset:</label>
      <select id="dataset" v-model="selectedDataset">
        <option value="mnist">MNIST</option>
        <option value="fashion-mnist">Fashion-MNIST</option>
      </select>
      <button type="submit" id="train-button">Train</button>
    </form>

    <div class="image-upload">
      <label for="file-upload">Upload image:</label>
      <input type="file" id="file-upload" @change="handleFileUpload">
    </div>

    <div class="image-preview">
      <img v-if="imageUrl" :src="imageUrl" alt="Uploaded image">
      <p v-if="description">{{ description }}</p>
    </div>

    <div class="training-logs">
      <h2>Training logs:</h2>
      <ul>
        <li v-for="(log, index) in trainingLogs" :key="index">{{ log }}</li>
      </ul>
    </div>
  </div>
</template>



<script>
import * as tf from '@tensorflow/tfjs';
import { Tensor, nn } from 'webgpu-torch-syheliel';
import { MnistData } from './data'

export default {
  data() {
    return {
      file: null,
      imageUrl: '',
      description: '',
      trainingLogs: [],
      selectedDataset: '',
      mnistData: undefined
    };
  },
  methods: {
    async importDataset() {
      if (this.selectedDataset === "mnist") {
        //import mnist dataset
        const data = new MnistData();
        console.log("start loading mnist data")
        await data.load();
        console.log(data)
        this.mnistData = data;
      } else if (this.selectedDataset === "fashion-mnist") {
        //import fashion-mnist dataset
        alert("don't use this dataset")
      }
    },

    async trainModel() {
      await this.importDataset();
      let [images, labels] = [this.mnistData.datasetImages, this.mnistData.datasetLabels];
      let [IMAGE_SIZE, LABEL_CLASS] = [784, 10]
      const linear = new nn.Linear(IMAGE_SIZE, 20, "float32")
      const linear2 = new nn.Linear(20, 1, "float32")
      // eslint-disable-next-line no-unused-vars
      let NUM = images.length / IMAGE_SIZE
      for (let i = 0; i < 10; i++) {
        let image = images.slice(i * IMAGE_SIZE, (i + 1) * IMAGE_SIZE)
        let label = labels.slice(i * LABEL_CLASS, (i + 1) * LABEL_CLASS)
        console.log(image, label,)

        const input = new Tensor(Array.from(image), "float32");
        input.requiresGrad = true;
        const target = new Tensor([label.indexOf(1)], "float32")
        let t1 = linear.forward(input)
        let output = linear2.forward(t1);
        let loss = (output.sub(target)).square();
        console.log("loss: ", loss.toArray())

        loss.backward()
        linear.BP()
        linear2.BP()
      }
    },

    async imageToTensor(img) {
      return new Promise((resolve, reject) => {
        if (!img.complete || img.naturalWidth === 0) {
          img.onload = () => {
            const tensor = tf.browser.fromPixels(img);
            resolve(tensor);
          };
          img.onerror = reject;
        } else {
          const tensor = tf.browser.fromPixels(img);
          resolve(tensor);
        }
      });
    },
    async handleFileUpload(event) {

      const file = event.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = async () => {

          const width = img.width;
          const height = img.height;

          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          let imageData = ctx.getImageData(0, 0, width, height);
          let pixels = imageData.data.map(function (pixel) {
            return pixel / 255;
          });
          let tensor = tf.tensor(pixels, [canvas.width, canvas.height, 4]);
          //显示tensor的数据分布
          console.log(tensor.dataSync());
          //将tensor转换为一维数组
          const flattenedTensor = tensor.flatten();
          //在浏览器显示tensor的数据
          console.log(flattenedTensor.dataSync());
          //在浏览器显示tensor的数据
          console.log(flattenedTensor.data());
          //在浏览器显示tensor的shape
          console.log(flattenedTensor.shape);
          //在浏览器显示tensor的数据类型
          console.log(flattenedTensor.dtype);
          tensor.dispose();
        };
      };
    },
  }
};
</script>







<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
}

.image-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}

.image-preview {
  margin-top: 50px;
}

.training-logs {
  margin-top: 50px;
}

h1,
h2 {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
}

p {
  font-size: 18px;
  text-align: center;
}

label {
  font-size: 18px;
  font-weight: bold;
}

select {
  font-size: 18px;
  margin-left: 10px;
}

button[type="submit"] {
  font-size: 18px;
  margin-left: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
}

input[type="file"] {
  margin-top: 10px;
}

img {
  max-width: 500px;
  max-height: 500px;
  margin-bottom: 20px;
}

@media only screen and (max-width: 768px) {
  h1 {
    font-size: 24px;
  }

  h2 {
    font-size: 22px;
  }

  p,
  label,
  select,
  button[type="submit"] {
    font-size: 16px;
  }
}
</style>












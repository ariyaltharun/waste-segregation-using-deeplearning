# Domestic Waste Segregation Using Deep Learning

## Introduction





## Segregating waste using IOT devices

### Using ESP32:

* Refer the code in ESP32/ and make changes according to your requirement.
* Connect ESP32 to your computer/laptop and upload the code to ESP32 board.

### Using RPI:
> [!Note]
> Future work: Create portable waste segregator using Raspberry pi


## Website

We have created website to ease the use of evaluating the model performance.

### Start the website server:

1. Install the npm packages

   ```bash
   npm install
   ```

2. Start the server

   ```bash
   npm run dev
   ```

> [!NOTE]
> Future work includes training the model on provided dataset using web interface and get evaluation results as well


## Customize the model

> [!Note]
> Please don't hesitate to copy the command and change the arguments

### Fine tune the model on your dataset

```bash
python finetune.py --data <path-to-dataset> --epoch 10 --lr 0.0001 --batch_size 32 --checkpoint_path ../ckpt/trained_model.pth
```

### Evaluate the model
```bash
python evaluate.py --data <>
```

### Perform inference on the model
```bash
python model_inference.py --path <path-to-image> --device {cpu, cuda}
```

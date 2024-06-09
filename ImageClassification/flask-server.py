import base64
import json
import os
from typing import Dict, List
import time

from flask import Flask, request, jsonify
from flask_cors import CORS
import torch

from evaluation import evaluate_model
from src.dataset import get_dataset, get_dataloader
from src.model import get_inference_model
from src.preprocessing import transform


app = Flask(__name__)
CORS(app)


checkpoint_path = "Checkpoint/waste_clf_trained_model.pth"
model = get_inference_model(checkpoint_path)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")


@app.get("/")
def index():
    return {"Status": "Server Working Good"}


@app.post("/predict")
def predict():
    ################ Testing ####################
    # predict = random.randint(0, 100)
    #############################################
    data = request.json
    input_img = torch.Tensor(
        data["frame"],
        device=device
    )
    predict = model(input_img)
    return {"prediction": predict}


@app.post("/evaluate-model")
def test_model():
    data = json.load(request.json)

    # Recieve test dataset folder from frontend
    _download_imgs(data['img_data'])

    # Data Transformation
    ## Imported using processing module

    # Create CustomDataset Instance
    eval_dataset = get_dataset(
        root="Images/", 
        train=False, 
        transform=transform
    )
    
    # Create a dataloader object with hyperparam
    eval_dataloader = get_dataloader(
        dataset=eval_dataset, 
        batch_size=32, 
        shuffle=True
    )
    
    # Now send this dataloader to evaluate function.
    # Example: evaluate(data["<place-holder>"], filename="evaluated_model.log")
    eval_results = evaluate_model(dataloader=eval_dataloader, log_file="model_eval.log")
    
    ############# Do some processing with `evaluated_model.log` ###############
    # and format the data in right format
    # and return the data in correct format to frontend
    # Display the data in frontend
    ###########################################################################
    return eval_results


# Test route (To check whether the images sent through frontend gets downloaded in backend)
@app.post("/post-imgs")
def download_imgs(): #imgs: List[Dict[str, str]]):
    ############ Debug #################
    print(request.json)
    ####################################
    imgs = json.loads(request.json["imgs"])
    print(len(imgs))
    os.mkdir("Images")
    for img in (imgs):
        with open("Images/" + img['name'], 'wb') as file:
            file.write(base64.b64decode(img['file'][22:]))
    return {'status': 'success'}


@app.get("/get-inference-time-and-no-images")
def get_params():
    total_images = len(os.listdir("Images/"))
    sample_img = torch.randn(1, 3, 200, 150).to(device)
    start = time.time()
    model(sample_img)
    end = time.time()
    return jsonify({
        "inference_time_per_image": end-start,
        "total_images": total_images
    })
    

# Helper functions
def _download_imgs(imgs: List[Dict[str, str]], dir: str="Images") -> None:
    """
    Downloads and stores images in `Images/` directory
    
    Args:
    ----
    imgs -> list of dict containing image attributes
    dir -> directory name (default="Images/")

    Output:
    -------
    None
    """
    if os.path.isdir(dir):
        os.remove(dir)
    os.makedirs(dir)
    for img in imgs:
        with open(f"{dir}/{img['name']}", 'wb') as file:
            decode_b64_data = base64.b64decode(img['img'])
            file.write(decode_b64_data)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8081, debug=True)

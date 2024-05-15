from argparse import ArgumentParser
import timm
import torch
import torch.nn as nn
from utils import read_img


def InceptionResnetV2(mode="train"):
    """
    Get Inception-Resnet-V2 model

    Args:
    -----
    mode -> select whether the model you need in 
          train or inference mode 
          (string, default="train")
    
    Output:
    -------
    Inception-Resnet-V2 model (torch.nn.Module)
    """
    model = timm.create_model(
        model_name="inception_resnet_v2",
        pretrained=True
    )

    model.classif = nn.Sequential(
        nn.Linear(in_features=1536, out_features=700),
        nn.ReLU(),
        nn.Linear(in_features=700, out_features=100),
        nn.ReLU(),
        nn.Linear(in_features=100, out_features=2),
        nn.ReLU(),
    )

    for name, param in model.named_parameters():
        if mode == "train" and name.startsWith("classif"):
            param.requires_grad = True
        else:
            param.requires_grad = False

    return model


def get_inference_model(ckpt_path):
    """
    Get Inception-Resent-V2 model for inference

    Args:
    -----
    ckpt_path -> path to trained checkpoint path (string)

    Output:
    -------
    Inception-Resnet-V2 model loaded with provided checkpoint
    """
    checkpoint = torch.load(ckpt_path)
    model = InceptionResnetV2(mode="inference")
    model.load_state_dict(checkpoint["model_state_dict"])
    return model


if __name__ == "__main__":
    # Take input from cli
    parser = ArgumentParser(
        description="Perform inferance and get prediction by providing image path"
    )
    parser.add_argument(
        "-p", 
        "--path", 
        type=str, 
        help="path to image"
    )
    parser.add_argument(
        "-d", 
        "--device", 
        type=str, 
        default="cpu", 
        choices=["cpu", "cuda"], 
        help="Choose on which device to run the inference"
    )
    parser.add_argument(
        "-c", 
        "--ckpt_path", 
        type=str, 
        default="Checkpoints/trained.pth",  
        help="Path to trained model checkpoint"
    )
    args = parser.parse_args()
    
    # Read the image
    img = read_img(path=args.path, device=args.device)
    
    # Load the model
    model = get_inference_model(args.ckpt_path)
    
    # Perform prediction
    prediction = model(img)

    # Print prediction to console
    match prediction.argmax():
        case 0:
            print("Organic")
        case 1:
            print("Recyclable")

import base64
import os

import torch
import torchvision
import torchvision.transforms as transforms


def save_model(state, file_name: str) -> None:
    torch.save(state, file_name)


def load_model(path, model, optimizer):
    checkpoint = torch.load(path)
    model.load_state_dict(checkpoint["model_state_dict"])
    optimizer.load_state_dict(checkpoint["optim_state_dict"])
    # epoch = checkpoint["epoch"]
    # loss = checkpoint["loss"]
    # lr = checkpoint["lr"]


def read_img(path, device):
    img: torch.Tensor
    if device == "cpu":
        img = torchvision.io.read_image(path).cpu()
    else:
        img = torchvision.io.read_image(path).cuda()

    transform = transforms.Compose([
        transforms.ToTensor(),
        transforms.Resize((200, 150)),
    ])

    img = transform(img)
    return img


def convert_img_to_base64(path: str="Images/") -> list[str]:
    b64_encoded_imgs = []
    for img in os.listdir(path):
        with open(f"{path}/{img}", 'rb') as img_file:
            encode_img_to_b64 = base64.b64encode(img_file.read())
            b64_encoded_imgs.append(encode_img_b64.decode('UTF-8'))
    return B64_encoded_imgs


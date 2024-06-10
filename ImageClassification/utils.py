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
 
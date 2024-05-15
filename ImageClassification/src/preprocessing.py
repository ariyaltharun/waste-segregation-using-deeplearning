import torchvision.transforms as transforms


# To transforms imgs to tensor and 
# resize imgs that are in arbitrary shape to (200, 150)  
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Resize((200, 150)),
])

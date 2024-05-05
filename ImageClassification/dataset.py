from PIL import Image
import os
import random
import torch
from torch.utils.data import Dataset
from torch.utils.data import DataLoader


class WasteClassificationDataset(Dataset):
    """
    Custom dataset class for waste classification dataset

    ----------
    Required:
    ----------
    Please make sure that directory structure follow
    root_path/
        Train/
            images.(jpeg, png, *) -> image name must contain class name
        Test/
            images.(jpeg, png, *) -> image name must contain class name


    -----
    Args:
    -----
    root -> root path of the dataset (string)
    train -> Train split or test split (bool)
    transform -> Transformations for input_data (torchvision.Transforms)
    target_transform -> Transformations for labels (torchvision.Transforms)
    """
    def __init__(self, root, train=True, transform=None, target_transform=None):
        self.root = root
        self.train = train
        self.transform = transform
        self.target_transform = target_transform

        # Walk through the dataset directory
        self.data: list[str] = list()
        for dirpath, dirname, filenames in os.walk(self.root):
            if train and dirpath == self.root + "/Train":
                filenames = list(map(lambda x: dirpath + x, filenames))
                self.data.extend(filenames)
            if not train and dirpath == self.root + "/Test":
                filenames = list(map(lambda x: dirpath + x, filenames))
                self.data.extend(filenames)
        random.shuffle(self.data)

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        label = torch.tensor(0) if self.data[idx].find("organic") != -1 else torch.tensor(1)
        img = Image.open(self.data[idx])

        if self.transform:
            img = self.transform(img)

        if self.target_transform:
            label = self.transform(label)

        return (img, label)


def get_dataset(root: str, train: bool, transform=None, target_transform=None):
    """
    Get the torch dataset

    Args:
    -----
    root -> root path of dataset directory (string)
    train -> train split or test split (bool)
    transform -> Transformations for input_data (torchvision.Transforms)
    target_transform -> Transformations for labels (torchvision.Transforms)
    """
    dataset = WasteClassificationDataset(
        root=root, 
        train=train, 
        transform=transform,
        target_transform=target_transform
    )
    return dataset


def get_dataloader(dataset, batch_size=32, shuffle=True):
    """
    Get dataset wrapper by torch dataloader

    Args:
    ----- 
    dataset -> dataset directory wrapped by torch dataset
    batch_size -> batch of size for dataloader (default=32)
    shuffle -> To shuffle the batch batches (bool) 
    """
    dataloader = DataLoader(
        dataset=dataset, 
        batch_size=batch_size, 
        shuffle=shuffle
    )
    return dataloader

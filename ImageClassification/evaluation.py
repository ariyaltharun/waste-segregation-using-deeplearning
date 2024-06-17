from typing import Dict, Any
import time

import torch
import torch.nn as nn
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score
)
from tqdm.auto import tqdm

from src.model import InceptionResnetV2, get_inference_model


def evaluate_model(model, loader, criterion, device):
    model.eval()
    num_correct = 0
    num_samples = 0
    predictions = list()
    targets = list()
    test_loss = 0
    with torch.no_grad():
        for imgs, labels in tqdm(loader):
            imgs = imgs.to(device)
            labels = labels.to(device)

            preds = model(imgs)
            test_loss += criterion(preds, labels).item()

            num_correct += (preds.argmax(dim=1) == labels).sum()
            num_samples += labels.shape[0]

            predictions.extend(preds.argmax(dim=1).cpu().numpy().reshape(1, -1).tolist()[0])
            targets.extend(labels.cpu().numpy().reshape(1, -1).tolist()[0])
        print(f"Test: Got {num_correct}/{num_samples}, Test Accuracy: {num_correct/num_samples*100:.2f}, Test Loss: {test_loss/len(loader):.2f}")
        predictions
    
    eval_results = {
        "Accuracy": round(float(num_correct)/float(num_samples)*100, 2),
        "Loss": round(test_loss/len(loader), 2),
        "Precision": round(precision_score(predictions, targets), 2),
        "Recall": round(recall_score(predictions, targets), 2),
        "F1Score": round(f1_score(predictions, targets), 2),
    }
    return eval_results


if __name__ == "__main_":
    from src.dataset import get_dataset, get_dataloader
    from src.preprocessing import transform

    eval_dataset = get_dataset()
    eval_dataloader = get_dataloader()
    # Create CustomDataset Instance
    eval_dataset = get_dataset(
        root="Images",
        train=False,
        transform=transform
    )

    # Create a dataloader object with hyperparam
    eval_dataloader = get_dataloader(
        dataset=eval_dataset,
        batch_size=1,
        shuffle=True
    )
    
    ckpt_path = ""
    model = get_inference_model(ckpt_path)
    
    criterion = nn.CrossEntropyLoss()
    print("============== [ TEST ] EVAL RESULTS ===================")
    print(evaluate_model(model, eval_dataloader, criterion))
    print("========================================================")
    

from typing import Dict, Any
import time

import torch
import torch.nn as nn
from torchmetrics.classification import (
    Accuracy,
    ConfusionMatrix,
    F1Score,
    Precision,
    Recall,
    ROC,
)
from tqdm.auto import tqdm

from src.model import InceptionResnetV2


def evaluate_model(dataloader):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    # Load the model
    model = InceptionResnetV2(mode="eval")

    # Load criterion
    criterion = nn.CrossEntropyLoss()

    # load the checkpoints
    checkpoint_path = "Checkpoint/waste_clf_trained_model.pth"
    checkpoints = torch.load(checkpoint_path)

    # Load the trained param to model
    model.load_state_dict(checkpoints["model_state_dict"])
    
    file = open("model_eval.log", "a")
    progress_bar = tqdm(total=len(dataloader))

    model.eval()
    running_loss = 0.0
    targets = []
    preds = []
    with torch.no_grad():
        for batch_idx, (imgs, labels) in enumerate(dataloader):
            imgs = imgs.to(device)
            labels = labels.to(device)

            y_pred = model(imgs)
            y_pred.to(device)

            preds.append(y_pred.argmax().item())
            targets.append(labels[0].item())

            loss = criterion(y_pred, labels)
            running_loss += loss.item()

            if batch_idx % 50 == 0:
                val_acc=accuracy_score(targets, preds)
                val_loss=running_loss
                val_precision=precision_score(targets, preds)
                val_recall=recall_score(targets, preds)
                val_f1score=f1_score(targets, preds)

                file.write(f"{round(time.time(),3)},{round(float(val_acc),2)},{round(float(val_loss),4)},{round(float(val_precision),2)},{round(float(val_recall),4)},{round(float(val_f1score),4)}\n")

                progress_bar.set_postfix(
                    val_acc=accuracy_score(targets, preds),
                    val_loss=running_loss,
                    val_precision=precision_score(targets, preds),
                    val_recall=recall_score(targets, preds),
                    val_f1score=f1_score(targets, preds)
                )

            progress_bar.update()

    eval_results = {
        "Val Accuracy": accuracy_score(targets, preds),
        "Val loss": running_loss,
        "Val Precision": precision_score(targets, preds),
        "Val Recall": recall_score(targets, preds),
        "Val F1score": f1_score(targets, preds),
    }
    progress_bar.close()
    file.close()
    return eval_results


if __name__ == "__main_":
    from src.dataset import get_dataset, get_dataloader
    from src.preprocessing import transform

    eval_dataset = get_dataset()
    eval_dataloader = get_dataloader()
    # Create CustomDataset Instance
    eval_dataset = get_dataset(
        root="Images/",
        train=False,
        transform=transform
    )

    # Create a dataloader object with hyperparam
    eval_dataloader = get_dataloader(
        dataset=eval_dataset,
        batch_size=1,
        shuffle=True
    )

    print("============== [ TEST ] EVAL RESULTS ===================")
    print(evaluate_model(model, eval_dataloader))
    print("========================================================")


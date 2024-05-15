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


device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

accuracy = Accuracy(task="multiclass", num_classes=2).to(device)
precision = Precision(task="multiclass", num_classes=2).to(device)
recall = Recall(task="multiclass", num_classes=2).to(device)
f1score = F1Score(task="multiclass", num_classes=2).to(device)
confusion_matrix = ConfusionMatrix(task="multiclass", num_classes=2).to(device)
roc = ROC(task="multiclass", num_classes=2).to(device) # IDK!! How to use?


# Load the model
model = InceptionResnetV2(mode="eval")

# Load criterion
criterion = nn.CrossEntropyLoss()

# load the checkpoints
checkpoint_path = "Checkpoint/waste_clf_trained_model.pth"
checkpoints = torch.load(checkpoint_path)

# Load the trained param to model
model.load_state_dict(checkpoints["model_state_dict"])


def evaluate_model(model, dataloader, log_file="model_eval.log") -> Dict[str, Any]:
    file = open(log_file, "a")
    
    model.eval()
    
    # Data Structure to store metrics data
    preds = []
    targets = []
    avg_eval_acc = []
    avg_eval_loss = []
    confusion_matrix = ConfusionMatrix(task="multiclass", num_classes=2).to(device)
    
    progress_bar = tqdm(total=len(dataloader))
    with torch.no_grad():
        for imgs, labels in dataloader:
            # Put eveything on device
            imgs = imgs.to(device)
            labels = labels.to(device)

            y_pred = model(imgs)
            y_pred.to(device)
            
            preds.extend(y_pred.argmax(dim=1).tolist())
            targets.extend(labels.tolist())
            
            val_loss = criterion(y_pred, labels)
            val_acc = accuracy(y_pred, labels)
            val_f1score = f1score(y_pred, labels)
            val_precision = precision(y_pred, labels)
            val_recall = recall(y_pred, labels)

            avg_eval_acc.append(float(val_acc))
            avg_eval_loss.append(float(val_loss))

            # Update the metrics in progress bar
            progress_bar.set_postfix(
                train_acc=float(val_acc),
                train_loss=val_loss.item(),
                val_precision=float(val_precision),
                val_recall=float(val_recall),
                val_f1score=float(val_f1score)
            )

            # file.write(f"{round(time.time(),3)},{round(float(train_acc),2)},{round(float(loss),4)},{round(float(val_acc),2)},{round(float(val_loss),4)}\n")
            file.write(f"{round(time.time(),3)},{round(float(val_acc),2)},{round(float(val_loss),4)},{round(float(val_precision),2)},{round(float(val_recall),4)},{round(float(val_f1score),4)}\n")
            progress_bar.update(1)
        
        ######################### Evaluation Results #################################
        preds = torch.Tensor(preds).to(device)
        targets = torch.Tensor(targets).to(device)
        print(f"{'Evaluation Results':=^50}")        
        val_loss = criterion(preds, targets)
        val_acc = accuracy(preds, targets)
        val_f1score = f1score(preds, targets)
        val_precision = precision(preds, targets)
        val_recall = recall(preds, targets)
        confusion_matrix(preds, targets)
        
        eval_results = {
            "avg_val_acc": sum(avg_eval_acc)/len(dataloader),
            "avg_val_loss": sum(avg_eval_loss)/len(dataloader),
            "val_loss": float(val_loss),
            "val_acc": float(val_acc),
            "val_f1score": float(val_f1score),
            "val_precision": float(val_precision),
            "val_recall": float(val_recall),
            "confusion_matrix": confusion_matrix,
            "preds": preds.tolist(), 
            "targets": targets.tolist(),
        }
        confusion_matrix.plot(labels=["Organic", "Recyclable"])
    progress_bar.close()
    file.close()
    return eval_results

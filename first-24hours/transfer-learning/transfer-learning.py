# Python
# write a pytorch training loop to retrain the final fully connected layer of a pre-trained otherwise frozen resnet50 on imagenet from labelled folders of images on the local machine

import torch
import torchvision
from torchvision import transforms
import torch.nn as nn

# define transforms
transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )])

# load pre-trained ResNet50
model = torchvision.models.resnet50(pretrained=True)

# freeze the model parameters (except for the last fully connected layer)
for param in model.parameters():
    param.requires_grad = False

# replace the last layer with a new fully connected layer
n_inputs = model.fc.in_features
model.fc = nn.Linear(n_inputs, 2)

# define optimizer
optimizer = torch.optim.Adam(model.fc.parameters(), lr=0.001)

# define loss function
loss_fn = nn.CrossEntropyLoss()

# define dataloaders
train_dataset = torchvision.datasets.ImageFolder(
    root='data/aurifex-toast',
    transform=transform
)

train_loader = torch.utils.data.DataLoader(
    train_dataset,
    batch_size=64,
    shuffle=True
)

# start training loop
epochs = 10

for epoch in range(epochs):
    
    running_loss = 0.0
    
    # loop over batches
    for images, labels in train_loader:
        # make sure gradients are zeroed
        optimizer.zero_grad()
        
        # forward pass
        outputs = model(images)
        loss = loss_fn(outputs, labels)
        
        # backward pass
        loss.backward()
        
        # update weights
        optimizer.step()
        
        # accumulate loss
        running_loss += loss.item()
        
    # print loss at the end of each epoch
    print('Epoch: {}, Loss: {:.4f}'.format(epoch+1, running_loss/len(train_loader)))
    
print('Training complete')
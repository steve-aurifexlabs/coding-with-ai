# Write a python function that uses phonemizer to convert an audio recording into a list of phonemes. It takes the path to a wav file and writes the output as a json file to the same folder.

def convertWavToPhonemesJson(inputFilePath, outputFilePath):
    # Load the audio file
    audio, sr = librosa.load(inputFilePath)

    # Convert the audio to phonemes
    phonemes = phonemizer.phonemize(audio, sr)

    # Write the phonemes to a json file
    with open(outputFilePath, 'w') as outfile:
        json.dump(phonemes, outfile)

# Write a python function that reads the file output from the above function and use a text-to-speech library to generate audio and save it as a wav file.

def convertPhonemesJsonToWav(inputFilePath, outputFilePath):
    # Read the phonemes from the json file
    with open(inputFilePath) as json_file:
        phonemes = json.load(json_file)

    # Convert the phonemes to audio
    audio = phonemizer.synthesize(phonemes)

    # Write the audio to a wav file
    librosa.output.write_wav(outputFilePath, audio, sr=16000)

# Write a python function that takes a list of phonemes and converts it to a list of words.

def convertPhonemesToWords(phonemes):
    words = []

    for phoneme in phonemes:
        if phoneme == ' ':
            words.append(' ')
        else:
            words.append(phoneme[0])

    return words
    
# Write a function that loads a wav file and renders a spectrogram and saves that as a png file.

def convertWavToSpectrogram(inputFilePath, outputFilePath):
    # Load the audio file
    audio, sr = librosa.load(inputFilePath)

    # Convert the audio to a spectrogram
    spectrogram = librosa.feature.melspectrogram(audio, sr=sr)

    # Save the spectrogram as a png file
    plt.figure(figsize=(10, 4))
    librosa.display.specshow(librosa.power_to_db(spectrogram, ref=np.max), y_axis='mel', fmax=8000, x_axis='time')
    plt.colorbar(format='%+2.0f dB')
    plt.tight_layout()
    plt.savefig(outputFilePath)

# Write a function that loads a png file and converts it to a wav file.

def convertSpectrogramToWav(inputFilePath, outputFilePath):
    # Load the spectrogram from the png file
    spectrogram = imageio.imread(inputFilePath)

    # Convert the spectrogram to audio
    audio = librosa.feature.inverse.mel_to_audio(spectrogram)

    # Write the audio to a wav file
    librosa.output.write_wav(outputFilePath, audio, sr=16000)
    
# Write a function that performs a pytorch training loop that reads png(spectrogram) files generated above and uses transfer learning on a pretrained ResNet50 model with all but the top layer frozen. The function takes the path to the folder of folders of spectrogram pngs labelled by the phoneme, and writes the serialized model to disk.

def trainModel(dataPath):
    # Create a list of all the folders in the data path
    folders = [f for f in os.listdir(dataPath) if os.path.isdir(os.path.join(dataPath, f))]

    # Create a list of all the files in each folder
    files = []
    for folder in folders:
        files.append([f for f in os.listdir(os.path.join(dataPath, folder)) if os.path.isfile(os.path.join(dataPath, folder, f))])

    # Create a list of all the labels
    labels = []
    for folder in folders:
        labels.append(folder)

    # Create a list of all the paths to the files
    paths = []
    for i in range(len(folders)):
        for file in files[i]:
            paths.append(os.path.join(dataPath, folders[i], file))

    # Create a list of all the labels for each file
    labelList = []
    for i in range(len(folders)):
        for file in files[i]:
            labelList.append(labels[i])

    # Create a dictionary of the labels and their indices
    labelDict = {}
    for i in range(len(labels)):
        labelDict[labels[i]] = i

    # Create a list of all the indices for each file
    indexList = []
    for label in labelList:
        indexList.append(labelDict[label])

    # Create a pytorch dataset from the paths and indices
    dataset = SpectrogramDataset(paths, indexList)

    # Split the dataset into training and validation sets
    train_size = int(0.8 * len(dataset))
    val_size = len(dataset) - train_size
    train_dataset, val_dataset = torch.utils.data.random_split(dataset, [train_size, val_size])

    # Create a pytorch dataloader from the training set and validation set
    train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
    val_loader = DataLoader(val_dataset, batch_size=32, shuffle=True)

    # Load a pretrained ResNet50 model with all but the top layer frozen
    model = models.resnet50()
    num_ftrs = model.fc.in_features
    model.fc = nn.Linear(num_ftrs, len(labels))

    for param in model.parameters():
        param.requires_grad = False

    model.fc = nn.Sequential(nn.Linear(num_ftrs, 256), nn.ReLU(), nn.Dropout(), nn.Linear(256, len(labels)), nn.LogSoftmax())

    # Define the loss function and optimizer to use during training
    criterion = nn.NLLLoss()
    optimizer = optim.Adam(model.fc.parameters(), lr=0.003)

    # Train the model on the training set and validate it on the validation set using GPU if available otherwise CPU
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    model = model.to(device)

    epochs = 5

    for e in range(epochs):
        running_loss = 0

        for images, labels in train_loader:
            images = images.to(device)
            labels = labels.to(device)

            optimizer.zero_grad()

            logps = model(images)

            loss = criterion(logps, labels)

            loss.backward()

            optimizer.step()

            running_loss += loss.item()

        else:
            val_loss = 0

            accuracy = 0

            with torch.no_grad():
                model.eval()

                for images, labels in val_loader:
                    images = images.to(device)
                    labels = labels.to(device)

                    logps = model(images)

                    loss = criterion(logps, labels)

                    val_loss += loss.item()

                    ps = torch.exp(logps)

                    top_p, top_class = ps.topk(1, dim=1)

                    equals = top_class == labels.view(*top_class.shape)

                    accuracy += torch.mean(equals).item()

                print("Epoch: {}/{}.. ".format(e+1, epochs), "Training Loss: {:4f}.. ".format(running_loss/len(train_loader)), "Validation Loss: {:4f}.. ".format(val_loss/len(val_loader)), "Validation Accuracy: {:4f}".format((accuracy/len(val_loader))*100))

                model.train()

                running_loss = 0

                modelName = 'model' + str((e+1)*20) + '.pth'

                torch.save(model, modelName)

# Write a function that takes a wav file and uses the model generated above to predict the phoneme.

def predictPhoneme(inputFilePath, modelPath):
    # Load the audio file
    audio, sr = librosa.load(inputFilePath)

    # Convert the audio to a spectrogram
    spectrogram = librosa.feature.melspectrogram(audio, sr=sr)

    # Convert the spectrogram to a pytorch tensor
    spectrogram = torch.from_numpy(spectrogram).float()

    # Reshape the tensor to be compatible with the model
    spectrogram = spectrogram.unsqueeze(0).unsqueeze(0)

    # Load the model
    model = torch.load(modelPath)

    # Predict the phoneme using GPU if available otherwise CPU
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    model = model.to(device)

    with torch.no_grad():
        model.eval()

        logps = model(spectrogram)

        ps = torch.exp(logps)

        top_p, top_class = ps.topk(1, dim=1)

        return top_class[0].item()
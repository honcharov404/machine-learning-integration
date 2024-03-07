const MLRegression = require('ml-regression');
const fs = require('fs');

class MachineLearningIntegration {
  constructor() {
    this.model = null;
  }

  trainModel(trainingData) {
    const inputs = trainingData.map(entry => entry.input);
    const outputs = trainingData.map(entry => entry.output);

    this.model = new MLRegression.LinearRegression(inputs, outputs);
  }

  saveModelToFile(filename) {
    if (!this.model) {
      console.error('Model not trained yet. Please train the model before saving.');
      return;
    }

    const modelData = this.model.toJSON();
    fs.writeFileSync(filename, JSON.stringify(modelData));
    console.log('Model saved successfully.');
  }

  loadModelFromFile(filename) {
    const modelData = JSON.parse(fs.readFileSync(filename, 'utf-8'));
    this.model = MLRegression.load(modelData);
    console.log('Model loaded successfully.');
  }

  predict(input) {
    if (!this.model) {
      console.error('Model not trained yet. Please train the model before making predictions.');
      return null;
    }

    return this.model.predict(input);
  }
}

// Example usage:
// const mlIntegration = new MachineLearningIntegration();

// Example training data
// const trainingData = [
//   { input: [1], output: 2 },
//   { input: [2], output: 4 },
//   { input: [3], output: 6 },
// ];

// mlIntegration.trainModel(trainingData);

// Save the trained model to a file
// mlIntegration.saveModelToFile('trained-model.json');

// Load the model from a file
// mlIntegration.loadModelFromFile('trained-model.json');

// Make a prediction
// const prediction = mlIntegration.predict([4]);
// console.log('Prediction:', prediction);

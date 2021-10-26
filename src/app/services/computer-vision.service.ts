import { Injectable } from '@angular/core';

import { ComputerVisionClient } from '@azure/cognitiveservices-computervision';
import { CognitiveServicesCredentials } from '@azure/ms-rest-azure-js';
import { FaceClient, FaceModels } from '@azure/cognitiveservices-face';

@Injectable({
  providedIn: 'root'
})
export class ComputerVisionService {

  endPoint = 'https://ronanteste.cognitiveservices.azure.com/';
  key = '740cb3cf2b0d4937b6fbcb53067325d5';

  endpointFace = 'https://testeface.cognitiveservices.azure.com/';
  keyFace = '37c8afc2b51e4e419c1b73c8b19ece72';

  constructor() { }

  async detalhesImagem(image: Blob) {
    const cognitiveServiceCredentials = new CognitiveServicesCredentials(this.key);
    const client = new ComputerVisionClient(cognitiveServiceCredentials, this.endPoint);

    return await client.describeImageInStream(image, { language: 'pt' }).then(result => {
      console.log('Análise', result);
      const analise = {
        captions: result.captions[0].text,
        confidence: result.captions[0].confidence,
        tags: result.tags.map(tag => tag),
      };
      return analise;
    });
  }

  async tagsImagem(image: Blob) {
    const cognitiveServiceCredentials = new CognitiveServicesCredentials(this.key);
    const client = new ComputerVisionClient(cognitiveServiceCredentials, this.endPoint);

    return await client.tagImageInStream(image, { language: 'pt' }).then(result => {
      console.log('Tags', result);
      return result.tags;
    });
  }

  async analiseFace(image: Blob) {
    const cognitiveServiceCredentials = new CognitiveServicesCredentials(this.keyFace);
    const client = new FaceClient(cognitiveServiceCredentials, this.endpointFace);

    return await client.face.detectWithStream(image,
      {
        returnFaceAttributes: ['age', 'gender', 'smile',
          'facialHair', 'glasses', 'emotion', 'hair', 'makeup',
          'accessories']
      }
    ).then(result => {
      const faces = result.map(face => ({
        age: face.faceAttributes.age,
        accessories: face.faceAttributes.accessories,
        emotion: face.faceAttributes.emotion,
        facialHair: face.faceAttributes.facialHair,
        gender: face.faceAttributes.gender,
        hair: face.faceAttributes.hair,
        makeup: face.faceAttributes.makeup,
        smile: face.faceAttributes.smile,
        glasses: face.faceAttributes.glasses
      }));
      console.log('Face', faces);
      return faces;
    });
  }
}

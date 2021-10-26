import { Injectable } from '@angular/core';
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';

@Injectable({
  providedIn: 'root'
})
export class BlobService {

  accountName = 'testeai';
  containerName = 'testeai';

  constructor() { }

  private containerClient(): ContainerClient {
    return new BlobServiceClient(`https://${this.accountName}.blob.core.windows.net/`).getContainerClient(this.containerName);
  }
}

import { Injectable } from '@angular/core';
import { SplitFactory } from '@splitsoftware/splitio';
import { fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SplitioService {
  splitio: SplitIO.ISDK;
  splitClient: SplitIO.IClient;
  isReady = false;
  treatments: SplitIO.Treatments;
  features: string[] = [
    'allow_delete'
  ];

  constructor() { }

  initSdk(): void {
    this.splitio = SplitFactory({
      core: {
        authorizationKey: 'localhost',
        key: 'customer-key'
      },
      // In non-localhost mode, this map is ignored.
      features: {
        allow_delete: 'off'
      }
    });

    this.splitClient = this.splitio.client();

    this.verifyReady();
  }

  private verifyReady(): void {
    const isReadyEvent = fromEvent(this.splitClient, this.splitClient.Event.SDK_READY);

    const subscription = isReadyEvent.subscribe({
      next() {
        this.isReady = true;
        console.log('Sdk ready: ', this.isReady);
      },
      error(err) {
        console.log('Sdk error: ', err);
        this.isReady = false;
      }
    });
  }

  getTreatments(): void {
    this.treatments = this.splitClient.getTreatments(this.features);
  }

}

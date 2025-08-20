import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FunctionsService } from '../../services/functions-service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-google-drive-demo',
  imports: [CommonModule],
  templateUrl: './google-drive-demo.html',
  styleUrl: './google-drive-demo.scss'
})
export default class GoogleDriveDemo {
    readonly funcs = inject(FunctionsService);
  readonly msg = rxResource({
    stream: () => this.funcs.getFilesFromGoogleDrive()
  })


}

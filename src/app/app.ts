import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { FunctionsService } from './services/functions-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly funcs = inject(FunctionsService);
  readonly msg = rxResource({
    stream: () => this.funcs.getFilesFromGoogleDrive()
  })
}

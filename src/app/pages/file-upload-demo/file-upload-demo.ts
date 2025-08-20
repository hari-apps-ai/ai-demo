import { Component, inject } from '@angular/core';
import { FunctionsService } from '../../services/functions-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-upload-demo',
  imports: [CommonModule],
  templateUrl: './file-upload-demo.html',
  styleUrl: './file-upload-demo.scss'
})
export default class FileUploadDemo {
}

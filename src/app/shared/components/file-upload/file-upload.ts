import { Component, input, output } from '@angular/core';
import { FileUploadStatus } from './file-upload.model';

@Component({
  selector: 'app-file-upload',
  imports: [],
  templateUrl: './file-upload.html',
  styleUrl: './file-upload.scss'
})
export class FileUpload {
  readonly status = input.required<FileUploadStatus>();
  readonly fileSelected = output<File>();
}

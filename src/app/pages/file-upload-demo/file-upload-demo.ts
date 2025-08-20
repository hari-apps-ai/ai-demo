import { Component, inject, signal } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FileUploadStatus } from '../../shared/components/file-upload/file-upload.model';

@Component({
  selector: 'app-file-upload-demo',
  imports: [SharedModule],
  templateUrl: './file-upload-demo.html',
  styleUrl: './file-upload-demo.scss'
})
export default class FileUploadDemo {
  readonly status = signal<FileUploadStatus>({status: 'idle', accept: '*.pdf'});
}

import {
  Component,
  computed,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { FileUploadStatus } from './file-upload.model';
import { acceptedFileTypes } from './file-upload.helpers';

@Component({
  selector: 'app-file-upload',
  imports: [],
  templateUrl: './file-upload.html',
  styleUrl: './file-upload.scss',
})
export class FileUpload {
  readonly status = input.required<FileUploadStatus>();
  readonly fileSelected = output<File>();
  readonly fileInput =
    viewChild.required<ElementRef<HTMLInputElement>>('filesControl');

  readonly accept = computed(() => acceptedFileTypes(this.status()));
  readonly canDrop = signal(false);

  onSelect() {
    const files = this.fileInput().nativeElement.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (this.isFileAccepted(file)) {
      this.fileSelected.emit(file);
      this.fileInput().nativeElement.value = '';
      }
    }
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (
      event.dataTransfer &&
      event.dataTransfer.files.length > 0 &&
      this.isFileAcceptable(event.dataTransfer.items)
    ) {
      const file = event.dataTransfer.files[0];
      this.fileSelected.emit(file);
      this.fileInput().nativeElement.value = '';
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    const canDrop = this.isFileAcceptable(event.dataTransfer?.items ?? null);
    this.canDrop.set(canDrop);
  }

  isFileAcceptable(items: DataTransferItemList | null): boolean {
    if (!items) {
      return false; // No items to check
    }
    if (this.status().status !== 'idle') {
      return false;
    }
    const accept = this.accept();
    if (!accept) {
      return true; // No restrictions
    }
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.kind === 'file' && !item.type.match(accept)) {
        return false; // File type not accepted
      }
    }
    return true; // All files accepted
  }

  isFileAccepted(file: File): boolean {
    const accept = this.accept();
    if (!accept) {
      return true; // No restrictions
    }
    return file.type.match(accept) !== null; // Check if file type matches accepted types
  }
}

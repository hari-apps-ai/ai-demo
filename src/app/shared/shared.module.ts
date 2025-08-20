import { NgModule } from "@angular/core";
import { FileUpload } from "./components/file-upload/file-upload";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

const expotables = [
    FileUpload, 
    CommonModule, 
    RouterModule
];

@NgModule({
    imports: [...expotables], 
    exports: [...expotables],
})
export class SharedModule {}
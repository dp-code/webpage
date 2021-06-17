import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactComponent} from './contact/contact.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    CKEditorModule
  ]
})
export class ContactModule {
}

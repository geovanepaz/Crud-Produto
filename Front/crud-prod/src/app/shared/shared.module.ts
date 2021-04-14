import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDeletarComponent } from './modal-deletar/modal-deletar.component';



@NgModule({
  declarations: [ModalDeletarComponent],
  imports: [
    CommonModule
  ],
  exports: [ModalDeletarComponent],
  entryComponents: [ModalDeletarComponent]
})
export class SharedModule { }

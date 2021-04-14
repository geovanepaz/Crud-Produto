import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDeletarComponent } from './modal-deletar/modal-deletar.component';
import { PrimeiraMaiusculaPipe } from './pipes/primeira-maiuscula.pipe';
import { ModalImagemComponent } from './modal-imagem/modal-imagem.component';



@NgModule({
  declarations: [ModalDeletarComponent, PrimeiraMaiusculaPipe, ModalImagemComponent],
  imports: [
    CommonModule
  ],
  exports: [ModalDeletarComponent, PrimeiraMaiusculaPipe, ModalImagemComponent],
  entryComponents: [ModalDeletarComponent, ModalImagemComponent]
})
export class SharedModule { }

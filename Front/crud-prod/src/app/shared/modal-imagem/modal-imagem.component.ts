import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-imagem',
  templateUrl: './modal-imagem.component.html',
  styleUrls: ['./modal-imagem.component.css']
})
export class ModalImagemComponent implements OnInit {

  @Input()
  imagemByte: any;

  @Input()
  nome: string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-deletar',
  templateUrl: './modal-deletar.component.html',
  styleUrls: ['./modal-deletar.component.css']
})
export class ModalDeletarComponent implements OnInit {
  @Input()
  nome: string;
 
  @Input()
  descricao: string;

  @Input()
  valor: string;

  @Input()
  id: string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() { }
}


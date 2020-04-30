import { MatSort } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';


import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Produto } from '../models/produto';
import { ProdutoService } from '../produto.service';

import { ToastrService } from 'ngx-toastr';
import { ModalDeletarComponent } from '../../shared/modal-deletar/modal-deletar.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  produtos: Produto[];

  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  termo: string;
  imagem: any;

  constructor(
    private produtoService: ProdutoService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.currentPage = 1;
    this.itemsPerPage = 10;
    this.termo = '';
    this.sort = new MatSort();

    this.obterProdutos();
  }

  openModal(id: string, nome: string, descricao: string, valor: string) {
    const modalRef = this.modalService.open(ModalDeletarComponent);
    modalRef.componentInstance.nome = nome;
    modalRef.componentInstance.descricao = descricao;
    modalRef.componentInstance.valor = valor;
    modalRef.componentInstance.id = id;

    modalRef.result
      .then((result) => {
        this.onDelete(result);
      },
        () => modalRef.close()
      );
  }

  onDelete(id: string) {
    this.produtoService.deletarProduto(id)
      .subscribe(
        () => {
          this.toastr.success('ITEM DELETADO COM SUCESSO');
          this.obterProdutos();
        },
        error => {
          if (error.status !== 404)
            this.toastr.error(error.error.message);
        }
      );
  }

  onPageChange(event: any) {
    this.currentPage = event;
    this.obterProdutos();
  }

  onSubmitFiltro(termo: string) {
    this.currentPage = 1;
    this.obterProdutos();
  }

  obterProdutos() {
    this.spinner.show();
    
    this.produtoService.filtrarProdutos(this.termo, this.itemsPerPage, this.currentPage, this.sort.active, this.sort.direction === "asc")
      .subscribe(
        response => {
          this.produtos = response.produtos;
          this.totalItems = response.quantidadeTotal;
          this.spinner.hide();
        },
        () => {
          this.produtos = [];
          this.totalItems = 0;
          this.spinner.hide();
        }
      );
  }
}
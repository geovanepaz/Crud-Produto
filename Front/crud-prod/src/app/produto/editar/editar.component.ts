import { Component, OnInit, ElementRef, ViewChildren, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Observable, fromEvent, merge } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { utilsBr } from 'js-brasil';

import { Produto } from '../models/produto';
import { ProdutoService } from '../produto.service';
import { Categoria } from '../models/Categoria';
import { ValidationMessages, GenericValidator, DisplayMessage } from '../../core/_helpers/generic-form-validation';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  categorias$: Observable<Categoria[]>;

  fileToUpload: File;
  cadastroForm: FormGroup;

  MASKS = utilsBr.MASKS;

  produto: Produto;
  produtos: Produto[];
  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage;

  formResult: string;
  id: string;

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {

    this.validationMessages = {
      categoriaId: {
        required: 'obrigatório'
      },
      nome: {
        required: 'obrigatório',
        minlength: 'O nome precisa ter no mínimo 2 caracteres',
        maxlength: 'O nome precisa ter no máximo 150 caracteres'
      },
      descricao: {
        required: 'obrigatório'
      },
      valor: {
        required: 'obrigatório',
        min: "igual a zero"
      },
      imagem: {
        required: 'obrigatório'
      },
      quantidadeEstoque: {
        required: 'obrigatório',
        min: "igual a zero"
      },
      altura: {
        required: 'obrigatório',
        min: "igual a zero"
      },
      largura: {
        required: 'obrigatório',
        min: "igual a zero"
      },
      profundidade: {
        required: 'obrigatório',
        min: "igual a zero"
      },
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
    this.fileToUpload = null;
    this.displayMessage = {};
    this.formResult = '';
  }

  ngOnInit() {
    this.spinner.show();

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.spinner.hide();
    });

    this.cadastroForm = this.fb.group({
      id: [''],
      categoriaId: [, [Validators.required]],
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      descricao: ['', [Validators.required]],
      valor: ['', [Validators.required, Validators.min(1)]],
      imagem: ['', [Validators.required]],
      quantidadeEstoque: ['', [Validators.required, Validators.min(1)]],
      altura: ['', [Validators.required, Validators.min(1)]],
      largura: ['', [Validators.required, Validators.min(1)]],
      profundidade: ['', [Validators.required, Validators.min(1)]],
      ativo: [true],
    });

    this.obterCategorias();

    this.produtoService.obterProdutosPorId(this.id)
      .subscribe(produto => this.popularFormulario(produto));
  }

  popularFormulario(produto: Produto) {
    this.cadastroForm.setValue({
      id: produto.id,
      categoriaId: produto.categoriaId,
      nome: produto.nome,
      descricao: produto.descricao,
      valor: produto.valor,
      imagem: produto.imagem,
      quantidadeEstoque: produto.quantidadeEstoque,
      altura: produto.altura,
      largura: produto.largura,
      profundidade: produto.profundidade,
      ativo: produto.ativo
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.cadastroForm, false);
    });
  }

  validaSelecect() {
    this.displayMessage = this.genericValidator.processarMensagens(this.cadastroForm, false);
  }

  onSubmit() {
    if (!this.formValido()) return;
    this.spinner.show();

    this.produto = Object.assign({}, this.produto, this.cadastroForm.value);

    this.produtoService.atualizarProduto(this.produto)
      .subscribe(
        () => {
          this.spinner.hide();
          this.toastr.success('PRODUTO EDITADO', 'SUCESSO');
        },
        error => {
          this.spinner.hide();
          this.toastr.error(error.error.message, "ERRO");
        }
      );
  }

  formValido(): Boolean {
    this.displayMessage = this.genericValidator.processarMensagens(this.cadastroForm, true);
    return this.cadastroForm.valid;
  }

  obterCategorias(): void {
    this.categorias$ = this.produtoService.obterCategorias();
  }
}

import { Component, OnInit, ElementRef, ViewChildren, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { utilsBr } from 'js-brasil';


import { Produto } from '../models/produto';
import { ProdutoService } from '../produto.service';
import { Categoria } from '../models/Categoria';

import { Observable, fromEvent, merge } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ValidationMessages, GenericValidator, DisplayMessage } from '../../core/_helpers/generic-form-validation';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit, AfterViewInit {

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

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private toastr: ToastrService,
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
    this.cadastroForm = this.fb.group({
      categoriaId: [, [Validators.required]],
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      descricao: ['', [Validators.required]],
      valor: ['', [Validators.required, Validators.min(1)]],
      imagem: ['caneca1', [Validators.required]],
      quantidadeEstoque: ['', [Validators.required, Validators.min(1)]],
      altura: ['', [Validators.required, Validators.min(1)]],
      largura: ['', [Validators.required, Validators.min(1)]],
      profundidade: ['', [Validators.required, Validators.min(1)]],
      ativo: [true],
    });

    this.obterCategorias();
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.cadastroForm);
     });
  }

  validaSelecect() {
    this.displayMessage = this.genericValidator.processarMensagens(this.cadastroForm);
  }

  onSubmit() {
    if (!this.cadastroForm.valid) return;

    this.spinner.show();

    this.produto = Object.assign({}, this.produto, this.cadastroForm.value);

    this.produtoService.salvarProduto(this.produto)
      .subscribe(
        () => {
          this.spinner.hide();
          this.toastr.success('PRODUTO CADASTRADO', 'SUCESSO');
          this.ngOnInit();
        },
        error => {
          this.spinner.hide();
          this.toastr.error(error.error.message);
        }
      );
  }

  limparErro(key:string) : void {
    this.displayMessage[key] = '';
  }
  
  obterCategorias(): void {
    this.categorias$ = this.produtoService.obterCategorias();
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  private salvarImagem(id: string) {
    this.produtoService.UploadImagem(this.fileToUpload, id)
      .subscribe(
        () => this.toastr.success('UPLOAD COMPLETO', 'SUCESSO'),
        error => this.toastr.error(error.error.message)
      )
  }
}

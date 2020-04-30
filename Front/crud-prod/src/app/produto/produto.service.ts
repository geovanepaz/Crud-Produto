import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from 'rxjs';

import { Produto } from './models/produto';
import { Categoria } from './models/Categoria';
import { ProdutoPaginacao } from './models/produtoPaginacao';
import { BaseService } from '../core/_services';

@Injectable()
export class ProdutoService extends BaseService {

  constructor(private http: HttpClient) {
    super()
    this.urlServiceV1 += "produto/";
  }

  obterProdutos(): Observable<Produto[]> {
    return this.http
      .get<Produto[]>(this.urlServiceV1);
  }

  filtrarProdutos(termo: string, itensPorPagina: number, pagina: number, colunaOrdenacao: string, ordeCrescente: boolean): Observable<ProdutoPaginacao> {
    let parametros = `paginacao?termo=${termo}&itensPorPagina=${itensPorPagina}&pagina=${pagina}&colunaOrdenacao=${colunaOrdenacao}&ordeCrescente=${ordeCrescente}`;
    return this.http.get<ProdutoPaginacao>(this.urlServiceV1 + parametros);
  }

  obterProdutosPorId(id: string): Observable<Produto> {
    return this.http
      .get<Produto>(this.urlServiceV1 + id);
  }

  deletarProduto(id: string): Observable<boolean> {
    return this.http
      .delete<boolean>(this.urlServiceV1 + id);
  }

  obterCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.urlServiceV1 + "categoria");
  }

  salvarProduto(produto: Produto): Observable<string> {
    return this.http.post<string>(this.urlServiceV1, JSON.stringify(produto), this.obterHeaderJson());
  }

  atualizarProduto(produto: Produto): Observable<any> {
    return this.http.put(this.urlServiceV1, JSON.stringify(produto), this.obterHeaderJson());
  }

  UploadImagem(fileToUpload: File, id: string): Observable<boolean> {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    return this.http.post<boolean>(this.urlServiceV1 + "upload-imagem?idProduto=" + id, formData);
  }
}
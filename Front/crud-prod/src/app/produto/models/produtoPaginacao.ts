import { Produto } from './produto';

export interface ProdutoPaginacao {
    produtos: Produto[];
    quantidadeTotal: number;
}


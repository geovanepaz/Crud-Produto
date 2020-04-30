export interface Produto {
    id: string;
    categoriaId: string
    nome: string;
    descricao: string;
    ativo: boolean;
    valor: number;
    imagemByte: any;
    imagem: string;
    quantidadeEstoque: number;
    altura: number;
    largura: number;
    profundidade: number;
}


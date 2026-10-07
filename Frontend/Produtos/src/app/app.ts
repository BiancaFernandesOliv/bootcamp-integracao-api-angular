import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Produto } from './models/produto.model';
import { ProdutosService } from './services/produtos.service';

type TipoMensagem = '' | 'erro' | 'sucesso';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  produtos = signal<Produto[]>([]);

  idBusca: number | null = null;
  produtoEncontrado = signal<Produto | null>(null);
  mensagemBusca = '';
  tipoBusca: TipoMensagem = '';

  nomeNovoProduto = '';
  precoNovoProduto: number | null = null;
  mensagemCadastro = '';
  tipoCadastro: TipoMensagem = '';

  idEdicao: number | null = null;
  nomeEdicao = '';
  precoEdicao: number | null = null;
  mensagemEdicao = '';
  tipoEdicao: TipoMensagem = '';

  produtoParaRemover = signal<Produto | null>(null);

  constructor(private produtosService: ProdutosService) { }

  ngOnInit(): void {
    this.produtosService.buscarProdutos().subscribe({
      next: (produtos) => {
        this.produtos.set(produtos);
      },
      error: (erro) => {
        console.error('Erro ao buscar produtos:', erro);
      }
    });
  }

  buscarPorId(): void {
    if (this.idBusca === null || this.idBusca <= 0) {
      this.produtoEncontrado.set(null);
      this.mensagemBusca = 'Informe um ID válido.';
      return;
    }

    this.produtosService.buscarProdutoPorId(this.idBusca).subscribe({
      next: (produto) => {
        this.produtoEncontrado.set(produto);
        this.mensagemBusca = '';
      },
      error: (erro) => {
        console.error('Erro ao buscar produto:', erro);
        this.produtoEncontrado.set(null);
        this.mensagemBusca = 'Produto não encontrado.';
      }
    });
  }

  adicionarProduto(): void {
    if (!this.nomeNovoProduto || this.precoNovoProduto === null) {
      this.mensagemCadastro = 'Preencha o nome e o preço.';
      this.tipoCadastro = 'erro';
      return;
    }

    const novoProduto = {
      nome: this.nomeNovoProduto,
      preco: this.precoNovoProduto
    };

    this.produtosService.criarProduto(novoProduto).subscribe({
      next: (produto) => {
        this.produtos.update(produtos => [...produtos, produto]);

        this.nomeNovoProduto = '';
        this.precoNovoProduto = null;
        this.mensagemCadastro = 'Produto adicionado com sucesso!';
        this.tipoCadastro = 'sucesso';
      },
      error: (erro) => {
        console.error('Erro ao adicionar produto:', erro);
        this.mensagemCadastro = 'Erro ao adicionar produto.';
        this.tipoCadastro = 'erro';
      }
    });
  }

  editarProduto(produto: Produto): void {
    this.idEdicao = produto.id;
    this.nomeEdicao = produto.nome;
    this.precoEdicao = produto.preco;
    this.mensagemEdicao = '';
    this.tipoEdicao = '';
  }

  cancelarEdicao(): void {
    this.idEdicao = null;
    this.nomeEdicao = '';
    this.precoEdicao = null;
  }

  salvarEdicao(): void {
    if (
      this.idEdicao === null ||
      !this.nomeEdicao ||
      this.precoEdicao === null
    ) {
      return;
    }

    const idAtual = this.idEdicao;
    const nome = this.nomeEdicao;
    const preco = this.precoEdicao;

    this.produtosService.atualizarProduto(idAtual, { nome, preco }).subscribe({
      next: () => {
        this.produtos.update(produtos =>
          produtos.map(p =>
            p.id === idAtual ? { ...p, nome, preco } : p
          )
        );

        this.mensagemEdicao = 'Produto atualizado com sucesso!';
        this.tipoEdicao = 'sucesso';
        this.cancelarEdicao();
      },
      error: (erro) => {
        console.error('Erro ao atualizar produto:', erro);
        this.mensagemEdicao = 'Erro ao atualizar produto.';
        this.tipoEdicao = 'erro';
      }
    });
  }

  removerProduto(produto: Produto): void {
    this.produtoParaRemover.set(produto);
  }

  confirmarRemocao(): void {
    const produto = this.produtoParaRemover();

    if (!produto) {
      return;
    }

    this.produtosService.removerProduto(produto.id).subscribe({
      next: () => {
        this.produtos.update(produtos =>
          produtos.filter(p => p.id !== produto.id)
        );

        if (this.produtoEncontrado()?.id === produto.id) {
          this.produtoEncontrado.set(null);
        }

        this.produtoParaRemover.set(null);
      },
      error: (erro) => {
        console.error('Erro ao remover produto:', erro);
        this.produtoParaRemover.set(null);
      }
    });
  }

  cancelarRemocao(): void {
    this.produtoParaRemover.set(null);
  }

  formatarPreco(preco: number): string {
    return preco.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }
}

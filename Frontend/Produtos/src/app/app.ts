import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Produto } from './models/produto.model';
import { ProdutosService } from './services/produtos.service';

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

  nomeNovoProduto = '';
  precoNovoProduto: number | null = null;
  mensagemCadastro = '';

  idEdicao: number | null = null;
  nomeEdicao = '';
  precoEdicao: number | null = null;
  mensagemEdicao = '';

  constructor(private produtosService: ProdutosService) { }

  ngOnInit(): void {
    this.produtosService.buscarProdutos().subscribe({
      next: (produtos) => {
        console.log('Produtos recebidos:', produtos);
        this.produtos.set(produtos);
      },
      error: (erro) => {
        console.error('Erro ao buscar produtos:', erro);
      }
    });
  }

  buscarPorId(): void {
    if (this.idBusca === null) {
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
      },
      error: (erro) => {
        console.error('Erro ao adicionar produto:', erro);
        this.mensagemCadastro = 'Erro ao adicionar produto.';
      }
    });
  }

  editarProduto(produto: Produto): void {
    this.idEdicao = produto.id;
    this.nomeEdicao = produto.nome;
    this.precoEdicao = produto.preco;
  }

  salvarEdicao(): void {
    if (
      this.idEdicao === null ||
      !this.nomeEdicao ||
      this.precoEdicao === null
    ) {
      return;
    }

    const produtoAtualizado = {
      nome: this.nomeEdicao,
      preco: this.precoEdicao
    };

    this.produtosService.atualizarProduto(
      this.idEdicao,
      produtoAtualizado
    ).subscribe({
      next: () => {
        this.produtos.update(produtos =>
          produtos.map(p =>
            p.id === this.idEdicao
              ? {
                ...p,
                nome: this.nomeEdicao,
                preco: this.precoEdicao!
              }
              : p
          )
        );

        this.mensagemEdicao = 'Produto atualizado com sucesso!';

        this.idEdicao = null;
        this.nomeEdicao = '';
        this.precoEdicao = null;
      },
      error: (erro) => {
        console.error('Erro ao atualizar produto:', erro);
        this.mensagemEdicao = 'Erro ao atualizar produto.';
      }
    });
  }

  removerProduto(id: number): void {
    this.produtosService.removerProduto(id).subscribe({
      next: () => {
        this.produtos.update(produtos =>
          produtos.filter(p => p.id !== id)
        );
      },
      error: (erro) => {
        console.error('Erro ao remover produto:', erro);
      }
    });
  }
}

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
}

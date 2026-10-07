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
}

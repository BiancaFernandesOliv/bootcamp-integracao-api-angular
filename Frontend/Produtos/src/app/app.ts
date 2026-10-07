import { Component, OnInit, signal } from '@angular/core';
import { Produto } from './models/produto.model';
import { ProdutosService } from './services/produtos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  produtos = signal<Produto[]>([]);

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
}

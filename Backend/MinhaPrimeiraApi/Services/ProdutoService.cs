using Microsoft.EntityFrameworkCore;
using MinhaPrimeiraApi.Models;
using MinhaPrimeiraApi.Repositories;

namespace MinhaPrimeiraApi.Services {
    public class ProdutoService : IProdutoService {

        private readonly IProdutoRepository _repository;

        public ProdutoService(IProdutoRepository repository) {
            _repository = repository;
        }

        public async Task<List<Produto>> BuscarTodosAsync() {
            return await _repository.BuscarTodosAsync();
        }

        public async Task<Produto?> BuscarPorIdAsync(int id) {
            return await _repository.BuscarPorIdAsync(id);
        }

        public async Task<Produto> CriarAsync(Produto produto) {

            if (await _repository.ExisteNomeAsync(produto.Nome)) throw new ArgumentException("Já existe um produto com o mesmo nome.");

            if (produto.Preco < 0.01m) throw new ArgumentException("O preço do produto deve ser maior que zero.");

            return await _repository.CriarAsync(produto);
        }

        public async Task<Produto?> AtualizarAsync(int id, Produto produtoAtualizado) {
            return await _repository.AtualizarAsync(id, produtoAtualizado);
        }

        public async Task<bool> DeletarAsync(int id) {
            return await _repository.DeletarAsync(id);
        }
    }
}

using MinhaPrimeiraApi.Models;

namespace MinhaPrimeiraApi.Services {
    public interface IProdutoService {

        Task<List<Produto>> BuscarTodosAsync();
        Task<Produto?> BuscarPorIdAsync(int id);
        Task<Produto> CriarAsync(Produto produto);
        Task<Produto?> AtualizarAsync(int id, Produto produtoAtualizado);
        Task<bool> DeletarAsync(int id);
    }
}

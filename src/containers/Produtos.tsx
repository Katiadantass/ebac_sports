import { Produto as ProdutoType } from '../App'
import Produto from '../components/Produto'
import { useGetProdutosQuery } from '../services/api'
import * as S from './styles'
import { useSelector } from 'react-redux'
import { RootReducer } from '../store'

const ProdutosComponent = () => {
  const { data: produtos, isLoading } = useGetProdutosQuery()
  const favoritos = useSelector(
    (state: RootReducer) => state.favoritar.favoritos
  )

  if (isLoading) return <h2>Carregando...</h2>

  const produtoEstaNosFavoritos = (produto: ProdutoType) =>
    favoritos.some((favorito: ProdutoType) => favorito.id === produto.id)

  return (
    <S.Produtos>
      {produtos?.map((produto) => (
        <Produto
          key={produto.id}
          produto={produto}
          estaNosFavoritos={produtoEstaNosFavoritos(produto)}
        />
      ))}
    </S.Produtos>
  )
}

export default ProdutosComponent

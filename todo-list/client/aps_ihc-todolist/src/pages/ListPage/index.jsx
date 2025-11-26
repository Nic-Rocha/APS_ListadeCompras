import './style.css'

function ListPage() {
  return (
    <div className='listPage-wrapper'>
      <main>
        <img class="gatinho" src="../../../src/assets/comprasgato.png" alt="compras_gato" />
        <form action="">
          <section class="newItem">
            <input class="input-item" type="text" id="newInput" placeholder="Adicionar novo item:"></input>
            <input class="input-item" type="text" id="newQuantity" placeholder="Quantidade:"></input>
            <input class="input-item" type="text" id="newPrice" placeholder="Valor:"></input>
            <button onclick="newItem()" class="button-item" id="adicionar-item" type="button">Salvar item</button>

          </section>
        </form>
        <div class="container-lista">
          <h2>Lista de compras</h2>
          <hr />

          <ul id="lista-de-compras">
            <li>
              <div class="lista-item-container">
                <table id="mesa">
                  <tr>
                    <th>Nome | </th>
                    <th>Quantidade | </th>
                    <th>Valor</th>
                  </tr>
                </table>
              </div>
              <p class="texto-data">Segunda-feira (31/10/2022) às 08:30</p>
            </li>
          </ul>
        </div>
      </main>
    </div>
  )
}

export default ListPage
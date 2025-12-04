import './style.css'

function ListItem({ nome, quantidade, valor, data_deadline, data, concluido, onToggle }) {
  return (
    <li className={concluido ? 'item-concluido' : ''}>
      <div className="list-item-container">
        <table className="table-item">
          <tbody>
            <tr>

              <th>
                <input className="checkbox"
                  type="checkbox"
                  checked={concluido} 
                  onChange={onToggle}
                />
              </th>
              {}

              <th className="texto">{nome}</th>
              <th className="texto">{quantidade}</th>
              <th className="texto">{"Deadline:" + data_deadline}</th>
              <button className='lixeira'
                  // onClick={onDelete}
                ><i class="fa-solid fa-trash-can"></i>
              </button>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="texto-data">{"Adicionado em " + data}</p>
    </li>
  );
}

export default ListItem;
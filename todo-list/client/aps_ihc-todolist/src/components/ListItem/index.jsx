import './style.css'

function ListItem({ title, description, deadline, data, concluido, onToggle, deleteFunction }) {
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

              <th className="texto">{title}</th>
              <th className="texto">{description}</th>
              <th className="texto">{"Deadline:" + deadline}</th>

              <button 
                className='lixeira'
                onClick={deleteFunction}>
                <i class="fa-solid fa-trash-can"/>
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
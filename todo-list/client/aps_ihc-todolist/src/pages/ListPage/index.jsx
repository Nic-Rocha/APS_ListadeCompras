import './style.css'

import { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import Form  from '../../components/Form'
import ListItem from '../../components/ListItem'

import { listFields } from './listFields'

function ListPage() {

  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchItems() {
      const token = localStorage.getItem('user_token'); 

      if (!token) {
        alert("Você precisa estar logada!");
        navigate('/'); 
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/tasks', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          }
          
        });
        
        if (response.ok) {
          const dados = await response.json();
          const listaTarefas = dados.tasks || [];
          
          const comprasFormatadas = listaTarefas.map(task => {
            const [qtd, val] = (task.description || " - ").split(' - ');
            
            return {
              id: task.id,
              nome: task.title, 
              quantidade: qtd || "1 un",
              valor: val || "R$ 0,00",
              data: task.deadline 
            };
          });

          setItems(comprasFormatadas); 
        } else {
          console.error("Erro 401 ou outro: Token inválido ou expirado.");
        }
      } catch (error) {
        console.error("Erro de conexão:", error);
      }
    }

    fetchItems();
  }, [navigate]);

  const handleAddItem = async (dadosDoForm) => {
    const token = localStorage.getItem('user_token');
    
    const hoje = new Date().toISOString().split('T')[0];

    const novaTarefa = {
      title: dadosDoForm.title, 
      description: `${dadosDoForm.description} - ${dadosDoForm.deadline}`,
      deadline: hoje
    };

    try {
      const response = await fetch('http://localhost:8000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(novaTarefa)
      });

      if (response.ok) {
        window.location.reload(); 
      } else {
        alert("Erro ao salvar o item!");
      }

    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

  return (
      <div className='list-page-wrapper'>
        <div className='list-page-container'>
          <img className="gatinho" src="../../../src/assets/comprasgato.png" alt="compras_gato" />
          <Form containerWrapper={"input-container"}
                fields={listFields}
                submitText="Criar item"
                formStyle={"list-form"}
                buttomStyle={"button-item"}
                onSubmit={handleAddItem}/>

          <div className="list-container">
            <h2 className='titulo-lista'>Lista de Compras</h2>
            <hr />
            <ul>
              {items.map((item, index) => (
                <ListItem 
                  key={index}
                  nome={item.nome}
                  quantidade={item.quantidade}
                  valor={item.valor}
                  data={item.data}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
  )
}

export default ListPage
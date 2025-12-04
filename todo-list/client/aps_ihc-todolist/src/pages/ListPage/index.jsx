import React, { useState, useEffect } from 'react';

import './style.css'

import Form  from '../../components/Form'
import ListItem from '../../components/ListItem'
import { listFields } from './listFields'

const API_BASE_URL = 'http://localhost:8000';

const getAuthToken = () => localStorage.getItem('authToken');

function ListPage() {

  const [listItems, setListItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItems = async () => {
        const token = getAuthToken();
        
        if (!token) {
            alert("Sua sessão expirou ou você não está logada. Faça login novamente.");
            window.location.href = '/'; 
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_BASE_URL}/tasks`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, 
                },
            });

            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem('authToken');
                    alert("Acesso negado. Por favor, faça login novamente.");
                    window.location.href = '/';
                    return;
                }
                throw new Error(`Erro ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            setListItems(data.tasks || []);

        } catch (err) {
            console.error("Erro ao buscar dados:", err);
            setError(`Falha ao carregar a lista: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleAddItem = async (formData) => {
        const token = getAuthToken();
        if (!token) {
            alert("Sua sessão expirou. Faça login.");
            window.location.href = '/';
            return;
        }

        try {
            const itemPayload = {
                title: formData.title, 
                description: formData.description,
                deadline: formData.data || new Date().toISOString().split('T')[0],
            };

            const response = await fetch(`${API_BASE_URL}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, 
                },
                body: JSON.stringify(itemPayload),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Erro desconhecido' }));
                throw new Error(`Falha ao criar item: ${errorData.message || response.statusText}`);
            }

            const newItem = await response.json();

            setListItems(prevItems => [...prevItems, newItem]);

            alert("Item adicionado com sucesso!");

        } catch (err) {
            console.error("Erro ao adicionar item:", err);
            alert(`Erro: ${err.message}`);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    if (loading) {
        return <div className="list-page-wrapper">Carregando lista...</div>;
    }
    
    if (error) {
        return <div className="list-page-wrapper">Erro: {error}</div>;
    }

    const handleDeleteItem = async (itemId) => {
        if (!window.confirm("Tem certeza que deseja excluir este item?")) return;

        const token = getAuthToken();
        if (!token) return;

        try {
            const response = await fetch(`${API_BASE_URL}/tasks/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Falha ao deletar o item.');
            }

            setListItems(prevItems => prevItems.filter(item => item.id !== itemId));
            
            alert("Item removido!");

        } catch (err) {
            console.error("Erro ao deletar:", err);
            alert("Erro ao deletar o item.");
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
                onSubmit={handleAddItem}
                />

          <div className="list-container">
            <h2 className='titulo-lista'>Lista de Compras</h2>
            <hr />
            <ul>

              {listItems.length > 0 ? (

                listItems.map((item) => (
                  <ListItem
                    key={item.id} 
                    title={item.title} 
                    description={item.description} 
                    deadline={item.deadline}
                    data={item.deadline} 
                    deleteFunction={() => handleDeleteItem(item.id)}
                  />
                ))
              ) : (
                <li>Nenhum item encontrado. Adicione um para começar!</li>
              )}
            </ul>
          </div>
        </div>
      </div>
  )
}

export default ListPage
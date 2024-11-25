
import { useState, useEffect } from 'react';
import React from 'react';
import images from '../../../assets/image/comida.jpg';
import Image from 'next/image';
//import Link from 'next/link';
import Style from './style.module.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ListExcluidaLanch(){


  const [show, setShow] = useState(false);




  const [idLanche, setIdlanche]= useState('')
  const [nomeLanche, setNomelanche] = useState('');
  

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    

  const handleClose = () => setShow(false);
  const handleShow = (idLanche, nomeLanche) =>{
    setIdlanche(idLanche);
    setNomelanche(nomeLanche);
    setShow(true);
  }; 

    //-----------------------------------Listar Lanches-------------------------------
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const res = await fetch('http://127.0.0.1:8000/api/lanchesDestroy');
  
          // Verifique se a resposta está ok (status 200-299)
          if (!res.ok) {
            throw new Error(`Erro na requisição: ${res.statusText}`);
          }
  
          const data = await res.json(); // Converte a resposta para JSON
          setUsers(data);
        } catch (err) {
          setError(err.message); // Salva a mensagem de erro
        } finally {
          setLoading(false); // Finaliza o estado de carregamento
        }
      };


      fetchUsers();
    }, []);
  
    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error}</p>;

const restore = async (id) => {
    try {
      // Envia a requisição DELETE
      const response = await fetch(`http://127.0.0.1:8000/api/lancheRestore/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      // Verifica se a requisição foi bem-sucedida
      if (response.ok) {
        // Caso a API retorne JSON, processa o dado
        if (response.status !== 204) {
          const data = await response.json();
          console.log(data.message); // Exibe mensagem retornada pela API
        }
       
        console.log("Registro restaurado com sucesso!");
        alert("Registro restaurado com sucesso!");
      } else {
        // Trata status HTTP não-200
        console.error(`Erro na requisição: ${response.status}`);
        if (response.status === 400) {
          const errorData = await response.json();
          console.error("Erro de validação:", errorData);
        } else {
          console.error("Erro desconhecido.");
        }
      }
    } catch (error) {
      // Trata erros de rede ou outros problemas
      console.error("Erro na requisição ou conexão:", error);
      alert("Erro ao se conectar com o servidor.");
    }
  };

  // Chamar a função ao clicar no botão
const handleRestore = (id) => {
    restore(id);
  };
  
//-------------------------------------------Deletar lanches ----------------------------------------

    return(

      <div>
     
      <div className={Style.fundoBGLista}>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {users.map((user) => (
            <a key={user.id}  className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
              {user.promotion != 'Produto sem promoção' &&
              <h5 className={Style.headerPromo}>Promoção: {user.promotion}</h5>
              } 
               {user.promotion === 'Produto sem promoção' &&
              <h5 className={Style.headerPromoOff}>Promoção: {user.promotion}</h5>
              }
              
                <Image
                 onClick={()=>handleShow(user.id, user.name)}
                 src={images}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />

              </div>
              <div className=" flex justify-between">
                <h3 className="text-lg text-white">{user.name}</h3>
                <h3 className="text-sm font-medium text-white">R$ {user.discount}</h3>  
              </div>
              <div>
                <div><p className="mt-1 text-sm font-small text-white">{user.description}</p></div>        
              </div>

            </a>
          ))}
        </div>
      </div>
    </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{nomeLanche}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Descrição do lanche</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={()=>handleRestore(idLanche)}>
            Restaurar
          </Button>

        </Modal.Footer>
      </Modal>
      
    
        </div>
    )
}
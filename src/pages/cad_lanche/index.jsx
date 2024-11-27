import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import style from '../cad_lanche/style.module.css';
import React, { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import PoUpSuccess from '../../components/popups/index';
import Link from 'next/link';
import Header from '../../components/header/index'
//import axios from 'axios';


export default function cadastroLanche(){


    //Ppo up de avisos
    const [open, setOpen] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        type: [],
        promotion:'',
        discount: '',
    });

    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});


    // const handleChangeNome = (e) => {
    //   setName(e.target.value)
    //   console.log('nome:', e.target.value)
      
    // }
    // const handleChangeDescricao = (e) => {
    //   setDescription(e.target.value)
    //   console.log('descricao:',e.target.value)
      
    // }
    const handleChange2 = (e) => {
      const { name, value, checked } = e.target;
  
      if (name === 'type') {
          setFormData((prevState) => {
              const updatedType = checked
                  ? [...prevState.type, value] // Adiciona o valor selecionado
                  : prevState.type.filter((item) => item !== value); // Remove o valor desmarcado
              return { ...prevState, type: updatedType };
          });
      } else {
          setFormData({
              ...formData,
              [name]: value,
          });
      }
  };



    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleChange3 = (e) => {
      const { name, value } = e.target;
      setFormData({
          ...formData,
          [name]: value, // Atualiza dinamicamente pelo `name`
      });
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/lanches', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(data.message);
                setErrors({});
                setOpen(true) 
               

            } else if (response.status === 400) {
                const errorData = await response.json();
                setErrors(errorData.errors);
            } else {
                setMessage('Something went wrong. Please try again later.');
            }
        } catch (error) {
            setMessage('Network error. Please try again later.');
        }
    };
    // if (open) return <PoUpSuccess/>;


    return(
      <div>
        <Header/>
        <div className={style.divFundoCadLanc}>
          {/* <h3><Link href="listas/lanches" className={style.linkverlanche}>Ver lanches</Link></h3> */}
          
        <div className={style.divFormulario}>

            <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Cadastro de lanche</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            Adicione tudo sobre o lanche.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                Nome
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">Nome do lanche: </span>
                  <input

type="text"
name="name"
value={formData.name}
onChange={handleChange}

                  
                   
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">
                Descrição
              </label>
              <div className="mt-2">
                <textarea
               
                
                 
                

                  id="description"
                  name="description"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  onChange={handleChange}
                  value={formData.description}
                />
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">Descreva tudo sobre o lanche.</p>
            </div>


            {/* <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                  <div className="mt-4 flex text-sm/6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>



        <div className="border-b border-gray-900/10 pb-12">
          
          <div className="mt-10 space-y-10">
            <fieldset>
            <legend className="text-base/7 font-semibold text-gray-900">Tipo do lanche</legend>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="type"
                      name="type"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      onChange={handleChange2}
                      value={'simples'}
                    />
                  </div>
                  <div className="text-sm/6">
                    <label htmlFor="comments" className="font-medium text-gray-900">
                      Simples
                    </label>
                    <p className="text-gray-500">Não acompanha nada de especial além do próprio lanche</p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="type"
                      name="type"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      onChange={handleChange2}
                      value={'combo'}
                    />
                  </div>
                  <div className="text-sm/6">
                    <label htmlFor="candidates" className="font-medium text-gray-900">
                      Combo
                    </label>
                    <p className="text-gray-500">Acompanha 1 ou mais ítens</p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="type"
                      name="type"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      onChange={handleChange2}
                      value={'especial'}
                    />
                  </div>
                  <div className="text-sm/6">
                    <label htmlFor="offers" className="font-medium text-gray-900">
                      Especial
                    </label>
                    <p className="text-gray-500">Preparado com igredientes especiais</p>
                  </div>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-sm/6 font-semibold text-gray-900">Tipo de promoção</legend>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="promotion"
                    name="promotion"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    onChange={handleChange} // Função para atualizar o estado
                    checked={formData.promotion === "Tudo é meia"} // Mantém o estado sincronizado
                  />
                  <label htmlFor="push-everything" className="block text-sm/6 font-medium text-gray-900">
                    Tudo é meia
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="promotion"
                    name="promotion"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    value="Compre 2 e leve + 1" // Valor único
        onChange={handleChange3}
        checked={formData.promotion === "Compre 2 e leve + 1"}
                  />
                  <label htmlFor="push-email" className="block text-sm/6 font-medium text-gray-900">
                    Compre 2 e leve + 1
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="promotion"
                    name="promotion"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    value="Coma tudo grátis ou pague o dobro" // Valor único
        onChange={handleChange3}
        checked={formData.promotion === "Coma tudo grátis ou pague o dobro"}
                  />
                  <label htmlFor="push-nothing" className="block text-sm/6 font-medium text-gray-900">
                    Coma tudo grátis ou pague o dobro
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="promotion"
                    name="promotion"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    value="Produto sem promoção" // Valor único
        onChange={handleChange3}
        checked={formData.promotion === "Produto sem promoção"}
                  />
                  <label htmlFor="push-nothing" className="block text-sm/6 font-medium text-gray-900">
                    Produto sem promoção
                  </label>
                </div>
              </div>
              
            </fieldset>
            <fieldset>
            <legend className="text-sm/6 font-semibold text-gray-900">Preço</legend>
            <div className="sm:col-span-4">
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">Preço</span>
                  <input
                    id="discount"
                    name="discount"
                    type="text"
                    placeholder="R$"
                   
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                    value={formData.discount} // Estado sincronizado
                    onChange={handleChange3} // Atualiza o estado
                  />
                </div>
              </div>
            </div>
            </fieldset>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm/6 font-semibold text-gray-900">
          Cancelar
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Salvar
        </button>
      </div>
    </form>
        </div>
        {open == true &&
        <PoUpSuccess/>
        }
        
        </div>
        </div>
    )
}
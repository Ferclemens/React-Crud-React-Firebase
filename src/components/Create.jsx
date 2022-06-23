import { addDoc, collection } from 'firebase/firestore'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import {db} from '../firebaseConfig/Firebase' 

const Create = () => {
  //creamos el estado de los campos para la db
  const [description, setDescription] = useState('')
  const [stock, setStock] = useState(0)
  const navigate = useNavigate()

  //referenciamos la db
  const productsCollection = collection(db,'products')

  //cargamos en la DB la info del Form, y navegamos al index
  const store = async (e) => {
    e.preventDefault()
    await addDoc(productsCollection, {description: description, stock: stock})
    navigate('/')
  }
  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <h1>Store Product</h1>
            <form onSubmit={store}>
              <div className='mb-3'>
                <label className='form-label'>Description</label>
                <input 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type='text'
                  className='form-control'
                />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Stock</label>
                <input 
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  type='number'
                  className='form-control'
                />
              </div>
              <button type='submit' className='btn btn-primary'>Store</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Create
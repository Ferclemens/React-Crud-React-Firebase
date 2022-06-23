import { collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { db } from '../firebaseConfig/Firebase'

const Edit = () => {
  //creamos el estado de los campos para la db
  const [description, setDescription] = useState('')
  const [stock, setStock] = useState(0)
  const navigate = useNavigate()

  //referenciamos la db y el id del producto a editar
  const productsCollection = collection(db,'products')
  const {id} = useParams()

  //modificamos en la DB la info del Form, y navegamos al index
  const update = async (e) => {
    e.preventDefault()
    const product = doc(db,'products',id)
    const data = {description: description, stock: stock}
    await updateDoc(product,data)
    navigate('/')
  }
  
  const getProductById = async (id) => {
    const product = await getDoc(doc(db,'products',id))
    if(product.exists()) {
      setDescription(product.data().description)
      setStock(product.stock)
      console.log(product.data().stock)
    } else {
      console.log('El producto no existe');
    }
  }
  useEffect(() => {
    getProductById()
  },[])

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <h1>Edit Product</h1>
            <form onSubmit={update}>
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

export default Edit
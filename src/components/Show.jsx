import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

import {collection, getDocs, getDoc, deleteDoc, doc} from 'firebase/firestore'
import {db} from '../firebaseConfig/Firebase' 

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const mySwal = withReactContent(Swal)

const Show = () => {
  //configuramos hooks
  const [products, setProducts] = useState([])

  //referenciamos la DB
  const productsCollection = collection(db, 'products')
  //funcion para mostrar TODOS los docs
  const getProducts = async () => {
    const data = await getDocs(productsCollection)
    setProducts(
      data.docs.map((doc) => ({
        ...doc.data(), id:doc.id }))
        )
  }
  //funcion para eliminar un doc
  const deleteProduct = async (id) => {
    const productDoc = doc(db,'products',id)
    await deleteDoc(productDoc)
    getProducts()
  }
  
  //funcion de confirmacion para sweetalert2
  const confirmDelete = (id) => { 
    Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      //llamamos a la funcion eliminar
      deleteProduct(id)
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })
  }
  //useEffect
  useEffect(() => {
    getProducts()
  },[])
  console.log(products);
  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <div className='d-grid gap-2'>
              <Link to="/create" className='btn btn-secondary mt-2 mb-2'>Create</Link>
            </div>
            <table className='table table-dark table-hover'>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Stock</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product)=>(
                  <tr key={product.id}>
                    <td>{product.description}</td>
                    <td>{product.stock}</td>
                    <td>
                      <Link to={`/edit/${product.id}`} className='btn btn-primary'>Editar</Link>
                      <button onClick={() => {confirmDelete(product.id)}} className='btn btn-danger'>Borrar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
export default Show;
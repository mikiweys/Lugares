import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import {BACKEND_URL} from '../config.js'

export default function Add() {

const [lugar,setLugar] = useState({
  nombre:"",
  desc:"",
  link:"",
  photos :""
})

const navigate = useNavigate()

const handleChange = (e) => {
  setLugar(prev => ({...prev,[e.target.name]: e.target.value}));}

const handleClick = async (e) => {
  e.preventDefault();
  try {
    await axios.post(`${BACKEND_URL}/lugares`, lugar);
    await axios.post(`${BACKEND_URL}/images`, lugar.photo);
    Swal.fire("Lugar guardado!", "", "success").then (() => navigate("/"));
  } catch (err) {
    console.log(err);
  }
};
  return (
    <div className='form text-center container p-5'>
      <h1>Añade un nuevo lugar</h1>
      <form className='form-group p-5' encType='multipart/form-data'>
      <div class="mb-3">
        <input className='form-control' type="text" autoComplete='off' placeholder='Nombre' onChange={handleChange} name='nombre'/>
      </div>
      <div class="mb-3">
        <input className='form-control' type="text" autoComplete='off' placeholder='Descripcion' onChange={handleChange} name='desc'/>
      </div>
      <div class="mb-3">
        <input className='form-control' type="text" autoComplete='off' placeholder='Link' onChange={handleChange} name='link'/>
      </div>
      <div class="mb-3">
        <input className='form-control' type="file" multiple="true" accept='image/*' autoComplete='off' onChange={handleChange} name='photos'/>
      </div>
        <button className='btn btn-outline-success' onClick={handleClick}>Añadir</button>
        <Link to='/' className='btn btn-outline-danger ms-3'>Cancelar</Link>
      </form>
    </div>
  )
}

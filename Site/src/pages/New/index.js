import React, {useState , useMemo}from 'react';

import api from '../../services/api'

// import { Container } from './styles';

import camera from '../../assets/camera.svg'
import './styles.css';
export default function New({history}) {
  const [company,setCompany] = useState('');
  const [techs,setTechs] = useState('');
  const [price,setPrice] = useState('');
  const [thumbnail,setThumbnail] = useState(null);

  const preview = useMemo(()=>{
     return thumbnail ? URL.createObjectURL(thumbnail):null
    },[thumbnail]
  )

  async function handlesubmit(event){
    event.preventDefault();
    const data = new FormData();

    const user_id = localStorage.getItem('user');

    data.append('thumbnail',thumbnail);
    data.append('company',company);
    data.append('price',price);
    data.append('techs',techs);

    const response = await api.post('/spot',data ,{
      headers:{
        user_id
      }
    });

    history.push('/dashboard')

  }
  
  return (
    <form onSubmit={handlesubmit}>
      <label
        className={thumbnail ? 'has-thumbnail':''} 
        id="thumbnail" 
        style={{backgroundImage: `url(${preview})`}}>
        <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
        <img src={camera} alt="selec img"/>
      </label>


      <label htmlFor="company">EMPRESA *</label>
      <input
        id="company"
        placeholder="Sua empresa incrivel"
        value={company}
        onChange={event => setCompany(event.target.value)} 
      />
      <label htmlFor="techs">TECNOLOGIAS * <span>(separadas por vírgula)</span></label>
      <input
        id="techs"
        placeholder="Quais Tecnologias usam ?"
        value={techs}
        onChange={event => setTechs(event.target.value)} 
      />
      <label htmlFor="price">VALOR DA DIÁRIA  *<span>(em branco para GRATUITO)</span></label>
      <input
        id="price"
        placeholder="Preço cobrado por dia "
        value={price}
        onChange={event => setPrice(event.target.value)} 
      />
      <button type="submit" className="btn"> Cadastrar novo spot </button>
    </form>
  );
}

import { useState } from 'react';
import Image from 'next/image';

import celularesImg from '../assets/imgs/celulares.png';
import logoImg from '../assets/imgs/logo.png';
import iconCheckImg from '../assets/imgs/icon.svg';
import avataresImg from '../assets/imgs/avatares.png';
import { api } from '../lib/api';
import { FormEvent } from 'react';
import { title } from 'process';

  interface HomeProps {
    poolCount: number;
    userCount: number;
    guessCount: number;
  }


export default function Home({poolCount=0, userCount=0, guessCount=0}: HomeProps){
  const [titlePool, setTitlePool] = useState("");

  const createPool = async (event: FormEvent) => {    
    event.preventDefault();    

    if(titlePool.length == 0){
      alert("Informe um nome válido para o seu bolão");
      return;      
    }
    try{
      const response = await api.post('pools',{       
          title: titlePool        
      });
      const { code } = response.data;
      await navigator.clipboard.writeText(code);
      setTitlePool("");

      alert(`Bolão criado com sucesso, o código: "${code}" foi copiado para área de transferência!`);

    }catch(e){
      alert("Falha ao criar o bolão, tente novamente!");
    }
  }

  return (
    <div className='max-w-[1124px] h-screen mx-auto grid grid-cols-2 items-center gap-28'>
      <main>
        <Image className="mb-14" src={logoImg} alt="Logo escrito NLW Copa na cor amarela" />
        <h1 className="mb-10 text-5xl text-white font-bold">Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>
        
        <div className="mb-10 flex items-center gap-2">          
          <Image src={avataresImg} alt="Avatar exemplo" />
          <strong className='text-gray-100 text-xl'>
            <span className='text-green_avatar-500'>+{userCount}</span> pessoas já estão usando
          </strong>
        </div>

        <form onSubmit={createPool} className='mb-4 flex gap-2'>
          <input className='flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100' 
          type="text" placeholder="Qual nome do seu bolão?"  
          onChange={e => setTitlePool(e.target.value)}
          value={titlePool}
          required />
          <button className='px-6 py-4 bg-yellow-500 text-gray-950 font-bold text-sm rounded uppercase hover:bg-yellow-700' type="submit" >Criar meu bolão</button>
        </form>

        <span className="text-gray-300 text-sm leading-relaxed">Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀</span>
        

        <div className='flex justify-between text-gray-200 pt-10 border-t border-gray-600 mt-10  '>
          <div className='flex gap-2 items-center'>
            <Image src={iconCheckImg} alt="Exibindo um circulo verde com um check na cor branca"/>
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{poolCount}</span>
              <span className='text-base'>Bolões criados </span>
            </div>
          </div>
          
          <span className="border-r border-gray-600" /> 
          
          <div className='flex gap-2 items-center'>
            <Image src={iconCheckImg} alt="Exibindo um circulo verde com um check na cor branca"/>
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{guessCount}</span>
              <span className='text-base'>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image src={celularesImg} alt="Dois celulares exibindo prévia do aplicativo" quality={100}/>
    </div>
  );
  }

  export const getStaticProps = async () => {
   
    const [
      responsePoolCount,
      responseGuessCount,
      responseUserCount
    ] = await Promise.all([
      api('pools/count'),
      api.get('guesses/count'),
      api.get('users/count')
    ]);
    
    const {data:{count:poolCount}} = responsePoolCount;
    const {data:{count:guessCount}} = responseGuessCount;
    const {data:{count:userCount}} = responseUserCount;

    return{
      props: {
        poolCount,
        guessCount,
        userCount
      },
      revalidate:360,
    }
  }

    
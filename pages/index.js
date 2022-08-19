import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const Home = () => {

  const {data: session, status} = useSession();
  const router = useRouter();
  console.log(session, status)

  if(status === 'loading'){
    return <p>Spinner...</p>
  }

  if(status === 'unauthenticated'){
    router.push("/login") 
  }

  return (
    <div className='bg-dark d-flex justify-content-center align-items-center vh-100 vw-100'>
          <Head>
            <title>Inicio | Next.js</title>
          </Head>
      {session ? 
        (<div className='bg-secondary p-5 rounded d-flex justify-content-center align-items-center flex-column'>
          <h1 className='fw-bold text-white'>{session.user.name}</h1>
          <h3 className='text-white'>{session.user.email}</h3>
          
          <img src={session.user?.image} alt='profileimg' className='img-thumbnail rounded m-2'/>
          <button className='btn btn-primary m-2 w-75' onClick={() => router.push("/centralpage")}>Ir a pagina de contenidos</button>
          <button className='btn btn-danger m-2 w-75' onClick={() => router.push("/logout")}>Deslogearse</button>
        </div>) 
      :
        (<h1 className='fw-bold'>Acceso no autorizado</h1>)}
    </div>
  )
}

export default Home



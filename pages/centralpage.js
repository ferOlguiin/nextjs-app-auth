import Head from 'next/head';
import Link from 'next/link';
import dbConnect from '../lib/dbConnect'
import Archivo from '../models/Archivo'
import { useSession, getSession } from "next-auth/react"
import { useRouter } from "next/router";
import {VscGithubInverted} from 'react-icons/vsc';

export default function Centralpage({archivos}) {

  const {data: session} = useSession();
    const router = useRouter()

    if (typeof window === "undefined") return null

    if (session?.user) {
        return (
        <> 
          <Head>
            <title>Contenidos | Next.js</title>
          </Head>
          <nav className='bg-dark p-3 d-flex justify-content-between align-items-center'>
            <h1 className='text-white'>Task-App-Auth | Next.js</h1>
            <a href='https://github.com/ferOlguiin?tab=repositories' target="_blank" rel="noreferrer"><VscGithubInverted className='text-white fs-2'/></a>
          </nav>
              <div className='d-flex justify-content-center align-items-center my-4'>
                <Link href="/agregar">
                  <a className='btn btn-primary m-1 btn-lg'>Agregar archivo</a>
                </Link>
                <button className='btn btn-danger btn-lg m-1' onClick={() => router.push("/")}>Ir al perfil</button>  
              </div>
            <main className='container'>
            <div className='row'>
            {
              archivos.map((item) => (
                <div className='col-sm-6 card p-1 shadow' key={item._id}>
                  <div className='card-body'>
                    <h4 className='card-title text-center fw-bold m-2'>{item.titulo}</h4>
                    <div className='btn-group'>
                        <Link href="/[id]" as={`/${item._id}`}>
                          <a className='btn btn-info'>Mas info...</a>
                        </Link>
                    </div>
                  </div>
                </div>
              ))
            }
            
            </div>      
        </main> 
    
            
        </>
                )
    }
  return <div className='vh-100 vw-100 d-flex justify-content-center align-items-center flex-column'>
    <h1 className='fw-bold text-danger'>No se registro como un usuario válido</h1>
    <button className='btn btn-danger p-2 w-25 fs-5' onClick={() => router.push("/")}>Salir</button>
  </div>
}

export async function getServerSideProps(context) {
  try {
      await dbConnect();
    

      const res = await Archivo.find({});
      const archivos = res.map((item) => {
        const archivo = item.toObject();
        archivo._id = archivo._id.toString();
        return archivo;
      });

    return { props: { archivos, session: await getSession(context) } };

  } catch (error) {
    console.log(error);
  }
}






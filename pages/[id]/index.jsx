import dbConnect from "../../lib/dbConnect";
import Archivo from "../../models/Archivo";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from 'next/head';


const PaginaDeArchivos = ({success, error, archivo}) => {

    const router = useRouter();

    if(!success){
        return (
            <div className="container">
                <h1>{error}</h1>
                <Link href="/centralpage">
                    <a className="btn btn-danger">Volver...</a>
                </Link>
            </div>
        )
    }

    const deleteData = async(id) => {
      try {
        await fetch(`/api/documento/${id}`, {method: 'DELETE'})
        router.push('/centralpage');
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 vw-100">
       <Head>
            <title>{archivo.titulo}</title>
        </Head>
        <div className='col-sm-6 card p-1 shadow'>
                <div className='card-body'>
                  <h4 className='card-title text-center fw-bold m-2'>{archivo.titulo}</h4>
                  <p className='card-text fs-5 text-center'>{archivo.descripcion}</p>
                  <div className='btn-group'>
                    <Link href={`/${archivo._id}/edit`}>
                        <a className="btn btn-primary">Editar</a>
                    </Link>
                    <button className='btn btn-danger' onClick={() => deleteData(archivo._id)}>Eliminar</button>
                    <Link href='/centralpage'>
                        <a className="btn btn-success">Volver</a>
                    </Link>
                  </div>
                </div>
              </div>
    </div>
  )
}

export default PaginaDeArchivos



export async function getServerSideProps({params}) {
    try {
      await dbConnect();
        const archivo = await Archivo.findById(params.id).lean();

        if(!archivo){
            return {props: {success: false, error: "archivo no encontrado"}};
        }

        archivo._id = archivo._id.toString();
      
      return { props: {success: true, archivo } };
    } catch (error) {
      console.log(error);
      return {props: {success: false, error: "Error!"} }
    }
  }
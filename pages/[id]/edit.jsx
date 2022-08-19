import { useRouter } from "next/dist/client/router"
import useSWR from "swr"
import Form from "../../components/Form"


const fetcher = async url => {
  const res = await fetch(url)


  if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.')
     
      error.info = await res.json()
      error.status = res.status
      throw error
  }
  const {data} = await res.json();
  return data;
  }

const Editar = () => {

  const router = useRouter();
  const {id} = router.query;

  const {data: archivo, error} = useSWR(id ? `/api/documento/${id}` : null, fetcher);
  
  if(error){
    return <div><h1 className="text-center">Error</h1></div>
  }
  if(!archivo){
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 vw-100">
        <h1>Cargando...</h1>
      </div>
    )
  }
  const formData = {
    titulo: archivo.titulo,
    descripcion: archivo.descripcion,
  }


  return (
    <div>
        <Form paraNuevoArchivo={false} formData={formData}>
        </Form>
    </div>
  )
}

export default Editar
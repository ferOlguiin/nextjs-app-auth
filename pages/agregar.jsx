import Form from "../components/Form"


const Agregar = () => {

    const formData = {
        titulo: '',
        descripcion: ''
    }


  return (
    <div className="bg-dark container-fluid d-flex justify-content-center align-items-center vw-100 vh-100">
            <Form formData={formData}/>
    </div>
  )
}

export default Agregar
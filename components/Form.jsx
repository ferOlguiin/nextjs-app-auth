import { useRouter } from "next/dist/client/router";
import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';



const Form = ({formData, paraNuevoArchivo = true}) => {

    const router = useRouter();

    const [form, setForm] = useState({
        titulo: formData.titulo,
        descripcion: formData.descripcion
    })

    const handleChange = e => {
        const {value, name} = e.target;
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(paraNuevoArchivo){
            postData(form)
        } else {
            putData(form);
        }
    }

    const postData = async (form) => {
        try {
            const res = await fetch('/api/documento', {
                method: 'POST',
                headers: {"Content-type": "application/json"}, 
                body: JSON.stringify(form)
            });

            const data = await res.json();
            console.log(data);


        } catch (error) {
            console.log(error);
        } finally {
            router.push('/centralpage');
        }
    }

    const putData = async (form) => {

        const {id} = router.query;

        try {
            const res = await fetch(`/api/documento/${id}`, {
                method: 'PUT',
                headers: {"Content-type": "application/json"}, 
                body: JSON.stringify(form)
            });

            const data = await res.json();
            console.log(data);


        } catch (error) {
            console.log(error);
        } finally {
            router.push('/centralpage');
        }
    }

  return (
    <div className="bg-dark container-fluid d-flex flex-column justify-content-center align-items-center vw-100 vh-100">
        <Head>
            <title>{paraNuevoArchivo ? "Agregar | Next.js": "Editar | Next.js"}</title>
        </Head>
        <form onSubmit={handleSubmit} className="w-50">
            <h1 className="text-center text-white my-4">{paraNuevoArchivo ? "Agregar documento" : "Editar documento"}</h1>  
            <input type="text" className="form-control my-1" placeholder="Inserte titulo" name="titulo" value={form.titulo} onChange={handleChange} />
            <input type="text" className="form-control my-1" placeholder="Inserte descripcion" name="descripcion" value={form.descripcion} onChange={handleChange} />
            <button className="btn btn-success w-100 my-1" type="submit">{paraNuevoArchivo ? 'Agregar':'Editar'}</button>
            <Link href="/centralpage">
                <a className="btn btn-danger my-1 w-100">Volver</a>
            </Link>
        </form>
    </div>
    )
}

export default Form
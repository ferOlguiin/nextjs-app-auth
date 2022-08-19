import { useRouter } from "next/router"

const logout = () => {

    const router = useRouter();

  return (

    <div className="d-flex justify-content-center align-items-center vh-100 vw-100 bg-dark">
        <button className="btn btn-warning text-black p-3 fw-bold btn-lg" onClick={() => router.push("/api/auth/signout/google")}>Cerrar sesión</button>
    </div>
  )
}

export default logout
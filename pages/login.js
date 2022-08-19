import { useRouter } from "next/router"

const Login = () => {
    
    const router = useRouter();

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 vw-100 bg-dark">
        <button className="btn btn-warning text-black p-3 fw-bold btn-lg" onClick={() => router.push("/api/auth/signin/")}>Iniciar sesión</button>
    </div>
  )
}

export default Login
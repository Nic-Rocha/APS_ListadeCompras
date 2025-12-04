import './style.css'

import { Link, useNavigate } from 'react-router-dom';

import AuthLayout from '../../layouts/AuthLayout'
import Form from '../../components/Form';
import { loginFields } from './loginFields';

import checklistImg from '../../assets/checklist-img.png'

const LoginIllustration = () => (
  <img src={checklistImg} className="login-image"/> 
);

const CriarContaText = () => (
  <p> Ainda não possui uma conta? <Link to='/register'>Crie uma conta</Link></p>
)

const IconUser = () => (
  <i className='auth-icon-user fa-classic fa-solid fa-circle-user'/>
)

function LoginPage() {

  const navigate = useNavigate();

  async function handleLoginSubmit(data) {
    if (!data || !data.email || !data.password) {
      alert("Por favor, preencha email e senha!");
      return;
    }

    try {
      console.log("Enviando login...", data);

      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Email ou senha incorretos");
      }

      const responseData = await response.json();
      console.log("Login OK! Token recebido:", responseData);

      localStorage.setItem('authToken', responseData.access_token);

      navigate('/listpage'); 

    } catch (error) {
      console.error("Erro no login:", error);
      alert(error.message);
    }
  }

  return (
    
    <AuthLayout illustration={<LoginIllustration/>}>
      <IconUser/>
      <Form
        containerWrapper={"input"}
        formStyle={"login-form"}
        fields={loginFields}
        onSubmit={handleLoginSubmit}
        submitText="Entrar" 
        endText={<CriarContaText/>}
        buttomStyle={"button-login-register"}
      />
    </AuthLayout>
    
  )
}

export default LoginPage
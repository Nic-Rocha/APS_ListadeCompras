import { useNavigate } from 'react-router-dom'

import AuthLayout from '../../layouts/AuthLayout'
import Form from '../../components/Form';
import { registerFields } from './registerFields'

import registerImg from '../../assets/signup-img.png'
import './style.css'

const RegisterIllustration = () => (
  <img src={registerImg} className="register-image"/> 
);

const IconUser = () => (
  <i className='auth-icon-user fa-classic fa-solid fa-circle-user'/>
)

function RegisterPage() {
  const navigate = useNavigate();

  async function handleRegister(data) {

    if (!data.email || !data.password) {
      alert("Preencha todos os campos!");
      return;
    }

    try {

      const response = await fetch('http://localhost:8000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Erro ao criar conta");
      }

      alert("Conta criada com sucesso! Agora faça login.");
      navigate('/');

    } catch (error) {
      console.error("Erro:", error);
      alert(error.message);
    }

    
  }
  
  return (
    <AuthLayout illustration={<RegisterIllustration/>}>

        <IconUser/>
        <Form 
        fields={registerFields} 
        onSubmit={handleRegister} 
        submitText="Registrar"
        />

    </AuthLayout>
  )
}

export default RegisterPage
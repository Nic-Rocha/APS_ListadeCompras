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
    // 1. Validação básica (evita mandar vazio)
    if (!data || !data.email || !data.password) {
      alert("Por favor, preencha email e senha!");
      return;
    }

    try {
      console.log("Enviando login...", data);

      // 2. Batendo na porta do Python
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      // 3. Se o Python reclamar (Erro 401, 422, etc)
      if (!response.ok) {
        const errorData = await response.json();
        // O Python costuma mandar a mensagem de erro no campo 'detail'
        throw new Error(errorData.detail || "Email ou senha incorretos");
      }

      // 4. Sucesso! Vamos pegar o Token
      const responseData = await response.json();
      console.log("Login OK! Token recebido:", responseData);

      // 5. GUARDAR O CRACHÁ (Muito Importante ⚠️)
      // Confirme se o seu backend manda 'access_token' ou apenas 'token'
      localStorage.setItem('user_token', responseData.access_token);

      // 6. Tchau Login, Olá Tarefas!
      navigate('/listpage'); 

    } catch (error) {
      console.error("Erro no login:", error);
      alert(error.message); // Mostra o erro real na tela
    }
  }

  return (
    
    <AuthLayout illustration={<LoginIllustration/>}>
      <IconUser/>
      <Form 
      fields={loginFields}
      onSubmit={handleLoginSubmit}
      submitText="Entrar" 
      endText={<CriarContaText/>}
      />
    </AuthLayout>
    
  )
}

export default LoginPage
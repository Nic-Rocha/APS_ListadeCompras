import './style.css'

import { Link } from 'react-router-dom';

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

  return (
    
    <AuthLayout illustration={<LoginIllustration/>}>
      <IconUser/>
      <Form fields={loginFields} submitText="Entrar" endText={<CriarContaText/>}/>
    </AuthLayout>
    
  )
}

export default LoginPage
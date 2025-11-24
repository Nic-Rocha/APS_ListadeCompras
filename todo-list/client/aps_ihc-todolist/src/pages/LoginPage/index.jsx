import './style.css'

import AuthLayout from '../../layouts/AuthLayout'
import Form from '../../components/Form';
import { loginFields } from './loginFields';

import checklistImg from '../../assets/checklist-img.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

const LoginIllustration = () => (
  <img src={checklistImg} className="auth-image"/> 
);

const IconUser = () => (
  <FontAwesomeIcon icon={faCircleUser} className='auth-icon-user'/>
)

function LoginPage() {

  return (
    
    <AuthLayout illustration={<LoginIllustration/>}>
      <IconUser/>
      <Form fields={loginFields} labelText='Digite o seu'/>
    </AuthLayout>
    
  )
}

export default LoginPage
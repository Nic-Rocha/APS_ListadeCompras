import AuthLayout from '../../layouts/AuthLayout'
import Form from '../../components/Form';
import { registerFields } from './registerFields'

import registerImg from '../../assets/signup-img.png'
import './style.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

const RegisterIllustration = () => (
  <img src={registerImg} className="register-image"/> 
);

const IconUser = () => (
  <FontAwesomeIcon icon={faCircleUser} className='auth-icon-user'/>
)

function RegisterPage() {
  return (
    <AuthLayout illustration={<RegisterIllustration/>}>
        <IconUser/>
        <Form fields={registerFields} submitText="Registrar"/>
    </AuthLayout>
  )
}

export default RegisterPage
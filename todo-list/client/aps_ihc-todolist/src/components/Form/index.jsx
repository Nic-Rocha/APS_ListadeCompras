import { useState } from 'react';

import './style.css'
import Button from '../Button'

function Form({fields, onSubmit, submitText = "Enviar"}) {
  const initialData = fields.reduce((acc, field) => {
      acc[field.name] = "";
      return acc
  }, {});

  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    
    <form className="login-form" onSubmit={handleSubmit}>

      <div className="input">
        {fields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name}>{field.labelText}</label>
            <input id={field.name} name={field.name} type={field.type || 'text'} placeholder={field.placeholder} value={formData[field.name]} onChange={handleChange}/>
          </div>

        ))}
      </div>

      <Button text="LOGIN" type="submit">{submitText}</Button>

      <p> Ainda não possui uma conta? <a href="/registro">Crie uma conta</a></p>
    </form>
  );
}

export default Form
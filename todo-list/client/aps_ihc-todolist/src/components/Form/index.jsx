import { useState } from 'react';

import './style.css'

function Form({fields, onSubmit, endText, nameClass, submitText = "Enviar"}) {
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

      <div className={nameClass}>
        {fields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            <input id={field.name} name={field.name} type={field.type || 'text'} placeholder={field.placeholder} value={formData[field.name]} onChange={handleChange}/>
          </div>

        ))}
      </div>

      <button type="submit">{submitText}</button>

      {endText}
    </form>
  );
}

export default Form
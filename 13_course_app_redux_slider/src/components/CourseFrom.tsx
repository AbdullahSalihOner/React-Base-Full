import React from 'react';
import { useSelector } from 'react-redux';


interface CourseFormProps {
  name?: string;
  description?: string;
  cost?: number;
}

const CourseForm = (props: CourseFormProps): JSX.Element => {
  const { name, description, cost } = useSelector((state) => {
    return {
      name: props.name,
      description: props.description,
      cost: props.cost
    };
  });
  console.log(name, description, cost);
  return (
    <div className="courseForm panel">
      <h4 className="subtitle is-3">Kurs Ekle</h4>
      <form>
        <div className="field-group">
          <div className="field">
            <label className="label">Ad</label>
            <input className="input is-expanded" />
          </div>
          <div className="field">
            <label className="label">Açıklama</label>
            <textarea className="input is-expanded" />
          </div>
          <div className="field">
            <label className="label">Fiyat</label>
            <input className="input is-expanded" type="number" />
          </div>
        </div>
        <div className="field">
          <button className="button is-primary">Kaydet</button>
        </div>
      </form>
    </div>
  );
}

export default CourseForm;

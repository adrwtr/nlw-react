import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';

import './styles.css';

function TeacherList() {
  const initialValues: { [key: string]: any } = {
    subject: '',
    week_day: '',
    time: '',
  };

  const [teachers, setTeachers] = useState([]);
  const [values, setValues] = useState(initialValues);
  const { subject, week_day, time } = values;

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = event.target;
    setValues({ ...values, [id]: value });
  };

  const handleSearchTeachers = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await api.get('classes', {
        params: {
          subject,
          week_day,
          time,
        },
      });
      setTeachers(response.data);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={handleSearchTeachers}>
          <Select
            name="subject"
            label="Matéria"
            options={[
              { value: 'Angular', label: 'Angular 10' },
              { value: 'React', label: 'React JS' },
              { value: 'Javascript', label: 'Javascript moderno' },
              { value: 'Net Core', label: 'NET Core WebApi / Desktop' },
              { value: 'NodeJs', label: 'Node JS' },
              { value: 'Sql', label: 'Sql Server' },
            ]}
            value={subject}
            onChange={handleChange}
          />
          <Select
            name="week_day"
            label="Dia da semana"
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta-feira' },
              { value: '6', label: 'Sábado' },
            ]}
            value={week_day}
            onChange={handleChange}
          />
          <Input
            name="time"
            type="time"
            label="Hora"
            value={time}
            onChange={handleChange}
          />
          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />;
        })}
      </main>
    </div>
  );
}

export default TeacherList;

import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/TextArea';
import Select from '../../components/Select';
import api from '../../services/api';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';

function TeacherForm() {
  const history = useHistory();
  const initialValues: { [key: string]: any } = {
    name: '',
    avatar: '',
    whatsapp: '',
    bio: '',
    subject: '',
    cost: 0,
  };
  const initialScheduleValues: { [key: string]: any }[] = [];

  const [values, setValues] = useState(initialValues);
  const [scheduleItems, setScheduleItems] = useState(initialScheduleValues);

  const addNewScheduleItem = () => {
    setScheduleItems([...scheduleItems, { week_day: '', from: '', to: '' }]);
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setValues({ ...values, [event.target.id]: event.target.value });
  };

  const handleScheduleItemChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    index: number
  ) => {
    const scheduleItem = scheduleItems[index];
    scheduleItem[event.target.id] = event.target.value;
    setScheduleItems([...scheduleItems]);
  };

  const handleCreateClass = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await api.post('classes', {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems.map((s) => ({
          ...s,
          week_day: Number(s.week_day),
        })),
      });
      alert('cadastro realizado com sucesso');
      history.push('/');
    } catch (error) {
      alert(error);
    }
  };

  const { name, avatar, whatsapp, bio, subject, cost } = values;

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro paso é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input
              name="name"
              label="Nome completo"
              onChange={handleChange}
              value={name}
              autoFocus
            />
            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={handleChange}
            />
            <Input
              name="whatsapp"
              label="WhatsApp"
              value={whatsapp}
              onChange={handleChange}
            />
            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={handleChange}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>
            <Select
              name="subject"
              label="Matéria"
              options={[
                { value: 'Haskell', label: 'Haskell' },
                { value: 'React', label: 'React JS' },
                { value: 'Elixir', label: 'Elixir' },
                { value: 'C#', label: '#' }
              ]}
              value={subject}
              onChange={handleChange}
            />
            <Input
              name="cost"
              label="Custo da sua hora por aula"
              value={cost}
              onChange={handleChange}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map(({ week_day, from, to }, index) => {
              return (
                <div className="schedule-item" key={week_day}>
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
                    onChange={(event) => handleScheduleItemChange(event, index)}
                  />
                  <Input
                    name="from"
                    label="Das"
                    type="time"
                    value={from}
                    onChange={(event) => handleScheduleItemChange(event, index)}
                  />
                  <Input
                    name="to"
                    label="Até"
                    type="time"
                    value={to}
                    onChange={(event) => handleScheduleItemChange(event, index)}
                  />
                </div>
              );
            })}
          </fieldset>
          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante!
              <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;

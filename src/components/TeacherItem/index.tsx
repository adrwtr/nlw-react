import React from 'react';
import whatsAppIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';

import './styles.css';

export interface Teacher {
  id: number;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
  cost: number;
  subject: string;
}

interface TeacherItemProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  const { id, name, avatar, whatsapp, bio, cost, subject } = teacher;

  const createNewConnection = async () => {
    try {
      await api.post('connections', { user_id: id });
      alert('conexão efetuada com sucesso');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <article className="teacher-item">
      <header>
        <img src={avatar} alt={name} />
        <div>
          <strong>{name}</strong>
          <span>{subject}</span>
        </div>
      </header>
      <p>{bio}</p>
      <footer>
        <p>
          Preço/hora
          <strong>R$ {cost.toFixed(2)}</strong>
        </p>
        <a
          href={`https://wa.me/${whatsapp}?text=Você recebeu uma mensagem de Proffy`}
          target="_blank"
          onClick={createNewConnection}
        >
          <img src={whatsAppIcon} alt="WhatsApp" />
          Entrar em Contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;


import './App.css';
import React, { useState, useEffect } from 'react';

const App = () => {
  const [cards, setCards] = useState([]);
  
  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    setCards(data);
  };

  const handleCreateCard = () => {
    const promptInput = prompt('Введите содержимое новой карточки:');
    if (promptInput) {
      const newCard = {
        title: promptInput,
        id: cards.length + 1
      };
      setCards([...cards, newCard]);
    }
  };

  const handleEditCard = (id) => {
    const promptInput = prompt('Измените содержимое карточки:');
    if (promptInput) {
      const updatedCards = cards.map(card => {
        if (card.id === id) {
          return { ...card, title: promptInput };
        }
        return card;
      });
      setCards(updatedCards);
    }
  };

  const handleDeleteCard = (id) => {
    const updatedCards = cards.filter(card => card.id !== id);
    setCards(updatedCards);
  };

  return (
    <div>
      <header>
        <button onClick={handleCreateCard}>Создать</button>
      </header>
      <div className="card-container">
        {cards.map(card => (
          <div key={card.id} className="card">
            <p>{card.title}</p>
            <button onClick={() => handleEditCard(card.id)}>Редактировать</button>
            <button onClick={() => handleDeleteCard(card.id)}>Удалить</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

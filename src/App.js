import React, { useState } from 'react';

function App() {
  const initialColumns = {
    todo: [
      { id: 1, text: 'Task 1' },
      { id: 2, text: 'Task 2' },
    ],
    inProgress: [
      { id: 3, text: 'Task 3' },
    ],
    done: [
      { id: 4, text: 'Task 4' },
      { id: 5, text: 'Task 5' },
    ],
  };

  const [columns, setColumns] = useState(initialColumns);

  const handleDrop = (e, columnName) => {
    // console.log(e.dataTransfer)
    e.preventDefault();
    const cardId = e.dataTransfer.getData('cardId');
    const columnNameDefined = e.dataTransfer.getData('cardColumnName');
    let columnToSearch = []
    if (columnNameDefined === "done"){
      columnToSearch = columns.done
    }
    else if (columnNameDefined === "inProgress"){
      columnToSearch = columns.inProgress
    }
    else{
      columnToSearch = columns.todo
    }
    const card = columnToSearch.find((task) => task.id === parseInt(cardId));
    if (card && columnName !== columnNameDefined) {
      const updatedColumns = { ...columns };
      updatedColumns[columnName].push(card);
      columnToSearch = columnToSearch.filter((task) => task.id !== parseInt(cardId));
      updatedColumns[columnNameDefined] = columnToSearch

      setColumns(updatedColumns);
    }
  };

  const handleDragStart = (e, cardId, columnName) => {
    // console.log(e.dataTransfer)
    e.dataTransfer.setData('cardId', cardId);
    e.dataTransfer.setData('cardColumnName', columnName);
    // console.log(e.dataTransfer)

  };

  return (
    <div className="kanban-board">
      <div className="column">
        <h2>Todo</h2>
        <div
          className="column-content "
          onDrop={(e) => handleDrop(e, 'todo')}
          onDragOver={(e) => e.preventDefault()}
        >
          {columns.todo.map((card) => (
            <div
              key={card.id}
              className="card todocolumn"
              draggable
              onDragStart={(e) => handleDragStart(e, card.id, "todo")}
            >
              {card.text}
            </div>
          ))}
        </div>
      </div>
      <div className="column">
        <h2>In Progress</h2>
        <div
          className="column-content"
          onDrop={(e) => handleDrop(e, 'inProgress')}
          onDragOver={(e) => e.preventDefault()}
        >
          {columns.inProgress.map((card) => (
            <div
              key={card.id}
              className="card progresscolumn"
              draggable
              onDragStart={(e) => handleDragStart(e, card.id, "inProgress")}
            >
              {card.text}
            </div>
          ))}
        </div>
      </div>
      <div className="column">
        <h2>Done</h2>
        <div
          className="column-content"
          onDrop={(e) => handleDrop(e, 'done')}
          onDragOver={(e) => e.preventDefault()}
        >
          {columns.done.map((card) => (
            <div
              key={card.id}
              className="card donecolumn"
              draggable
              onDragStart={(e) => handleDragStart(e, card.id, "done")}
            >
              {card.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

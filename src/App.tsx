import * as React from 'react';
import './App.css';
import AddTodo from './Componet/AddTodo';
import Footer from './Componet/Footer';
import VisivleTodo from './Componet/VisivleTodoList';

const App = (params: any) => {
  return(
  <div>
    <AddTodo />
    <VisivleTodo />
    <Footer />
  </div>
  );
};

export default App;

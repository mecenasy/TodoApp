import * as React from 'react';
import './App.css';
import AddTodo from './Componet/AddTodo';
import Footer from './Componet/Footer';
import VisivleTodo from './Componet/VisivleTodo';

const App = (params: any) => {
  return(
  <div>
    <AddTodo />
    <VisivleTodo filter={params.match.params.filter || 'all'}/>
    <Footer />
  </div>
  );
};

export default App;

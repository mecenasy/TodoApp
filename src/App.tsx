import * as React from 'react';
import './App.css';
import AddTodo from './Componet/AddTodo';
import Footer from './Componet/Footer';
import VisivleTodo from './Componet/VisivleTodo';

class App extends React.Component {
  public render() {
    return (
      <div className='App'>
        <AddTodo />
        <VisivleTodo />
        <Footer />
      </div>
    );
  }
}

export default App;

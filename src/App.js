import React from 'react';
import Navbar from './components/Navbar';
import FormPage from './pages/FormTodo';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div>
        <Navbar
          nama="Ishiki" 
          data={[1, 2, 3]}
        />
        <FormPage />
      </div>
    );
  }
}

export default App;
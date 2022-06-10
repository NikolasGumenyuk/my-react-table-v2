import "./App.css";
import { BasicTable } from "./components/BasicTable";
import { Button, Container, InputGroup } from "reactstrap";
import { ThemeContext, themes } from './themeContext';
import React from 'react';


function App() {
  const [darkMode, setDarkMode] = React.useState(true);

  return (
    <div className="App">
      <h1>Table</h1>
      <InputGroup>
        <ThemeContext.Consumer>
          {({ changeTheme }) => (
            <Button
              color="link"
              onClick={() => {
                setDarkMode(!darkMode);
                changeTheme(darkMode ? themes.light : themes.dark);
              }}
            >
              <i className={darkMode ? "fas fa-sun" : "fas fa-moon"}></i>
              <span className="d-lg-none d-md-block">Switch mode</span>
            </Button>
          )}
        </ThemeContext.Consumer>
      </InputGroup>
      <BasicTable />
    </div>
  );
}

export default App;

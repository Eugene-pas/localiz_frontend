import React, { useState } from "react";
import { RouterConfig } from "./navigation/RouterConfig";
import { ThemeProvider, Button, createTheme } from "@material-ui/core";
import { ThemeSwitch } from "./components/ThemeSwitch";
import { dark, light } from "./style/muiTheme";
import { HomeContainer } from "./pages/Home/HomeContainer"
import AppsStyle from "./style/App.css"

function App() {
  const [darkState, setDarkState] = useState(false);
  const handleThemeChange = () => {
    setDarkState(!darkState);
    console.log("theme=", darkState ? "dark" : "light");
  };


  return (
      <div>
        <ThemeProvider theme={darkState ? dark() : light()}>
          {/* <ThemeSwitch
            darkState={darkState}
            handleThemeChange={handleThemeChange}
          /> */}
          
          <RouterConfig />
        </ThemeProvider>
      </div>
  );
}

export default App;

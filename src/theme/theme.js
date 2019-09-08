import { createMuiTheme } from "@material-ui/core/styles";
import { red, blue } from "@material-ui/core/colors";

export default createMuiTheme({
  palette: {
    secondary: {
      main: red[500]
    },
    primary: {
      main: blue[500]
    }
  }
});

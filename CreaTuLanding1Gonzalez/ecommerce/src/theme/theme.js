import { createTheme } from '@mui/material/styles';

// Crea una instancia del tema oscuro.
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // Un azul claro para el modo oscuro
    },
    secondary: {
      main: '#f48fb1', // Un rosa claro para acentos
    },
    background: {
      default: '#121212', // Fondo oscuro principal
      paper: '#1e1e1e',   // Fondo para superficies como Cards y AppBars
    },
  },
  typography: {
    fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
        fontSize: '2rem',
        fontWeight: 700,
    }
  },
});

export default darkTheme;
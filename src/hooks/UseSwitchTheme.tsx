import { useMemo, useState } from 'react';
import { createTheme } from '@mui/material';
import { blueGrey, deepOrange, grey, indigo } from '@mui/material/colors';

function useSwitchTheme() {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                // palette values for light mode
                primary: indigo,
                divider: indigo[200],
                background: {
                  default: blueGrey[50],
                  paper: blueGrey[50],
                },
                text: {
                  primary: grey[900],
                  secondary: grey[800],
                },
              }
            : {
                // palette values for dark mode
                primary: deepOrange,
                divider: deepOrange[700],
                background: {
                  default: '#121212',
                  paper: '#121212',
                },
                text: {
                  primary: '#fff',
                  secondary: grey[500],
                },
              }),
        },
      }),
    [mode]
  );

  return { theme, colorMode };
}

export default useSwitchTheme;

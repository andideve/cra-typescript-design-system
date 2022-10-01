import React, { useCallback, useState, useEffect } from 'react';
import { Provider, Box, Typography, IconButton } from '@andideve/design-system';
import { Global } from '@emotion/react';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function App() {
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // access to the theme in global object Window
    console.log((window as any).__theme);

    if (window.matchMedia('(prefers-color-scheme: dark)')) {
      setColorMode('dark');
    } else {
      setColorMode('light');
    }
  }, []);

  const onToggleColorMode = useCallback(() => {
    setColorMode((s) => (s === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <Provider themeConfig={{ colorMode }}>
      <Global
        styles={{
          body: {
            transition: 'color .2s ease, background-color .2s ease',
          },
          strong: {
            fontWeight: 'var(--ds-fontWeights-semibold)',
            color: 'var(--ds-colors-foreground-primary)',
          },
        }}
      />

      <header>
        <Box display="flex" alignItems="center" justifyContent="flex-end" px="5vw" height="3.5rem">
          <IconButton title="Toggle theme" variant="tinted" onClick={onToggleColorMode}>
            {
              (
                { light: <FiSun />, dark: <FiMoon /> } as Record<
                  'light' | 'dark',
                  React.ReactElement
                >
              )[colorMode]
            }
          </IconButton>
        </Box>
      </header>

      <main>
        <Box
          as="section"
          mx="auto"
          py={{ _: '3rem', lg: '5rem' }}
          px="5vw"
          width="var(--ds-screens-xl)"
          maxWidth="100%"
          textAlign="center"
        >
          <Typography as="h2" mb="1rem" size="6xl" fontWeight="semibold">
            Hello there!
          </Typography>
          <Typography as="p" size="lg" color="foreground.secondary">
            Thank you for choosing this template.
          </Typography>
        </Box>
      </main>

      <footer>
        <Box py={{ _: '3rem', lg: '5rem' }} px="5vw">
          <Typography as="p" color="foreground.secondary">
            Author <strong>@andideve</strong>
          </Typography>
        </Box>
      </footer>
    </Provider>
  );
}

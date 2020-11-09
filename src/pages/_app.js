import App from 'next/app';
import { ThemeProvider } from 'styled-components';
import {
  ThemeProvider as ChakraProvider,
  CSSReset,
	Box,
	ColorModeProvider
} from '@chakra-ui/core';
import { theme } from '@chakra-ui/core';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <ThemeProvider theme={theme}>
				<ColorModeProvider value="dark">
					<>
						<CSSReset />
						<Box padding={8} maxWidth="80%" margin="auto">
							<Component {...pageProps} />
						</Box>
					</>
				</ColorModeProvider>
      </ThemeProvider>
    </ChakraProvider>
  );
}

export default MyApp;

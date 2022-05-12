import Router from "./Router";

import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkModeAtom } from "./atoms";

const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
* {
  box-sizing: border-box;
}
a {
  text-decoration: none;
  color: ${(props) => props.theme.textColor};
  transition: color 300ms ease-out;
  &:hover {
      color: ${(props) => props.theme.hoverColor};
    }
}
body{ 
	font-family: 'Roboto Condensed', sans-serif;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  font-size: 15px;
  font-weight: 100;
  transition: color 500ms ease-out, background-color 500ms ease-out;
}
h1,h2,h3,h4,h5 {
	font-weight: 500;
	text-transform: uppercase;
}
h1 {font-size: 2.5em}
h2 {font-size: 2em}
h3 {font-size: 1.5em}
h4 {font-size: 1em}


`;

const DarkModeBtn = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  transition: color 500ms ease-out;
  :hover {
    color: ${(props) => props.theme.hoverColor};
  }
`;

function App() {
  const isDarkMode = useRecoilValue(isDarkModeAtom);
  const setDarkMode = useSetRecoilState(isDarkModeAtom);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  return (
    <>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Router />
        <DarkModeBtn onClick={toggleDarkMode}>
          {isDarkMode ? "light mode" : "dark mode"}
        </DarkModeBtn>
      </ThemeProvider>
    </>
  );
}

export default App;

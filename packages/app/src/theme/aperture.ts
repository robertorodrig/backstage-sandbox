// packages/app/src/theme/aperture.ts
import {
  createBaseThemeOptions,
  createUnifiedTheme,
  palettes,
  pageTheme as defaultPageTheme,
} from '@backstage/theme';

/**
 * Tema "aperture" com uma imagem SVG distinta por tipo de página.
 * As imagens são importadas como assets (dentro de src), evitando PUBLIC_URL/process em tempo de build.
 *
 * Coloque os arquivos em:
 *   packages/app/src/assets/headers/
 *     - home.svg
 *     - docs.svg
 *     - service.svg
 *     - tool.svg
 *     - apis.svg
 *     - website.svg
 *     - library.svg
 *     - app.svg
 *     - other.svg
 */

// Imports dos SVGs (ajuste os nomes conforme seus arquivos)
import homeBg from '../assets/headers/home.svg';
import docsBg from '../assets/headers/docs.svg';
// import serviceBg from '../assets/headers/service.svg';
// import toolBg from '../assets/headers/tool.svg';
// import apisBg from '../assets/headers/apis.svg';
// import websiteBg from '../assets/headers/website.svg';
// import libraryBg from '../assets/headers/library.svg';
// import appBg from '../assets/headers/app.svg';
// import otherBg from '../assets/headers/other.svg';

const withImage = (url: string, fontColor = '#FFFFFF', shape = 'rounded') => ({
  colors: [fontColor, '#00000000', '#00000000', fontColor, ''],
  shape,
  backgroundImage: `url(${url})`,
  fontColor,
});

export const apertureTheme = createUnifiedTheme({
  ...createBaseThemeOptions({
    palette: {
      ...palettes.light, // troque para palettes.dark se quiser base escura
      primary:   { main: '#0EA5E9' },
      secondary: { main: '#7C3AED' },
      background: { default: '#e8eaeeff', paper: '#FFFFFF' },
      navigation: {
        background: '#0B1220',
        indicator:  '#1de8f6ff',
        color:      '#E5E7EB',
        selectedColor: '#FFFFFF',
      },
    },
  }),
  defaultPageTheme: 'home',
  fontFamily: 'Inter, system-ui, Arial, sans-serif',
  pageTheme: {
    // herdamos o padrão para qualquer tipo não declarado
    ...defaultPageTheme,
    home:          withImage(homeBg, '#FFFFFF'),
    documentation: withImage(docsBg, '#FFFFFF'),
    // service:       withImage(serviceBg, '#0B1220'),
    // tool:          withImage(toolBg, '#FFFFFF'),
    // apis:          withImage(apisBg, '#FFFFFF'),
    // website:       withImage(websiteBg, '#FFFFFF'),
    // library:       withImage(libraryBg, '#0B1220'),
    // app:           withImage(appBg, '#FFFFFF'),
    // other:         withImage(otherBg, '#FFFFFF'),
  },
});

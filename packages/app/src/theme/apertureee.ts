// packages/app/src/theme/aperture.ts
import {
  createBaseThemeOptions,
  createUnifiedTheme,
  genPageTheme,
  palettes,
  shapes,
} from '@backstage/theme';

/**
 * Tema "aperture" customizado.
 * Corrige headers em branco definindo pageTheme para cada tipo de página (incluindo "documentation").
 */
export const apertureThemeteste = createUnifiedTheme({
  ...createBaseThemeOptions({
    palette: {
      ...palettes.light, // Troque para palettes.dark se preferir base escura
      primary:   { main: '#0EA5E9' },
      secondary: { main: '#7C3AED' },
      background: { default: '#efeff1ff', paper: '#fbf9f9ff' },
      navigation: {
        background: '#20355fff',
        indicator:  '#7C3AED',
        color:      '#E5E7EB',
        selectedColor: '#FFFFFF',
      },
    },
  }),
  defaultPageTheme: 'home',
  fontFamily: 'Inter, system-ui, Arial, sans-serif',
  pageTheme: {
    home:          genPageTheme({ colors: ['#0EA5E9', '#7C3AED'], shape: shapes.wave,  options: { fontColor: '#FFFFFF' } }),
    documentation: genPageTheme({ colors: ['#111827', '#0EA5E9'], shape: shapes.wave2, options: { fontColor: '#FFFFFF' } }),
    service:       genPageTheme({ colors: ['#0EA5E9', '#22D3EE'], shape: shapes.round, options: { fontColor: '#0B1220' } }),
    tool:          genPageTheme({ colors: ['#7C3AED', '#0EA5E9'], shape: shapes.wave,  options: { fontColor: '#FFFFFF' } }),
    website:       genPageTheme({ colors: ['#0EA5E9', '#7C3AED'], shape: shapes.wave,  options: { fontColor: '#FFFFFF' } }),
    library:       genPageTheme({ colors: ['#0EA5E9', '#22D3EE'], shape: shapes.wave,  options: { fontColor: '#0B1220' } }),
    apis:          genPageTheme({ colors: ['#7C3AED', '#22D3EE'], shape: shapes.wave,  options: { fontColor: '#FFFFFF' } }),
    other:         genPageTheme({ colors: ['#0EA5E9', '#7C3AED'], shape: shapes.wave,  options: { fontColor: '#FFFFFF' } }),
    app:           genPageTheme({ colors: ['#0EA5E9', '#7C3AED'], shape: shapes.wave,  options: { fontColor: '#FFFFFF' } }),
  },
});

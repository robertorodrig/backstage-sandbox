// packages/app/src/components/home/HomePage.tsx
import React, { useMemo, useState } from 'react';
import { Page, Content } from '@backstage/core-components';
import {
  HomePageCompanyLogo,
  TemplateBackstageLogo,
  HomePageStarredEntities,
  HomePageToolkit,
  HomePageTopVisited,
  HomePageRecentlyVisited,
} from '@backstage/plugin-home';
import { HomePageSearchBar } from '@backstage/plugin-search';
import { SearchContextProvider } from '@backstage/plugin-search-react';
import {
  Grid,
  makeStyles,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';   // Dark
import Brightness7Icon from '@material-ui/icons/Brightness7';   // Light
import AdjustIcon from '@material-ui/icons/Adjust';             // Aperture (custom)
import PaletteIcon from '@material-ui/icons/Palette';           // Botão principal
import { useApi, appThemeApiRef } from '@backstage/core-plugin-api';
import { tools, useLogoStyles } from './shared';

const useStyles = makeStyles(theme => ({
  searchBarInput: {
    maxWidth: '60vw',
    margin: 'auto',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '50px',
    boxShadow: theme.shadows[1],
  },
  searchBarOutline: {
    borderStyle: 'none',
  },
}));

export const HomePage = () => {
  const classes = useStyles();
  const { svg, path, container } = useLogoStyles();

  // ---- Theme selector (light, dark, aperture) ----
  const themeApi = useApi(appThemeApiRef);
  const themes = themeApi.getInstalledThemes?.() ?? [];
  const activeId = themeApi.getActiveThemeId?.();

  // Descobre os IDs padrão por variant e o id fixo do seu tema custom
  const { lightId, darkId, apertureId } = useMemo(() => {
    const light = themes.find(t => (t as any).variant === 'light')?.id ?? 'light';
    const dark  = themes.find(t => (t as any).variant === 'dark')?.id ?? 'dark';
    // seu tema custom deve estar registrado no App.tsx com id: 'aperture' e 'apertureee'
    const aperture = themes.find(t => t.id === 'aperture')?.id ?? 'aperture';

    return { lightId: light, darkId: dark, apertureId: aperture};
  }, [themes]);

  // Lista de temas que realmente estão instalados (na ordem desejada)
  const availableThemes = useMemo(() => {
    const ids = [lightId, darkId, apertureId];
    const installed = new Set(themes.map(t => t.id));
    return ids.filter((id, idx) => installed.has(id) && ids.indexOf(id) === idx);
  }, [themes, lightId, darkId, apertureId]);

  // UI: menu de seleção
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const openMenu = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  const selectTheme = (id: string) => {
    if (availableThemes.includes(id)) {
      themeApi.setActiveThemeId(id);
    }
    closeMenu();
  };

  // Ícone do botão principal reflete o tema ativo (apenas visual)
  const ActiveIcon = useMemo(() => {
    if (activeId === darkId) return Brightness4Icon;
    if (activeId === lightId) return Brightness7Icon;
    // qualquer outro (ex.: aperture) usa um ícone neutro
    return AdjustIcon;
  }, [activeId, lightId, darkId]);
  // ------------------------------------------------

  return (
    <SearchContextProvider>
      <Page themeId="home">
        <Content>
          <Grid container justifyContent="center" spacing={2}>
            {/* Botão para abrir o menu de temas (topo, à direita) */}
            <Grid container item xs={12} justifyContent="flex-end">
              <Tooltip title="Alterar tema">
                <IconButton
                  aria-label="Alterar tema"
                  aria-controls={menuOpen ? 'theme-menu' : undefined}
                  aria-haspopup="true"
                  onClick={openMenu}
                  edge="end"
                >
                  {/* Ícone dinâmico do tema atual, com um ícone base (Palette) atrás para consistência visual */}
                  <PaletteIcon style={{ marginRight: 4 }} />
                  <ActiveIcon />
                </IconButton>
              </Tooltip>

              {/* Menu com as opções disponíveis */}
              <Menu
                id="theme-menu"
                anchorEl={anchorEl}
                keepMounted
                open={menuOpen}
                onClose={closeMenu}
              >
                {availableThemes.includes(lightId) && (
                  <MenuItem selected={activeId === lightId} onClick={() => selectTheme(lightId)}>
                    <ListItemIcon><Brightness7Icon /></ListItemIcon>
                    <ListItemText primary="Light" />
                  </MenuItem>
                )}
                {availableThemes.includes(darkId) && (
                  <MenuItem selected={activeId === darkId} onClick={() => selectTheme(darkId)}>
                    <ListItemIcon><Brightness4Icon /></ListItemIcon>
                    <ListItemText primary="Dark" />
                  </MenuItem>
                )}
                {availableThemes.includes(apertureId) && (
                  <MenuItem selected={activeId === apertureId} onClick={() => selectTheme(apertureId)}>
                    <ListItemIcon><AdjustIcon /></ListItemIcon>
                    <ListItemText primary="Aperture" />
                  </MenuItem>
                )}
              </Menu>
            </Grid>

            <HomePageCompanyLogo
              className={container}
              logo={<TemplateBackstageLogo classes={{ svg, path }} />}
            />

            <Grid container item xs={12} justifyContent="center">
              <HomePageSearchBar
                InputProps={{
                  classes: {
                    root: classes.searchBarInput,
                    notchedOutline: classes.searchBarOutline,
                  },
                }}
                placeholder="Search"
              />
            </Grid>

            <Grid container item xs={12}>
              <Grid item xs={12} md={6}>
                <HomePageTopVisited />
              </Grid>
              <Grid item xs={12} md={6}>
                <HomePageRecentlyVisited />
              </Grid>
            </Grid>

            <Grid container item xs={12}>
              <Grid item xs={7}>
                <HomePageStarredEntities />
              </Grid>
              <Grid item xs={5}>
                <HomePageToolkit tools={tools} />
              </Grid>
            </Grid>
          </Grid>
        </Content>
      </Page>
    </SearchContextProvider>
  );
};

export default HomePage;

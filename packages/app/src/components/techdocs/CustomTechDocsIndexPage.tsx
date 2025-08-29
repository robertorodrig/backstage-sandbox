import React, { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    EntityListProvider,
    useEntityList,
    EntitySearchBar,
    EntityKindPicker,
    EntityOwnerPicker,
    EntityTagPicker,
} from '@backstage/plugin-catalog-react';
import { TECHDOCS_ANNOTATION } from '@backstage/plugin-techdocs-common';
import { techdocsApiRef } from '@backstage/plugin-techdocs-react';
import { useApi } from '@backstage/core-plugin-api';
import { useAsync } from 'react-use';

import {
    Content,
    Page,
    Header,
    HeaderLabel,
    Progress,
    EmptyState,
} from '@backstage/core-components';

import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Chip,
    Grid,
    Typography,
    Stack,
    Divider,
} from '@mui/material';

/** Somente a informação de "Última atualização" das TechDocs */
const LastUpdated = ({ entity }: { entity: any }) => {
    const techdocsApi = useApi(techdocsApiRef);

    const { value, loading, error } = useAsync(async () => {
        const entityId = {
            kind: entity.kind,
            name: entity.metadata.name,
            namespace: entity.metadata.namespace ?? 'default',
        };
        return await techdocsApi.getTechDocsMetadata(entityId);
    }, [techdocsApi, entity]);

    if (loading) {
        return (
            <Typography variant="caption" color="text.secondary">
                Checando atualização…
            </Typography>
        );
    }

    if (error || !value?.build_timestamp) {
        return (
            <Typography variant="caption" color="text.secondary">
                Última atualização: —
            </Typography>
        );
    }

    const ts = new Date(value.build_timestamp * 1000);
    const formatted = isNaN(ts.getTime()) ? '—' : ts.toLocaleString('pt-BR');

    return (
        <Typography variant="caption" color="text.secondary">
            Última atualização: {formatted}
        </Typography>
    );
};

const DocCardsGrid = () => {
    const { loading, error, entities } = useEntityList();

    const docEntities = useMemo(
        () =>
            (entities ?? []).filter(
                e => Boolean(e.metadata?.annotations?.[TECHDOCS_ANNOTATION]),
            ),
        [entities],
    );

    if (loading) return <Progress />;
    if (error)
        return (
            <EmptyState
                missing="content"
                title="Não foi possível carregar as docs"
                description={error.message}
            />
        );

    if (!docEntities.length) {
        return (
            <EmptyState
                missing="content"
                title="Nenhuma documentação encontrada"
                description="Ajuste os filtros ou adicione a anotação backstage.io/techdocs-ref nas entidades."
            />
        );
    }

    return (
        <Grid
            container
            columnSpacing={{ xs: 1, sm: 2, md: 1 }}
            rowSpacing={{ xs: 1, sm: 2, md: 1 }}
        >
            {docEntities.map(entity => {
                const name = entity.metadata.name;
                const title = entity.metadata.title ?? name;
                const namespace = (entity.metadata.namespace ?? 'default').toLowerCase();
                const kind = entity.kind.toLowerCase();
                const description =
                    entity.metadata.description ?? 'Sem descrição disponível';
                const tags = entity.metadata.tags ?? [];

                const docsLink = `/docs/${namespace}/${kind}/${name}`;

                return (
                    <Grid item xs={12} sm={6} md={4} key={`${namespace}:${kind}:${name}`}>
                        <Card
                            sx={{
                                borderRadius: 2,
                                boxShadow: 2,
                                height: '100%',
                                display: 'grid',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                            variant="outlined"
                        >
                            <CardActionArea component={RouterLink} to={docsLink} sx={{ flexGrow: 1 }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {title}
                                    </Typography>

                                    <Stack direction="row" spacing={1} sx={{ mb: 1 }} flexWrap="wrap">
                                        <Chip size="small" label={kind} />
                                        <Chip size="small" label={namespace} />
                                    </Stack>

                                    <Typography variant="body2" color="text.secondary" paragraph>
                                        {description}
                                    </Typography>

                                    {!!tags.length && (
                                        <>
                                            <Divider sx={{ my: 1.5 }} />
                                            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 1 }}>
                                                {tags.map(t => (
                                                    <Chip key={t} size="small" label={t} variant="outlined" />
                                                ))}
                                            </Stack>
                                        </>
                                    )}

                                    <LastUpdated entity={entity} />
                                </CardContent>
                            </CardActionArea>

                            <Box sx={{ p: 1.5, pt: 0, textAlign: 'center' }}>
                                <Typography
                                    component={RouterLink}
                                    to={docsLink}
                                    variant="body2"
                                    color="primary"
                                    sx={{ textDecoration: 'none'}}
                                >
                                    Abrir documentação →
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>
                );
            })}
        </Grid>
    );
};

export const TechDocsCardsPage = () => {
    return (
        <Page themeId="documentation">
            <Header title="Documentações" subtitle="Documentação e Arquiteturas de referência">
                <HeaderLabel label="Plugin" value="TechDocs" />
                <HeaderLabel label="Layout" value="Cards" />
            </Header>

            <Content>
                <Box sx={{ pt: 3, pb: 4 }}>
                    <EntityListProvider>
                        <Grid container spacing={1} justifyContent="center" alignItems="flex-start">
                            {/* Filtros na lateral esquerda */}
                            <Grid item xs={12} md={3}>
                                <Box sx={{ position: { md: 'sticky' }, top: { md: 80 } }}>
                                    <EntitySearchBar />
                                    <EntityKindPicker />
                                    <EntityOwnerPicker />
                                    <EntityTagPicker />
                                </Box>
                            </Grid>
                            {/* Grid de Cards centralizado à direita */}
                            <Grid
                                item
                                xs={12}
                                md={9}
                                gap='10%'
                                sx={{
                                    pl: { md: 4, xs: 2 },      // respiro à esquerda dos cards
                                    mt: { xs: 2, md: 0 },     // respiro no mobile
                                }}
                            >
                                <DocCardsGrid />
                            </Grid>
                        </Grid>
                    </EntityListProvider>
                </Box>
            </Content>
        </Page>
    );
};

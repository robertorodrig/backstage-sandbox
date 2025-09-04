# Backstage Portal

Este repositório contém a implementação de um portal de desenvolvedores baseado no [Backstage](https://backstage.io), uma plataforma open source da Spotify para gerenciamento de ferramentas, documentação e catálogos de software.

## Requisitos

- Node.js >= 18.x
- Yarn >= 1.22.x
- Docker (opcional, para plugins ou integrações específicas)

## Instalação

```sh
yarn install
```

## Execução do Portal

```sh
yarn start
```

O portal estará disponível em [http://localhost:3000](http://localhost:3000).

## Estrutura do Projeto

- `packages/app`: Aplicação principal do Backstage (frontend).
- `packages/backend`: Backend do Backstage (APIs, autenticação, integrações).
- `plugins/*`: Plugins customizados ou instalados.
- `catalog-info.yaml`: Catálogo de entidades (serviços, componentes, docs).

## Principais Plugins

- **Catalog**: Gerenciamento de componentes, serviços e recursos.
- **TechDocs**: Documentação técnica automatizada.
- **Scaffolder**: Criação de templates e automação de projetos.
- **Search**: Busca unificada no portal.

## Comandos Úteis

- `yarn start`: Inicia o frontend do portal.
- `yarn start-backend`: Inicia o backend do portal.
- `yarn test`: Executa os testes automatizados.
- `yarn build`: Gera o build de produção.

## Configuração

As configurações do portal estão nos arquivos:
- `app-config.yaml`: Configuração global do portal (URLs, integrações, autenticação).
- `catalog-info.yaml`: Cadastro de entidades do catálogo.

## Documentação

- [Documentação oficial do Backstage](https://backstage.io/docs)
- [Plugins Backstage](https://backstage.io/plugins)

## Suporte

Para dúvidas técnicas, consulte a documentação oficial ou abra uma issue neste repositório.

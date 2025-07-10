# Let Me Ask

Let Me Ask é uma aplicação web para criação e visualização de salas de perguntas, desenvolvida com React, Vite, TypeScript e TailwindCSS.

## Funcionalidades
- Listagem de salas disponíveis
- Criação de novas salas (em desenvolvimento)
- Visualização de detalhes de uma sala
- Navegação entre páginas com React Router

## Tecnologias Utilizadas
- [React](https://react.dev/) 19
- [Vite](https://vitejs.dev/) 7
- [TypeScript](https://www.typescriptlang.org/) 5
- [TailwindCSS](https://tailwindcss.com/) 4
- [React Query](https://tanstack.com/query/latest) 5
- [React Router DOM](https://reactrouter.com/) 7
- [Radix UI](https://www.radix-ui.com/) (componentes)
- [Lucide React](https://lucide.dev/) (ícones)

## Estrutura de Pastas
```
web/
├── public/                # Arquivos estáticos
├── src/
│   ├── app.tsx            # Componente principal
│   ├── main.tsx           # Ponto de entrada
│   ├── index.css          # Estilos globais (Tailwind)
│   ├── components/        # Componentes reutilizáveis
│   │   └── ui/            # Componentes de UI (ex: Button)
│   ├── lib/               # Funções utilitárias
│   └── pages/             # Páginas (CreateRoom, Room)
├── index.html             # HTML principal
├── package.json           # Dependências e scripts
├── vite.config.ts         # Configuração do Vite
└── ...
```

## Scripts Disponíveis
- `npm run dev` — Inicia o servidor de desenvolvimento
- `npm run build` — Gera a build de produção
- `npm run preview` — Visualiza a build de produção localmente

## Como rodar o projeto
1. Instale as dependências:
   ```sh
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```sh
   npm run dev
   ```
3. Acesse [http://localhost:5173](http://localhost:5173) no navegador.

## Backend
- O projeto consome uma API que deve estar rodando na porta 3333. Certifique-se de que o backend esteja configurado e executando antes de iniciar o frontend. 

(veja as rooms em `src/pages/create-room.tsx`).
- O estilo segue o padrão dark mode por padrão.

---

> Projeto para fins de estudo e demonstração de stack moderna com React + Vite + Tailwind.

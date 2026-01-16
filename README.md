## Ferramenta de injeção CSS (Vite + Chrome Extension)

**1. Clone este repositório na pasta src/
```
git clone git@github.com:marcelobeon/client-css-support.git
```


**2. Ajustes no repositório do cliente**
- Remover a seguinte devDependencies (não compatíveis com a versão do vite);
  - "node-sass": "^4.14.1";
- Adicionar "vite": "^7.2.4" nas devDependencies  ;
- Adicionar a importação no gulpfile.js: "var dartSass = require("sass")";
- Alterar a importação no gulpfile.js: "var sass = require("gulp-sass")" para "var sass = require("gulp-sass")(dartSass)";
- Cole o arquivo vite-config.js na raiz do repositório;
- Adicione os seguintes scripts de inicialização:

```json
"scripts": {
  "dev": "vite",
  "dev:sass": "npx sass --watch src/dev/scss:src/dev/css --style=expanded"
}
```

**3. Estrutura final**

Exemplo de estrutura no repositório:

- src/
  - dev/
    - chrome-extension/
      - content.js
      - background.js
      - manifest.json
    - scss/
      - style.scss
- vite.config.js
- package.json

**4. Alterar o site do cliente em `manifest.json`**

Exemplo:
```json
// manifest.json
{
  "manifest_version": 1,
  "name": "Dev CSS Cliente",
  "version": "1.0",
  "background": {
    "service_worker": "background.js"
  },
  "content_scripts": [
    {
      "matches": ["https://www.cliente.com.br/*"],
      "js": ["content.js"],
      "run_at": "document_end"
    }
  ],
  "host_permissions": [
    "https://www.cliente.com.br/*",
    "http://localhost:5174/*"
  ]
}
```


**6. Como rodar (desenvolvimento)**
- Instale as dependências:
```bash
npm install
```

- No Chrome acesse: chrome://extensions
  - Habilite o Developer mode
  - Carregue a extensão no Chrome apontando para a pasta `src/dev/chrome-extension` em Load unpacked

- Inicie o Vite e o watcher do SASS:

```bash
npm run dev
npm run dev:sass
```

- Abra o site alvo (ex.: `https://www.cori.com.br`) e verifique se o `content.js` injeta o CSS no console.
- Faça alterações no arquivo style.scss e veja o live reload no site

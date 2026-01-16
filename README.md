# Ferramenta de injeção CSS (Vite + Chrome Extension)
Esta ferramenta permite injetar CSS localmente em sites de clientes através de uma extensão do Chrome, com live reload utilizando Vite.

## 1. Clone do repositório base
Clone este repositório dentro da pasta src/ do projeto do cliente:
```
git clone git@github.com:marcelobeon/client-css-support.git
```


## 2. Ajustes no repositório do cliente
- Remover a seguinte devDependencies (não compatível com a versão do vite):
  - "node-sass": "^4.14.1"
- Adicionar o Vite nas devDependencies:
  - "vite": "^7.2.4"

- Ajustar o gulpfile.js:
  - Adicionar:
  ```js
  var dartSass = require("sass")
  ```
  - Alterar:
  ```js
  var sass = require("gulp-sass")
  ```
  - Para:
  ```js
  var sass = require("gulp-sass")(dartSass)
  ```

- Adicionar a importação no gulpfile.js: "var dartSass = require("sass")";
- Alterar a importação no gulpfile.js: "var sass = require("gulp-sass")" para "var sass = require("gulp-sass")(dartSass)";
- Mova o arquivo vite-config.js para a raiz do repositório;
- Adicione os seguintes scripts ao ´package.json´:

```json
"scripts": {
  "dev": "vite",
  "dev:sass": "npx sass --watch src/dev/scss:src/dev/css --style=expanded"
}
```

## 3. Configurar o site do cliente

Edite o arquivo manifest.json e ajuste o domínio do cliente:

```json
{
  "manifest_version": 3,
  "name": "Dev CSS Cliente",
  "version": "1.0",
  "background": {
    "service_worker": "background.js"
  },
  "content_scripts": [
    {
      "matches": ["https://www.cliente.com.br/*"], // <-- Altere aqui
      "js": ["content.js"],
      "run_at": "document_end"
    }
  ],
  "host_permissions": [
    "https://www.cliente.com.br/*", // <-- Altere aqui
    "http://localhost:5174/*"
  ]
}
```


## 4. Como executar (desenvolvimento)
- Instale as dependências:
```bash
npm install
```

- No Chrome acesse: chrome://extensions
  - Habilite o Developer mode;
  - Carregue a extensão no Chrome apontando para a pasta `src/dev/chrome-extension` em Load unpacked;

- Inicie o Vite e o watcher do SASS:

```bash
npm run dev
npm run dev:sass
```

- Abra o site alvo (ex.: `https://www.cori.com.br`) e verifique a mensagem "CSS injected" no console;
- Faça alterações no arquivo style.scss e veja o live reload no site.

## 5. Estrutura final

Exemplo de estrutura no repositório:

```
src/
└── dev/
    ├── chrome-extension/
    │   ├── content.js
    │   ├── background.js
    │   └── manifest.json
    └── scss/
        └── style.scss
vite.config.js
package.json
```
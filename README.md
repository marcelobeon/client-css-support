# Ferramenta de injeção CSS (Chrome Extension)

Habilita a capacidade de live reload nos CSS de desenvolvimento do Beonly.

## 1. Configurar o site do cliente

Edite o arquivo manifest.json e ajuste o domínio do cliente:

```json
{
  "manifest_version": 3,
  "name": "Beonly live CSS - {NOME CLIENTE}", // <- Altere para melhor visibilidade
  "description": "Habilita capacidades de live reload nos CSS de desenvolvimento do Beonly.",
  "version": "1.0",
  "background": {
    "service_worker": "background.js"
  },
  "content_scripts": [
    {
      "matches": ["https://www.cliente.com.br/*"], // <- Altere aqui
      "js": ["content.js"],
      "run_at": "document_end"
    }
  ],
  "host_permissions": [
    "https://www.cliente.com.br/*", // <- Altere aqui
    "http://localhost:4000/*"
  ]
}
```


## 2. Como executar (somente para desenvolvimento)
- No Chrome acesse: *chrome://extensions*
  - Habilite o Developer mode;
  - Carregue a extensão no Chrome apontando para a pasta `/chrome-extension` em Load unpacked;

- Abra o site alvo (ex.: `https://www.cori.com.br`) e verifique a mensagem "CSS injected" no console.

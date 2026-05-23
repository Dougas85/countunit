# CountUnit — Contador de Objetos 

> Aplicação web para estimativa de volume de objetos  em unidades operacionais, utilizando visão computacional via IA.

---

## 📋 Sobre o projeto

O **ContaUni** foi desenvolvido para otimizar a mensuração de carga em unidades operacionais. Por meio de fotos tiradas diretamente pelo celular, o sistema identifica automaticamente os tipos de recipientes presentes na unidade e calcula o volume estimado de objetos com base em uma tabela de gabaritagem.

---

## 🚀 Funcionalidades

- 📷 **Captura de fotos** diretamente pela câmera do celular ou galeria
- 🔍 **Análise por IA** — identifica e conta caixetas, bandejas e mesas de escaninhos
- 📊 **Cálculo automático** baseado na gabaritagem oficial
- ✏️ **Correção manual** dos valores detectados
- 🧠 **Aprendizado local** — quanto mais você corrige e salva, mais preciso o modelo fica
- 💾 **Histórico de registros** com data e detalhamento por tipo
- 📱 **PWA** — funciona no celular como um app, sem instalação

---

## 🗂️ Gabaritagem

| Recipiente | Capacidade |
|---|---|
| Caixeta grande amarela | 180 objetos |
| Bandeja rasa amarela | 720 objetos |
| Caixeta azul | 1.800 objetos |
| Mesa de escaninhos | Variável (estimativa visual) |

---

## 🧠 Sistema de aprendizado

O app possui um sistema de aprendizado incremental baseado em **few-shot learning**:

1. O modelo analisa a foto e retorna a contagem estimada
2. O operador corrige os valores se necessário
3. Ao clicar em **"Salvar e treinar modelo"**, a foto e os valores corrigidos são armazenados localmente
4. Nas próximas análises, esses exemplos são enviados junto à API como referência de calibração
5. Com o tempo, o modelo se torna progressivamente mais preciso para aquela unidade específica

> Os exemplos aprendidos ficam salvos no dispositivo (localStorage). Suporta até 15 exemplos aprendidos + 3 exemplos fixos de base.

---

## ⚙️ Tecnologias

- **Frontend:** HTML5, CSS3, JavaScript puro (sem frameworks)
- **IA / Visão:** Claude Sonnet (Anthropic API) com few-shot prompting
- **Armazenamento:** localStorage (sem banco de dados externo)
- **Deploy:** Vercel

---

## 📲 Como usar

1. Abra o app no celular
2. Insira sua chave de API na primeira vez
3. Adicione uma ou mais fotos da unidade (até 6)
4. Clique em **Analisar**
5. Confira os resultados e corrija se necessário
6. Clique em **Salvar e treinar modelo** para melhorar a precisão futura

---

## 🔑 Configuração da API

O app utiliza a **API da Anthropic (Claude)**. Para obter uma chave:

1. Acesse [console.anthropic.com](https://console.anthropic.com)
2. Crie uma conta e gere uma API Key
3. Insira a chave na tela de configuração do app

---

## 📁 Estrutura do projeto

```
countunit/
├── index.html      # Aplicação completa (single file)
└── README.md       # Documentação
```

---

## 📄 Licença

© 2025 DFS · Todos os direitos reservados

Plataforma de Consulta de Técnicas de Jiu-Jitsu
Visão Geral do Projeto
Plataforma web para consulta rápida e intuitiva de técnicas de jiu-jitsu. O foco é fornecer uma experiência fluida de busca → resultados → detalhes.

Fluxo principal do usuário:

text
Campo de busca (autocomplete) → Lista de resultados (cards) → Página de detalhes da técnica
Funcionalidades Principais
1. Campo de Busca com Autocomplete
Localização: Página inicial

Comportamento esperado:

Busca em tempo real enquanto digita (mínimo 2 caracteres)

Sugestões baseadas em títulos e palavras-chave das técnicas

Fonte de dados: data/techniques.json

Resultados limitados a 6 sugestões visíveis

Seleção por clique ou Enter

2. Página de Resultados
Trigger: Submit da busca ou clique em sugestão

Layout: Cards em grade responsiva

Conteúdo de cada card:

text
[Título da técnica]
[Trecho curto da descrição - máx. 120 caracteres]
[Botão "Ver detalhes" ou seta]
Comportamentos obrigatórios:

Paginação ou scroll infinito (preferencialmente scroll infinito)

Filtro por dificuldade/nível (se disponível nos dados)

Ordenação: relevância da busca > alfabética

3. Página de Detalhes da Técnica
Dados completos de data/techniques.json

Elementos obrigatórios:

Título em H1

Descrição completa

Posição inicial/final (se disponível)

Vídeo embed (YouTube/Vimeo)

Tags/categorias

Volta para resultados

Estrutura de Dados
Arquivo principal: data/techniques.json

json
{
  "techniques": [
    {
        "technique": "",
        "category": "",
        "description": ""
    },
  ]
}
Referências Visuais
Pasta: layout/

search-screen.png - Campo de busca + autocomplete

results-grid.png - Cards de resultados

technique-detail.png - Página de detalhes

Regras de Negócio Críticas
Busca e Autocomplete
text
1. Case insensitive
2. Busca em: title, keywords, shortDescription
3. Prioridade: title (100%) > keywords (80%) > description (50%)
4. Sem resultados → mensagem "Nenhuma técnica encontrada"
5. Mínimo 2 caracteres para disparar busca
Performance
text
1. Debounce de 300ms na busca
2. Cache de resultados por 5 minutos
3. Lazy loading de imagens/vídeos
4. Máximo 20 técnicas por página/resultados
Responsividade
text
Mobile-first:
- Cards: 1 coluna (320px+), 2 colunas (768px+), 3 colunas (1024px+)
- Autocomplete: altura máxima 300px com scroll
- Botões touch-friendly (mín. 44px)
Estados Especiais
text
1. Loading: skeleton nos cards
2. Empty state: ilustração + texto amigável
3. Error state: "Erro ao carregar. Tente novamente."
4. Offline: cache das últimas 10 técnicas
Comportamentos que NÃO implementar
❌ Login/cadastro

❌ Favoritos (fase 1)

❌ Filtros avançados (fase 1)

❌ Download de técnicas

❌ Compartilhamento social

Stack Tecnológica Sugerida
text
Frontend: React/Next.js + TailwindCSS
Busca: Fuse.js ou Algolia (para autocomplete fuzzy)
Dados: JSON local ou Sanity/Strapi
Deploy: Vercel/Netlify

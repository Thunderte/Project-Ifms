📐 Estrutura Geral da Página
🎯 Tipo de layout

Layout desktop

Largura máxima centralizada: ~1200–1280px

Background geral: cinza claro (#f3f4f6 aprox)

Container principal branco com:

border-radius: 12px

sombra leve (0 4px 12px rgba(0,0,0,0.08))

🔝 1. HEADER (Topo fixo)
Altura:

~70–80px

Estrutura interna (Flex horizontal, space-between)
Esquerda:

Logo IFMS (ícone quadrado verde)

Texto ao lado:

“IFMS” (bold)

Separador vertical

“Central de Salas IFMS”

Espaçamento:

Gap entre logo e texto: 16px

Direita:

Ícone de usuário

Nome: “João Silva”

Botão verde: “Sair”

Fundo verde escuro

Border-radius: 8px

Ícone pequeno dentro

📚 2. MENU DE NAVEGAÇÃO (Barra azul abaixo do header)

Altura:
~50px

Cor:
Azul escuro (aprox #1f3c68)

Itens horizontais com ícone:

Início

Cadastro

Reservas

Usuários

Tipografia branca
Item ativo com leve destaque ou sublinhado

📄 3. TÍTULO DA PÁGINA

“Central de Salas IFMS”

Fonte grande (~28–32px)

Bold

Cor azul escuro

Margem superior: 32px

Linha divisória fina abaixo

🎛 4. FILTROS (Selects)

Linha horizontal com:

Select: Campus

Select: Bloco

Select: Andar

Botão: “Selecionar”

Altura dos inputs:
~40–44px
Border-radius: 8px
Borda cinza clara
Espaçamento horizontal entre eles: 16px

🗺 5. ÁREA PRINCIPAL (Layout em 2 colunas)

Grid:

| Mapa 2D (70%) | Informações da Sala (30%) |


Gap entre colunas: 24px

🏢 5.1 Card do Mapa 2D
Container

Fundo branco

Border-radius: 12px

Sombra leve

Header do Card

Barra azul escura
Texto centralizado:
“1º Andar - Bloco A”
Altura: ~50px
Texto branco

Área interna do mapa

Estrutura:

Retângulo cinza à esquerda representando “Corredor”

Salas organizadas em grid 2 linhas

Salas (componentes individuais)

Tamanho aproximado:

140–160px largura

80–100px altura

Border-radius: 8px

Estados:

🟢 Livre

Verde médio

Texto branco

Nome da sala centralizado

🔴 Ocupada

Vermelho forte

Texto branco

Subtexto: “Ocupada”

⚪ Manutenção

Fundo cinza claro

Ícone de ferramenta

Texto escuro

Legenda (abaixo do mapa)

Linha horizontal com:

Quadrado verde + “Livre”

Quadrado vermelho + “Ocupada”

Ícone ferramenta + “Manutenção”

Espaçamento entre itens: 24px

📋 5.2 Card Lateral — Informações da Sala

Largura ~320px

Bloco superior

Título:
“Informações da Sala”

Exemplo exibido:
Sala 102
30 lugares
Sala comum
Status: Ocupada (badge vermelho)

Bloco inferior — Reservas Agendadas

Subtítulo:
“Reservas Agendadas”

Card pequeno interno:

Data e horário

Texto menor “Reservado por João Silva”

Botão abaixo:
“+ Nova Reserva”

Botão azul claro

Border-radius 8px

📊 6. Reservas Recentes (Seção inferior)

Container grande branco

Cabeçalho:

“Reservas Recentes”

Filtros da tabela

Linha com:

Select Sala

Select Data

Select Responsável

Select Status

Botão verde “Exportar”

Tabela

Colunas:

| Sala | Data | Horário | Responsável | Status |

Estilo:

Header com fundo cinza claro

Linhas brancas

Badge verde para “Ativa”

Avatar circular pequeno no campo responsável

Altura de linha:
~56px

Paginação

Centralizada abaixo:
Botões numerados (1,2,3...)

Botões com:

36px x 36px

Bordas arredondadas

🔘 7. Botões inferiores

Linha com:

Botão verde: “+ Nova Reserva”

Botão azul: “+ Nova Sala”

Botão cinza: “Exportar”

🎨 Hierarquia Visual

Níveis:

Header (mais escuro)

Navbar

Cards principais

Tabela

Footer simples

🔤 Tipografia sugerida

Fonte similar a Inter / Roboto

Títulos: 600–700

Corpo: 400–500

Labels pequenos: 12–14px
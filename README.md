# Sistema - Raposo Emporio
## Projeto SPRINT 1 - Sistema de Gerenciamento de Usuários

## Raposo Emporio
É uma loja de comidas, bebidas e doces da minha família. Com intuito de praticar meus conhecimentos em programação questionei minhas tias se as interessariam um sistema de gerencia de estoque personalizado e a partir daí tive a idea de usar para o meu projeto. No futuro pretendo completar a implementação desse sistema adicionando produtos, vendas e mais. Considerando que, dependendo da escala que tome até se transformar em um e-commerce.

## Objetivo
Sistema CRUD para gerenciar usuários, para o sistema do Raposo Emporio. Funcionalidade básica, inicial, da construção do sistema da loja para gerencia de clientes e admnistradores.

## Regras de negócio
Usuários podem se cadastrar por si só no sistema, nesse primeiro momento, o próprio pode escolher sua função, entre ADMIN e USER, e após o cadastro o usuário é levado a tela de login. Após a realização correta do login, passa para a tela principal onde se tem algumas informações de todos os usuários cadastrados no sistema, sendo que ADMINs podem ver todos eles, mas um USER pode ver apenas outros USERs. Outra regra do sistema, é que um usuário USER pode editar e excluir apenas o próprio perfil, não tendo se quer acesso a dados não mostrados na página principal, enquanto ADMINs conseguem ver os dados de outros users (mas não edita-los) e tem o poder de excluir o user. Depois de logado o usuário não precisa relogar na próxima hora, que é o período de duração do token, após a deleção do próprio usuário do sistema, o logout automático é realizado e volta-se para a página de login/registro.

## Front-End

### Tecnologias
- HTML
- CSS
- JavaScript

### Como foram utilizadas?
Utilizei de estratégias de view e form que aparecia e desapareciam na tela do usuário (de forma interna). Contruindo telas para login, cadastro, update, e a tela principal da aplicação, após o login.

### Instruções para executar
1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>

2. Execute o live server ou copie o path do arquivo ```index.html``` e cole em seu navegador

3. Para o sistema realmente funcionar o Back-end precisa estar rodando localmente (futuramente, providenciarei hospedagem em nuvem de alguma forma)
<h2><a href= "https://www.mackenzie.br">Universidade Presbiteriana Mackenzie</a></h2>
<h3><a href= "https://www.mackenzie.br/graduacao/sao-paulo-higienopolis/sistemas-de-informacao">Sistemas de Informação</a></h3>


<p><font size="+12"><center>Sistema de Presenças</center></font></p>

>*Observação 1: A estrutura inicial deste documento é só um exemplo. O seu grupo deverá alterar esta estrutura de acordo com o que está sendo solicitado na disciplina.*

>*Observação 2: O índice abaixo não precisa ser editado se você utilizar o Visual Studio Code com a extensão **Markdown All in One**. Essa extensão atualiza o índice automaticamente quando o arquivo é salvo.*

**Conteúdo**

- [Autores](#autores)
- [Descrição do projeto](#descrição-do-projeto)
- [Diagrama de casos de uso](#diagrama-de-casos-de-uso)
- [Descrição dos casos de uso](#descrição-dos-casos-de-uso)
- [Protótipos de tela](#protótipos-de-tela)
- [Modelo de domínio](#modelo-de-domínio)
- [Decisões de arquitetura](#decisões-de-arquitetura)
- [Diagrama de implantação](#diagrama-de-implantação)
- [Referências](#referências)


# Autores

* Luigi Romero Nestori
* Manuela de Caria Bertanha
* Michele Ramos Borowski
* Rafael Carreira Cavalcante


# Descrição do projeto

Será entregue um sistema de presenças para a escola Infinito, o qual registrará as informações de quais alunos estão presentes e ausentes em cada aula. Assim, ele apresentará os dados que os gestores da escola desejam obter com a aplicação.

Ao utilizar o sistema, o Professor pode fazer duas chamadas de presença no dia, de forma fácil e intuitiva, para registrar quais alunos estavam presentes no dia letivo. O sistema produzirá um relatório de faltas agrupado por data, ano letivo, turma, professor, disciplina ou aluno, facilitando a análise e o acompanhamento do número de faltas. Caso o aluno tenha faltas excessivas (quando a presença dada até o momento estiver abaixo de 80%) os pais ou responsáveis receberão um e-mail notificando-os do ocorrido.

# Diagrama de casos de uso

![Proj Escola-Infinito-Casos de Uso - versão 1 drawio](https://user-images.githubusercontent.com/49102217/223579530-7196f0ff-b63b-46cc-9e5d-dc30982785cd.png)


# Descrição dos casos de uso
<h2>Caso de Uso: Registrar falta</h2>

![userCase1](https://user-images.githubusercontent.com/102591519/219972383-c0c15b73-57b4-4cb9-9bf2-d56e5ad8b021.png)
![userCase2](https://user-images.githubusercontent.com/102591519/219972399-3ce86e34-9864-4832-861b-9a5992391e5a.png)
![userCase3](https://user-images.githubusercontent.com/102591519/219972406-a1207dcf-40f8-436d-bf0a-e1acf3ce61be.png)
![userCase4](https://user-images.githubusercontent.com/102591519/219972416-6edc3621-2b74-49e7-818f-740d5def4ef9.png)

<h2>Caso de Uso: Gerar relatório de faltas</h2>

![gerarRelatório-01](https://user-images.githubusercontent.com/102591519/223589201-9715c838-25d5-4d3a-ba66-12382025c410.png)
![gerarRelatório-02](https://user-images.githubusercontent.com/102591519/223589316-2927adbc-ee27-4773-b6dc-1718b8e6e227.png)
![gerarRelatório-03](https://user-images.githubusercontent.com/102591519/223589335-6a01f837-c306-4a34-9bc1-0c976ae28b5e.png)

<h2>Caso de Uso: Enviar notificação sobre faltas excessivas</h2>

![enviarEmail-01](https://user-images.githubusercontent.com/102591519/223589037-d646d475-c9af-4321-99a1-40d9fc2aa180.png)
![enviarEmail-02](https://user-images.githubusercontent.com/102591519/223589070-c3f2f9c5-053c-43aa-ac93-b6da8d07f1fd.png)

# Protótipos de tela

<h2>Fluxo Principal</h2>

![Tela-1](https://user-images.githubusercontent.com/102591519/219970725-bf9291ff-02fe-4f42-913b-f0d7633ec25a.png)
![Tela-2](https://user-images.githubusercontent.com/102591519/219970755-a69256f9-46dd-4224-a331-926ad0c83697.png)

<h2>Fluxo - Fazer Chamada</h2>

![Tela-3](https://user-images.githubusercontent.com/102591519/219970827-13ec87fa-c7fd-4077-9e7b-43e2bcd56c4d.png)
![Tela-4](https://user-images.githubusercontent.com/102591519/219970876-58cc0976-309f-41ef-a66e-7dda8352f877.png)
![image](https://user-images.githubusercontent.com/79451555/223590538-0cebb545-911f-45a1-9f56-0e3380b0b207.png)
![image](https://user-images.githubusercontent.com/79451555/223590617-0c24e69f-3e92-4088-b352-7f7089089c94.png)

<h2>Fluxo - Gerar Relatório</h2>

![image](https://user-images.githubusercontent.com/79451555/223590697-102ef6cc-3069-4bc8-a7a7-a0bbeeeb0b7e.png)
![image](https://user-images.githubusercontent.com/79451555/223590723-d312c994-7417-418b-ab97-bef2b51e7b5e.png)

# Modelo de domínio

![Proj Escola-Infinito-Diagrama de Domínio drawio](https://user-images.githubusercontent.com/49102217/223579889-508c111e-b917-4e3e-9c6e-27aafd0a3e48.png)


# Decisões de arquitetura
<h2>Diagrama de Sequência - Registrar Falta</h2>

![Proj Escola-Infinito-Diagrama de Sequencia drawio](https://user-images.githubusercontent.com/49102217/223582618-7d99f423-1c07-438e-9790-21fd98e31743.png)


<h2>Diagrama de Sequência - Gerar Relatório</h2>

![Proj Escola-Infinito-Diagrama de Sequencia Gerar Relatorio drawio](https://user-images.githubusercontent.com/49102217/223582858-5a311a37-820e-4df0-a3ef-4ff5675f1dfc.png)


<h2>Diagrama de Sequência - Enviar Notificação</h2>

![Proj Escola-Infinito-Diagrama de Sequencia Receber Norificacao drawio (1)](https://user-images.githubusercontent.com/49102217/223583372-f6834fcf-733d-4c0a-ac32-5d311207b614.png)



<h2>Diagrama de classe de projeto</h2>
  
![Proj Escola-Infinito-Diagrama de Classes de Projeto drawio](https://user-images.githubusercontent.com/49102217/223580226-bbae7546-656c-4f99-b1fc-1672621a8e77.png)


# Diagrama de implantação

![Proj Escola-Infinito-Implantação do sistema drawio](https://user-images.githubusercontent.com/49102217/223580451-803d33dc-ffa0-4153-9dbf-f4d25056c1a3.png)


# Referências

LARMAN, C. Utilizando UML e Padrões. 3ª ed. São Paulo: Bookman, 2007. 

Meilir Page-Jones, Fundamentos do desenho orientado a objeto com UML, Editora Pearson, 2001.



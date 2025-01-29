# Projeto: Cadastro de Usuários com Domain-Driven Design (DDD)

## Descrição
Este projeto é uma API desenvolvida em Node.js com TypeScript, seguindo os princípios do Domain-Driven Design (DDD) para o cadastro de usuários. Ele utiliza uma arquitetura modular, separando a lógica de negócio da infraestrutura.

## Tecnologias Utilizadas
- **Node.js** (v22 via NVM)
- **TypeScript**
- **Express** (para roteamento HTTP)
- **Jest** (para testes)
- **SQLite (opcional)** (para armazenamento de dados em testes)

## Estrutura do Projeto
```
/src
  /entities          # Definição das entidades do domínio
  /repositories      # Interface e implementações dos repositórios
  /services         # Casos de uso e regras de negócio
  /controllers      # Controladores das rotas
  /tests            # Testes unitários e de integração
  server.ts         # Arquivo principal para inicializar o servidor
```

## Instalação
1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Se ainda não tiver o TypeScript e o ts-node instalados globalmente, instale-os:
   ```bash
   npm install -g typescript ts-node
   ```

## Como Rodar o Projeto
### Executar o Servidor em Modo de Desenvolvimento
```bash
npm run dev
```

### Executar os Testes
```bash
npm test
```

## Exemplo de Uso
### Criar um Usuário
**Requisição:**
```http
POST /users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```

**Resposta:**
```json
{
  "id": "1",
  "name": "John Doe",
  "email": "johndoe@example.com"
}
```

## Licença
Este projeto está licenciado sob a MIT License. Para mais detalhes, veja o arquivo [LICENSE](LICENSE).


## API REST Alfred IBGE

## Resources

- Back End -> NodeJS / Express
- Database -> mLab MongoDB (NoSQL Database)
- Cloud Server -> Heroku
- Server Reload -> Nodemon reload, automatically

## Folders

- Routes ```./app/routes```
- Models ```./app/models```
- API ```./app/api```
- Config Express ```./config/express.js```
- Config Database ```./config/database.js```
- Server ```./server.js```

## Project Environment Installation

### NodeJS

- Download and install NodeJS <a href="https://nodejs.org/en/" target="_blank">nodejs.org</a>.

### MongoDB 

- Install with Homebrew <code>/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"</code>.
- Update Homebew <code>brew update</code> 
- Install MongoDB <code>brew install mongodb</code>.
- Em alguns casos precisamos usar o comando como sudo para criação da pasta db no terminal <code>sudo mkdir -p /data/db</code> e mudar a permissão de acesso usando linha de comando <code>sudo chmod 777 /data/db</code>.
- Então para iniciar o MongoDB basta usar o comando <code>mongod</code>.

## Project

- Download or clone the project access the project folder with the terminal and execute the CLI <code>npm install</code>.
- Run the server <code>npm start</code> (Nodemon)
- Access in your browser <a href="http://localhost:3000">http://localhost:3000</a>

## Dependencies

- Dependency express - <a href="https://www.npmjs.com/package/express">https://www.npmjs.com/package/express</a>
- Dependency body-parser - <a href="https://www.npmjs.com/package/body-parser">https://www.npmjs.com/package/body-parser</a>
- Dependency cors - <a href="https://www.npmjs.com/package/cors">https://www.npmjs.com/package/cors</a>
- Dependency express-load - <a href="https://www.npmjs.com/package/express-load">https://www.npmjs.com/package/express-load</a>
- Dependency Nodemon - <a href="https://nodemon.io/">https://nodemon.io/</a> 

By: <a href="http://renanlopes.com">Renan Lopes</a>


import 'reflect-metadata';
import express, {Application, Request, Response, NextFunction} from 'express';
import {createConnection} from "typeorm";
import path from 'path';
import cors from 'cors';
import history from 'connect-history-api-fallback';
import config from './ormconfig';

class App {
	public app: Application;

	constructor(controllers){
		this.app = express();

		this.initializeMiddleWares();
		this.initializeControllers(controllers);
	}

	private initializeControllers(controllers) {
		controllers.forEach((controller) => {
			this.app.use('/', controller.router);
		});
	}
		
	private initializeMiddleWares() {
		this.app.use(cors());
		this.app.use(express.urlencoded({extended: true}));
		this.app.use(express.json());
		this.app.use(history({
			htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
		}));
		if (process.env.NODE_ENV === 'production') {
			this.app.use('/', express.static(path.join(__dirname, 'client', 'build')))
		}
	};

	public async listen() {
		const port: number | string = process.env.PORT || 5000;

		this.app.listen(port, async()=> {
			try{
				const connection: any = await createConnection(config);
				console.log("Connected to PostgreeSQL");
				console.log(`Server has been started on ${port}`);
			}catch(error){
				console.log(error);
				process.exit(1);
			}
		})
	}
}

export default App;
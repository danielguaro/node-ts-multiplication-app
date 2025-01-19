//Objetivo, crear la data del archivo

export interface CreateTableUseCase {
	execute: (options: CreateTableOptions) => string;
}

export interface CreateTableOptions {
	base: number;
	limit?: number;
}

export class CreateTable implements CreateTableUseCase {
	// El constructor es el primer método que se llama cuando se vaya a crear una instancia
	constructor() {
		/* 
      DI - Dependency Injection
    */
	}

	execute({ base, limit = 10 }: CreateTableOptions) {
		let outputMessage = '';
		for (let i = 1; i <= limit; i++) {
			outputMessage += `${base} X ${i} = ${base * i}\n`;
		}
		return outputMessage;
	}
}

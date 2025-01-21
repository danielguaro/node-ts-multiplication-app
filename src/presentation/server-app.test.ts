import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';
import { ServerApp } from './server-app';
describe('server-app', () => {
	const options = {
		base: 2,
		limit: 10,
		showTable: false,
		fileDestination: 'test-destination',
		fileName: 'test-filename',
	};

	beforeEach(() => {
		//para limpiar todas las pruebas del .spyOn()
		jest.clearAllMocks();
	});
	test('should create ServerApp instance', () => {
		const serverApp = new ServerApp();
		expect(serverApp).toBeInstanceOf(ServerApp);
		expect(typeof ServerApp.run).toBe('function');
	});

	// Prueba de integración
	test('should run ServerApp with options', () => {
		//si en el jest.spyOn() no se pone el método .mockImplementation, no estaré creando una función que esta escuchando el log
		const logSpy = jest.spyOn(console, 'log');
		// El prototype es quien tiene el prototipo de los métodos
		const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
		const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');
		ServerApp.run(options);
		expect(logSpy).toHaveBeenCalledTimes(2);
		expect(logSpy).toHaveBeenCalledWith('Server running...');
		expect(logSpy).toHaveBeenLastCalledWith('File Created!');
		expect(createTableSpy).toHaveBeenCalledWith({
			base: options.base,
			limit: options.limit,
		});
		expect(saveFileSpy).toHaveBeenCalledTimes(1);
		expect(saveFileSpy).toHaveBeenCalledWith({
			fileContent: expect.any(String),
			fileDestination: options.fileDestination,
			fileName: options.fileName,
		});
	});

	test('should run with custom values mock', () => {
		// jest.fn son funciones similares a las de spyOn
		const logMock = jest.fn();
		const logErrorMock = jest.fn();
		const createMock = jest.fn().mockReturnValue('1 X 2 = 2'); // No importa que implementación tenga, esto será lo que regrese
		const saveFileMock = jest.fn().mockReturnValue(true);
		console.log = logMock;
		console.error = logErrorMock;
		CreateTable.prototype.execute = createMock;
		SaveFile.prototype.execute = saveFileMock;

		ServerApp.run(options);

		expect(logMock).toHaveBeenCalledWith('Server running...');
		expect(createMock).toHaveBeenCalledWith({
			base: options.base,
			limit: options.limit,
		});
		expect(saveFileMock).toHaveBeenCalledWith({
			fileContent: '1 X 2 = 2',
			fileDestination: options.fileDestination,
			fileName: options.fileName,
		});
		expect(logMock).toHaveBeenCalledWith('File Created!');
		expect(logErrorMock).not.toHaveBeenCalled();
	});
});

import { SaveFile } from './save-file.use-case';
import fs from 'fs';

describe('save-file.use-case', () => {
	const customOptions = {
		fileContent: 'custom content',
		fileDestination: 'custom-outputs/file-destination',
		fileName: 'custom-table-name',
	};
	const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;

	beforeEach(() => {
		jest.clearAllMocks();
	});

	// Para evitar falsos positivos, ejemplo. que se tenga la carpeta outputs previamente. se debe hacer un cleanup
	afterEach(() => {
		const exist = fs.existsSync('outputs');
		if (exist) fs.rmSync('outputs', { recursive: true });

		const customOutputFolderExist = fs.existsSync(
			customOptions.fileDestination
		);

		if (customOutputFolderExist)
			fs.rmSync('custom-outputs/file-destination', { recursive: true });
	});

	test('Should save file with default Values', () => {
		const saveFile = new SaveFile();
		const filePath = 'outputs/table.txt';
		const options = {
			fileContent: 'test content',
		};

		const result = saveFile.execute(options);

		const fileExist = fs.existsSync(filePath);
		const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

		expect(result).toBeTruthy();
		expect(fileExist).toBe(true);
		expect(fileContent).toBe(options.fileContent);
	});

	test('should save file with custom values', () => {
		const saveFile = new SaveFile();

		const result = saveFile.execute(customOptions);
		const fileExist = fs.existsSync(customFilePath);
		const fileContent = fs.readFileSync(customFilePath, {
			encoding: 'utf-8',
		});
		expect(result).toBeTruthy();
		expect(fileExist).toBe(true);
		expect(fileContent).toBe(customOptions.fileContent);
	});

	test('should return false if directory could not be created', () => {
		const saveFile = new SaveFile();

		const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
			throw new Error('Error');
		});

		const result = saveFile.execute(customOptions);
		expect(result).toBe(false);

		mkdirSpy.mockRestore();
	});

	test('should return false if file could not be created', () => {
		const saveFile = new SaveFile();

		const writeFileSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
			throw new Error('Error');
		});

		const result = saveFile.execute({ fileContent: 'hola' });
		expect(result).toBe(false);
		writeFileSpy.mockRestore();
	});
});

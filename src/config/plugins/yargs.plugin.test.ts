const runCommand = async (args: string[]) => {
	process.argv = [...process.argv, ...args];
	const { yarg } = await import('./yargs.plugin');
	return yarg;
};

describe('Test yargs.plugin', () => {
	const originalArgv = process.argv;

	beforeEach(() => {
		process.argv = originalArgv;
		jest.resetModules();
	});

	test('Should return default values', async () => {
		const argv = await runCommand(['-b', '5']);
		console.log(argv);
		expect(argv).toEqual(
			expect.objectContaining({
				b: 5,
				l: 10,
				s: false,
				n: 'Multiplication-table',
				d: 'outputs',
			})
		);
	});

	test('should return configuration with custom values', async () => {
		const argv = await runCommand([
			'-b',
			'10',
			'-l',
			'10',
			'-s',
			'-n',
			'custom-name',
			'-d',
			'custom-dir',
		]);
		expect(argv).toEqual(
			expect.objectContaining({
				b: 10,
				l: 10,
				s: true,
				n: 'custom-name',
				d: 'custom-dir',
			})
		);
	});
});

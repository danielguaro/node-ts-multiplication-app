import yargs from 'yargs';
import { hideBin } from 'yargs/helpers'; // Util para ocultar el bin folder que se estaría mostrando en consola

export const yarg = yargs(hideBin(process.argv))
	.options('b', {
		alias: 'base',
		type: 'number',
		demandOption: true,
		describe: 'Multiplication table base',
	}) // Si quiero definir opciones, agregarle alias, el tipo, si son requeridas (en el json) entre otras opciones
	.option('l', {
		alias: 'limit',
		type: 'number',
		default: 10,
		describe: 'Multiplication table limit',
	})
	.option('s', {
		alias: 'show',
		type: 'boolean',
		default: false,
		describe: 'show multiplication table',
	})
	.option('n', {
		alias: 'name',
		type: 'string',
		default: 'Multiplication-table',
		describe: 'File name',
	})
	.option('d', {
		alias: 'destination',
		type: 'string',
		default: 'outputs',
		describe: 'File destination',
	})
	.check((argv, options) => {
		// Argv sería un objeto con los alias de cada opción

		if (argv.b < 1) throw 'Error: base must be greater than 0';
		return true;
	}) // Hacer una validación, la cual recibe dos parametros
	.parseSync(); // pude haber colocado .parse() pero eso sería para peticiones q pueden ser tanto sincronas como asincronas y como en este caso se q es sincrono, por eso uso este método

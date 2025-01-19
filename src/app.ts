import { yarg } from './config/plugins/yargs.plugin';
import { ServerApp } from './presentation/server-app';

// console.log(yarg); // Con esto ahora puedo acceder a las flags que tengo definidas en mi package.json mucho mas facil, ejemplos si quiero ingresar a b (que es una flag), solo coloc
// console.log(yarg.b); // 10

(async () => {
	await main();
})();

async function main() {
	const {
		b: base,
		l: limit,
		s: showTable,
		n: fileName,
		d: fileDestination,
	} = yarg;
	ServerApp.run({ base, limit, showTable, fileName, fileDestination });
}

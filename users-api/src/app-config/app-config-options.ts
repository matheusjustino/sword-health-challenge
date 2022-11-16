import { existsSync } from 'fs';

const envFilePath = `${process.cwd()}/.env`;
const configOptions = {
	isGlobal: true,
	envFilePath: null,
};

if (existsSync(envFilePath)) {
	configOptions.envFilePath = envFilePath;
}

export { configOptions };

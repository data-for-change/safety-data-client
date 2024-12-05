const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const args = process.argv.slice(2);
const folder = args[0] || '';
const folderEnvironment = args[1] || '';

const mergeEnvs = (envFiles) => envFiles.reduce((acc, envFile) => {
    const envPath = path.resolve(process.cwd(), envFile);
    if (fs.existsSync(envPath)) return { ...acc, ...dotenv.parse(fs.readFileSync(envPath)) };
    return acc;
}, {});

const envPaths = [ path.resolve(__dirname, 'Main','.env.Base') ];

if(folder) envPaths.push(path.resolve(__dirname, folder, '.env.Base'))
if(folder && folderEnvironment) envPaths.push(path.resolve(__dirname, folder, `.env.${folderEnvironment}`))

const finalEnv = mergeEnvs(envPaths);
console.log('config file:', finalEnv);
fs.writeFileSync('.env', Object.entries(finalEnv).map(([key, value]) => `${key}=${value}`).join('\n'));
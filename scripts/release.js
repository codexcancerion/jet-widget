import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const packageJsonPath = path.join(rootDir, 'package.json');
const releaseDir = path.join(rootDir, 'release');
const distDir = path.join(rootDir, 'dist');

// 1. Read package.json version
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const version = packageJson.version;
const versionDirName = `v${version}`;
const targetReleaseDir = path.join(releaseDir, versionDirName);

console.log(`Starting release process for version ${versionDirName}...`);

// 2. Remove all folders and files inside release/
if (fs.existsSync(releaseDir)) {
  const files = fs.readdirSync(releaseDir);
  for (const file of files) {
    const filePath = path.join(releaseDir, file);
    fs.rmSync(filePath, { recursive: true, force: true });
    console.log(`Removed: ${filePath}`);
  }
} else {
  fs.mkdirSync(releaseDir, { recursive: true });
}

// 3. Build the project
console.log('Building project...');
execSync('bun run build', { cwd: rootDir, stdio: 'inherit' });

// 4. Copy dist/ to release/v<version>/
console.log(`Copying built files to ${targetReleaseDir}...`);
fs.mkdirSync(targetReleaseDir, { recursive: true });

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

copyRecursiveSync(distDir, targetReleaseDir);
console.log(`Release ${versionDirName} created successfully at ${targetReleaseDir}`);

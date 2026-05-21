import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const defaultIndexPath = resolve(root, 'index.html')
const spanishIndexPath = resolve(root, 'versions/index.es.html')
const englishIndexPath = resolve(root, 'versions/index.en.html')

const nodeBin = '/home/queso/.nvm/versions/node/v22.12.0/bin'
const env = { ...process.env, PATH: `${nodeBin}:${process.env.PATH ?? ''}` }

const mode = process.argv[2] ?? 'all'

const renderTargets = {
  es: {
    sourcePath: spanishIndexPath,
    outputPath: 'renders/le-mise-real-showcase.es.mp4',
  },
  en: {
    sourcePath: englishIndexPath,
    outputPath: 'renders/le-mise-real-showcase.en.mp4',
  },
}

const run = (command) => {
  execSync(command, {
    cwd: root,
    env,
    stdio: 'inherit',
  })
}

const renderVersion = ({ sourcePath, outputPath }) => {
  const source = readFileSync(sourcePath, 'utf8')
  writeFileSync(defaultIndexPath, source)
  run('npx hyperframes lint')
  run('npx hyperframes validate')
  run('npx hyperframes inspect')
  run(`npx hyperframes render --output ${outputPath}`)
}

const originalDefault = readFileSync(defaultIndexPath, 'utf8')

try {
  if (mode === 'es') {
    renderVersion(renderTargets.es)
  } else if (mode === 'en') {
    renderVersion(renderTargets.en)
  } else {
    renderVersion(renderTargets.es)
    renderVersion(renderTargets.en)
  }
} finally {
  writeFileSync(defaultIndexPath, originalDefault)
}

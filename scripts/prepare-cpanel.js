const fs = require('fs')
const path = require('path')

const root = process.cwd()
const standaloneDir = path.join(root, '.next', 'standalone')
const deployDir = path.join(root, 'deploy')

function copyDir(source, target) {
  if (!fs.existsSync(source)) {
    throw new Error(`Missing source: ${path.relative(root, source)}`)
  }

  fs.rmSync(target, { recursive: true, force: true })
  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.cpSync(source, target, { recursive: true })
}

if (!fs.existsSync(standaloneDir)) {
  throw new Error('Missing .next/standalone. Run `npm run build` first.')
}

// 1. Copy standalone contents into standalone/.next/static
copyDir(path.join(root, '.next', 'static'), path.join(standaloneDir, '.next', 'static'))
copyDir(path.join(root, 'public'), path.join(standaloneDir, 'public'))

// 2. Create flat deploy/ folder (ready to upload to cPanel root)
console.log('Creating deploy/ folder...')
fs.rmSync(deployDir, { recursive: true, force: true })
fs.cpSync(standaloneDir, deployDir, { recursive: true })

// 3. Copy content directory if exists
const contentDir = path.join(root, 'content')
if (fs.existsSync(contentDir)) {
  fs.cpSync(contentDir, path.join(deployDir, 'content'), { recursive: true })
  console.log('Copied content/ directory.')
}

console.log('')
console.log('=== DEPLOYMENT READY ===')
console.log(`Deploy folder: ${deployDir}`)
console.log('')
console.log('Upload ALL contents of deploy/ folder to cPanel:')
console.log('  public_html/testsipinjam.sika.web.id/')
console.log('')
console.log('Startup file di cPanel: server.js')
console.log('========================')

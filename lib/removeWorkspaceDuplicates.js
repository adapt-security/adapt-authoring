import fs from 'fs'
import path from 'path'

const LOCAL_MOD_PATH = './local_adapt_modules'

function globToRegExp (glob) {
  let rex = glob.replace(/\*\*/g, '.*')
  rex = rex.replace(/\*/g, '[^/]*')
  rex = rex.replace(/\\\\/g, '\/')
  rex = rex.replace(/\./g, '\\.')
  rex = rex.replace(/\//g, '\\/')
  rex = `^${rex}$`
  return new RegExp(rex, 'gm')
}

function unix (path) {
  return path.replace(/\\/g, '/')
}

async function getAllSubDirs (dir, depth = Number.MAX_SAFE_INTEGER) {
  async function collectPaths (dir, root = dir, level = 0) {
    const subs = await fs.promises.readdir(dir)
    const paths = []
    for (let sub of subs) {
      sub = path.resolve(dir, sub)
      const relativeSub = unix(sub).replace(root + '/', '')
      const stat = await fs.promises.stat(sub)
      if (!stat || !stat.isDirectory()) continue
      paths.push(relativeSub)
      if (depth === level) continue
      paths.push(...await collectPaths(sub, root, level + 1))
    }
    return paths
  }
  const root = unix(path.resolve(process.cwd(), dir))
  return collectPaths(root)
}

async function globs (glob, { cwd = process.cwd(), depth } = {}) {
  const subDirs = await getAllSubDirs(cwd, depth)
  const rex = globToRegExp(glob)
  return subDirs.filter(subDir => rex.test(subDir))
}

async function cleanUpSubDependencies () {
  try {
    await fs.promises.stat(LOCAL_MOD_PATH)
  } catch (e) {
    if (e.code === 'ENOENT') return
  }
  const localModuleNames = await globs('*', { cwd: LOCAL_MOD_PATH, depth: 1 })
  const subModules = await globs('adapt-authoring*/node_modules/adapt-authoring*', { cwd: 'node_modules/', depth: 3 })
  for (const subModule of subModules) {
    const subModuleName = subModule.split('/').pop()
    if (!localModuleNames.includes(subModuleName)) continue
    console.warn(`Removing erroneous sub dependency ${subModule}`)
    await fs.promises.rm(`node_modules/${subModule}`, { recursive: true })
  }
}

cleanUpSubDependencies().catch(e => console.log(`Failed to run cleanUpSubDependencies, ${e}`))

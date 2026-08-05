import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const root = process.cwd()
const localeRoot = path.join(root, 'src/shared/locales')
const sourceRoot = path.join(root, 'src')
const sourceLocale = 'en'
const locales = ['en', 'fa', 'ar', 'he', 'fr', 'es']
const modules = ['common', 'menu', 'layout', 'components', 'pages', 'features']
const forbiddenPrefixes = ['variants.', 'features.advanced-ui.', 'features.ui-elements.']

const readJson = file => JSON.parse(fs.readFileSync(file, 'utf8'))

function flatten(value, prefix = '', result = []) {
  for (const [key, child] of Object.entries(value)) {
    const fullKey = prefix ? `${prefix}.${key}` : key

    if (child && typeof child === 'object' && !Array.isArray(child)) {
      flatten(child, fullKey, result)
    }
    else {
      result.push(fullKey)
    }
  }

  return result
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name)
    return entry.isDirectory() ? walk(entryPath) : [entryPath]
  })
}

const errors = []
const sourceKeys = new Set()
const localeKeys = new Map()

for (const moduleName of modules) {
  const sourceFile = path.join(localeRoot, sourceLocale, `${moduleName}.json`)
  const sourceMessages = readJson(sourceFile)
  const topLevelKeys = Object.keys(sourceMessages)

  if (topLevelKeys.length !== 1 || topLevelKeys[0] !== moduleName) {
    errors.push(`${sourceFile} must contain only the ${moduleName}.* namespace`)
  }

  const expectedKeys = new Set(flatten(sourceMessages))
  expectedKeys.forEach(key => sourceKeys.add(key))

  for (const locale of locales) {
    const localeFile = path.join(localeRoot, locale, `${moduleName}.json`)
    const messages = readJson(localeFile)
    const keys = new Set(flatten(messages))
    const localeTopLevelKeys = Object.keys(messages)

    if (localeTopLevelKeys.length !== 1 || localeTopLevelKeys[0] !== moduleName) {
      errors.push(`${localeFile} must contain only the ${moduleName}.* namespace`)
    }

    const missing = [...expectedKeys].filter(key => !keys.has(key))
    const unexpected = [...keys].filter(key => !expectedKeys.has(key))

    if (missing.length)
      errors.push(`${locale}/${moduleName} missing: ${missing.join(', ')}`)
    if (unexpected.length) {
      errors.push(`${locale}/${moduleName} unexpected: ${unexpected.join(', ')}`)
    }

    if (!localeKeys.has(locale))
      localeKeys.set(locale, new Set())
    keys.forEach(key => localeKeys.get(locale).add(key))
  }
}

const sourceFiles = walk(sourceRoot).filter(
  file => /\.(?:ts|vue)$/.test(file) && !file.includes(`${path.sep}__tests__${path.sep}`),
)
const sourceText = sourceFiles.map(file => fs.readFileSync(file, 'utf8')).join('\n')
const keyReferencePattern
  = /['"`]((?:common|menu|layout|components|pages|features)\.[\w.${}-]+)['"`]/g
const referencedKeys = new Set()

for (const match of sourceText.matchAll(keyReferencePattern)) {
  const key = match[1]
  referencedKeys.add(key)

  if (!key.includes('${') && !sourceKeys.has(key)) {
    errors.push(`Source references unknown translation key: ${key}`)
  }
}

for (const prefix of forbiddenPrefixes) {
  const escapedPrefix = prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const legacyReferencePattern = new RegExp(`['\"\\x60]${escapedPrefix}`)

  if (legacyReferencePattern.test(sourceText)) {
    errors.push(`Source still references legacy namespace: ${prefix}`)
  }
}

if (process.argv.includes('--report-unused')) {
  const candidates = [...sourceKeys].filter((key) => {
    if (sourceText.includes(key))
      return false

    return ![...referencedKeys].some(
      reference => reference.includes('${') && key.startsWith(reference.split('${')[0]),
    )
  })

  process.stdout.write(`Potentially unused static keys (${candidates.length}):\n`)
  candidates.forEach(key => process.stdout.write(`- ${key}\n`))
}

if (errors.length) {
  console.error(`Localization validation failed with ${errors.length} error(s):`)
  errors.forEach(error => console.error(`- ${error}`))
  process.exitCode = 1
}
else {
  process.stdout.write(
    `Localization validation passed: ${sourceKeys.size} keys across ${locales.length} locales.\n`,
  )
}

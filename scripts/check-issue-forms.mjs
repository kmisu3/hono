import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { parse } from 'yaml'

const templateDirectory = '.github/ISSUE_TEMPLATE'
const formTypes = new Set(['checkboxes', 'dropdown', 'input', 'markdown', 'textarea', 'upload'])
const errors = []

const requireText = (value, path) => {
  if (typeof value !== 'string' || value.length === 0) {
    errors.push(`${path}: 1文字以上の文字列が必要です`)
  }
}

const files = readdirSync(templateDirectory)
  .filter((file) => file.endsWith('.yml') && file !== 'config.yml')
  .sort()

for (const file of files) {
  const path = join(templateDirectory, file)
  const form = parse(readFileSync(path, 'utf8'))

  if (!form || typeof form !== 'object' || Array.isArray(form)) {
    errors.push(`${path}: オブジェクト形式のIssue Formが必要です`)
    continue
  }

  requireText(form?.name, `${path}.name`)
  requireText(form?.description, `${path}.description`)

  if ('title' in form) {
    requireText(form.title, `${path}.title`)
  }

  if (!Array.isArray(form?.body) || form.body.length === 0) {
    errors.push(`${path}.body: 1件以上の入力項目が必要です`)
    continue
  }

  const ids = new Set()

  form.body.forEach((item, index) => {
    const itemPath = `${path}.body[${index}]`

    if (!formTypes.has(item?.type)) {
      errors.push(`${itemPath}.type: 未対応の入力種別です`)
    }

    if (item?.id !== undefined) {
      if (!/^[a-zA-Z0-9_-]+$/.test(item.id)) {
        errors.push(`${itemPath}.id: 英数字、ハイフン、アンダースコアだけを使用してください`)
      } else if (ids.has(item.id)) {
        errors.push(`${itemPath}.id: ${item.id}が重複しています`)
      }
      ids.add(item.id)
    }

    if (item?.type === 'markdown') {
      requireText(item?.attributes?.value, `${itemPath}.attributes.value`)
    } else {
      requireText(item?.attributes?.label, `${itemPath}.attributes.label`)
    }

    if (item?.type === 'dropdown' || item?.type === 'checkboxes') {
      if (!Array.isArray(item?.attributes?.options) || item.attributes.options.length === 0) {
        errors.push(`${itemPath}.attributes.options: 1件以上の選択肢が必要です`)
      }
    }
  })
}

if (errors.length > 0) {
  console.error(errors.join('\n'))
  process.exit(1)
}

console.log(`Validated ${files.length} Issue Forms`)

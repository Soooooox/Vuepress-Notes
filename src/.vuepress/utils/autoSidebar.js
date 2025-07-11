// .vuepress/utils/autoSidebar.js
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// 获取当前文件路径（ESM 兼容写法）
const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * 格式化显示文本
 * @param {string} filename 
 * @returns {string}
 */
function formatText(filename) {
  return filename // 保持原始文件名，不去除任何前缀
}

/**
 * Windows风格的文件排序函数 - 数字开头的排在前面
 * @param {string} a 
 * @param {string} b 
 * @returns {number}
 */
function windowsSort(a, b) {
  // 检查是否以数字开头
  const aStartsWithNumber = /^\d/.test(a)
  const bStartsWithNumber = /^\d/.test(b)
  
  // 如果一个以数字开头，另一个不是，数字开头的排在前面
  if (aStartsWithNumber && !bStartsWithNumber) {
    return -1
  }
  if (!aStartsWithNumber && bStartsWithNumber) {
    return 1
  }
  
  // 如果都是数字开头或都不是数字开头，使用正常的数字排序
  return a.localeCompare(b, undefined, { 
    numeric: true, 
    sensitivity: 'base' 
  })
}

/**
 * 递归生成多层目录的侧边栏配置
 * @param {string} dir 目标目录（相对于 docs）
 * @returns {Array}
 */
export function getNestedSidebar(dir = 'SecondBrain') {
  const docsPath = path.join(__dirname, '../..') // 定位到 docs 目录
  const fullPath = path.join(docsPath, dir)
  
  function buildSidebarItem(currentPath, relativePath = '') {
    try {
      const items = fs.readdirSync(currentPath, { withFileTypes: true })
      
      // 处理文件
      const files = items
        .filter(item => item.isFile() && item.name.endsWith('.md') && !item.name.startsWith('README'))
        .map(file => ({
          text: formatText(file.name.replace('.md', '')),
          link: `/${dir}${relativePath}/${file.name.replace('.md', '')}`,
          icon: 'file' // 文件图标
        }))
      
      // 处理文件夹
      const folders = items
        .filter(item => item.isDirectory())
        .map(folder => {
          const folderPath = path.join(currentPath, folder.name)
          const newRelativePath = relativePath ? `${relativePath}/${folder.name}` : `/${folder.name}`
          const folderItem = buildSidebarItem(folderPath, newRelativePath)
          
          return {
            text: folder.name,
            icon: 'folder', // 文件夹图标
            collapsible: true,
            children: folderItem.children || []
          }
        })
      
      // 合并文件和文件夹，然后一起排序
      const allItems = [...files, ...folders]
        .sort((a, b) => windowsSort(a.text, b.text))
      
      return { children: allItems }
    } catch (error) {
      console.error(`Error reading directory ${currentPath}:`, error)
      return { children: [] }
    }
  }
  
  const result = buildSidebarItem(fullPath)
  
  return [
    { 
      text: '首页', 
      link: '/SecondBrain/',
      icon: 'house' // 首页图标
    },
    ...result.children
  ]
}
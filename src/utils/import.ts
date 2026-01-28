import { Editor } from '@tiptap/core'

/**
 * Import JSON content into the editor
 * @param editor - The TipTap editor instance
 * @param jsonContent - JSON string or object to import
 * @returns true if successful, false otherwise
 */
export const importFromJSON = (editor: Editor, jsonContent: string | object): boolean => {
  try {
    let json: any
    
    if (typeof jsonContent === 'string') {
      json = JSON.parse(jsonContent)
    } else {
      json = jsonContent
    }

    // Validate that it's a valid TipTap document structure
    if (!json || typeof json !== 'object') {
      console.error('Invalid JSON format')
      return false
    }

    // Check if it has the expected TipTap document structure
    if (json.type !== 'doc') {
      console.error('JSON does not appear to be a valid TipTap document')
      return false
    }

    // Set the content in the editor (this replaces the current state)
    editor.commands.setContent(json, false, {
      preserveWhitespace: 'full',
    })
    return true
  } catch (error) {
    console.error('Error importing JSON:', error)
    return false
  }
}

/**
 * Read a file and return its content as text
 * @param file - File object to read
 * @returns Promise that resolves to file content as string
 */
export const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (event) => {
      if (event.target?.result) {
        resolve(event.target.result as string)
      } else {
        reject(new Error('Failed to read file'))
      }
    }
    
    reader.onerror = () => {
      reject(new Error('Error reading file'))
    }
    
    reader.readAsText(file)
  })
}

/**
 * Handle file input and import JSON
 * @param editor - The TipTap editor instance
 * @param file - File object to import
 * @returns Promise that resolves to true if successful
 */
export const importFile = async (editor: Editor, file: File): Promise<boolean> => {
  try {
    // Check file type
    if (!file.name.endsWith('.json') && file.type !== 'application/json') {
      console.error('File must be a JSON file')
      return false
    }

    const content = await readFileAsText(file)
    return importFromJSON(editor, content)
  } catch (error) {
    console.error('Error importing file:', error)
    return false
  }
}

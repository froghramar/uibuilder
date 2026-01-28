import { Editor } from '@tiptap/core'
import { TextSelection } from '@tiptap/pm/state'
import { useCallback, useEffect, useState } from 'react'
import { Node as ProseMirrorNode } from '@tiptap/pm/model'

export const useComponentSelection = (editor: Editor | null) => {
  const [selectedNode, setSelectedNode] = useState<ProseMirrorNode | null>(null)
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)

  useEffect(() => {
    if (!editor) {
      setSelectedNode(null)
      setSelectedNodeId(null)
      return
    }

    const handleSelectionUpdate = () => {
      const { state } = editor
      const { selection } = state
      const { $anchor } = selection

      // Find the selected node
      let node: ProseMirrorNode | null = null
      let nodeId: string | null = null

      // List of UI component node types
      const uiComponentTypes = ['button', 'input', 'textarea', 'select', 'card', 'container']

      // For atom nodes, they are children of paragraphs
      // Check the parent's children to find component nodes
      const parent = $anchor.parent
      if (parent) {
        parent.forEach((childNode, offset) => {
          if (uiComponentTypes.includes(childNode.type.name)) {
            node = childNode
            nodeId = childNode.attrs.id || null
          }
        })
      }

      // If not found in parent's children, check parent nodes themselves (for nested components like Card/Container)
      if (!node) {
        for (let depth = $anchor.depth; depth > 0; depth--) {
          const nodeAtDepth = $anchor.node(depth)
          const nodeTypeName = nodeAtDepth.type.name
          
          // Check if this is a UI component (not doc, paragraph, or other standard nodes)
          if (uiComponentTypes.includes(nodeTypeName)) {
            node = nodeAtDepth
            nodeId = nodeAtDepth.attrs.id || null
            break
          }
        }
      }

      // Also check nodes at the exact position (for atom nodes)
      const pos = $anchor.pos
      if (!node && pos >= 0 && pos < state.doc.content.size) {
        const nodeAtPos = state.doc.nodeAt(pos)
        if (nodeAtPos && uiComponentTypes.includes(nodeAtPos.type.name)) {
          node = nodeAtPos
          nodeId = nodeAtPos.attrs.id || null
        }
      }

      setSelectedNode(node)
      setSelectedNodeId(nodeId)
    }

    editor.on('selectionUpdate', handleSelectionUpdate)
    editor.on('transaction', handleSelectionUpdate)
    
    // Initial check
    handleSelectionUpdate()

    return () => {
      editor.off('selectionUpdate', handleSelectionUpdate)
      editor.off('transaction', handleSelectionUpdate)
    }
  }, [editor])

  const selectNode = useCallback((nodeId: string) => {
    if (!editor) return

    const { state } = editor
    const { doc } = state

    let targetPos: number | null = null
    doc.descendants((node, pos) => {
      if (node.attrs.id === nodeId) {
        targetPos = pos
        return false
      }
    })

    if (targetPos !== null) {
      const tr = state.tr
      const selection = TextSelection.near(doc.resolve(targetPos))
      tr.setSelection(selection)
      editor.view.dispatch(tr)
    }
  }, [editor])

  return {
    selectedNode,
    selectedNodeId,
    selectNode,
  }
}

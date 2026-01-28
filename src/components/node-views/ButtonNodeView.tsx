import { NodeViewWrapper } from '@tiptap/react'
import { Editor } from '@tiptap/core'
import { Node as ProseMirrorNode } from '@tiptap/pm/model'
import { TextSelection } from '@tiptap/pm/state'
import { useCallback } from 'react'
import clsx from 'clsx'
import './ButtonNodeView.css'

interface ButtonNodeViewProps {
  node: ProseMirrorNode
  updateAttributes: (attrs: Record<string, any>) => void
  selected?: boolean
  getPos?: () => number
  editor: Editor
}

const ButtonNodeView = ({ node, updateAttributes, selected = false, getPos, editor }: ButtonNodeViewProps) => {

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (!editor || !getPos) return

    const pos = getPos()
    if (pos === undefined || pos === null) return

    const { state } = editor
    const { doc } = state
    
    // For atom nodes, we need to select the node itself, not a text position
    // Try to create a selection that includes the node
    try {
      const resolvedPos = doc.resolve(pos)
      // For atom nodes, select right before or after them
      const nodeAtPos = doc.nodeAt(pos)
      
      if (nodeAtPos && nodeAtPos.type.name === 'button') {
        // Select the node by creating a selection that spans it
        const selection = TextSelection.create(doc, pos, pos + nodeAtPos.nodeSize)
        const tr = state.tr.setSelection(selection)
        editor.view.dispatch(tr)
      } else {
        // Fallback: select near the position
        const selection = TextSelection.near(resolvedPos)
        const tr = state.tr.setSelection(selection)
        editor.view.dispatch(tr)
      }
    } catch (error) {
      // Fallback: select near the position
      const resolvedPos = doc.resolve(pos)
      const selection = TextSelection.near(resolvedPos)
      const tr = state.tr.setSelection(selection)
      editor.view.dispatch(tr)
    }
  }, [editor, getPos])
  const { text, variant, size, disabled, onClick } = node.attrs

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    updateAttributes({ text: e.target.value })
  }, [updateAttributes])

  const buttonClasses = clsx(
    'ui-button',
    `ui-button--${variant}`,
    `ui-button--${size}`,
    {
      'ui-button--disabled': disabled,
      'ui-button--selected': selected,
    }
  )

  return (
    <NodeViewWrapper 
      className="ui-button-wrapper" 
      data-selected={selected}
      data-id={node.attrs.id}
      data-type="ui-component"
      onClick={handleClick}
    >
      <button
        className={buttonClasses}
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation()
          handleClick(e)
          if (onClick) {
            // In a real app, this would execute the onClick handler
            // onClick handler execution would go here
          }
        }}
        contentEditable={false}
      >
        {selected ? (
          <input
            type="text"
            value={text}
            onChange={handleTextChange}
            className="ui-button-input"
            onClick={(e) => e.stopPropagation()}
            onFocus={(e) => e.stopPropagation()}
          />
        ) : (
          text
        )}
      </button>
    </NodeViewWrapper>
  )
}

export default ButtonNodeView

import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'
import { Editor } from '@tiptap/core'
import { Node as ProseMirrorNode } from '@tiptap/pm/model'
import { TextSelection } from '@tiptap/pm/state'
import { useCallback } from 'react'
import clsx from 'clsx'
import './CardNodeView.css'

interface CardNodeViewProps {
  node: ProseMirrorNode
  updateAttributes: (attrs: Record<string, any>) => void
  selected?: boolean
  getPos?: () => number
  editor: Editor
}

const CardNodeView = ({ node, updateAttributes, selected = false, getPos, editor }: CardNodeViewProps) => {

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    if (!editor || !getPos) return

    const pos = getPos()
    if (pos === undefined || pos === null) return

    const { state } = editor
    const { doc } = state
    const selection = TextSelection.near(doc.resolve(pos))
    const tr = state.tr.setSelection(selection)
    editor.view.dispatch(tr)
  }, [editor, getPos])
  const { title, padding, shadow } = node.attrs

  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    updateAttributes({ title: e.target.value })
  }, [updateAttributes])

  return (
    <NodeViewWrapper 
      className={clsx('ui-card-wrapper', {
        'ui-card-wrapper--selected': selected,
        [`ui-card-wrapper--padding-${padding}`]: padding,
        'ui-card-wrapper--shadow': shadow,
      })}
      data-selected={selected}
      data-id={node.attrs.id}
      data-type="ui-component"
      onClick={handleClick}
    >
      <div className="ui-card">
        <div className="ui-card-header">
          {selected ? (
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="ui-card-title-edit"
              onClick={(e) => e.stopPropagation()}
              onFocus={(e) => e.stopPropagation()}
            />
          ) : (
            <h3 className="ui-card-title">{title}</h3>
          )}
        </div>
        <div className="ui-card-content">
          <NodeViewContent />
        </div>
      </div>
    </NodeViewWrapper>
  )
}

export default CardNodeView

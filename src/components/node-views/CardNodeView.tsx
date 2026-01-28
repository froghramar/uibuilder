import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'
import { Node as ProseMirrorNode } from '@tiptap/pm/model'
import { useCallback } from 'react'
import clsx from 'clsx'
import './CardNodeView.css'

interface CardNodeViewProps {
  node: ProseMirrorNode
  updateAttributes: (attrs: Record<string, any>) => void
  selected?: boolean
}

const CardNodeView = ({ node, updateAttributes, selected = false }: CardNodeViewProps) => {
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

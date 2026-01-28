import { NodeViewWrapper } from '@tiptap/react'
import { Node as ProseMirrorNode } from '@tiptap/pm/model'
import { useCallback } from 'react'
import clsx from 'clsx'
import './TextAreaNodeView.css'

interface TextAreaNodeViewProps {
  node: ProseMirrorNode
  updateAttributes: (attrs: Record<string, any>) => void
  selected?: boolean
}

const TextAreaNodeView = ({ node, updateAttributes, selected = false }: TextAreaNodeViewProps) => {
  const { label, placeholder, value, rows, required, disabled } = node.attrs

  const handleValueChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateAttributes({ value: e.target.value })
  }, [updateAttributes])

  const handleLabelChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    updateAttributes({ label: e.target.value })
  }, [updateAttributes])

  return (
    <NodeViewWrapper 
      className={clsx('ui-textarea-wrapper', { 'ui-textarea-wrapper--selected': selected })}
      data-selected={selected}
      data-id={node.attrs.id}
      data-type="ui-component"
    >
      <div className="ui-textarea-container">
        {selected ? (
          <input
            type="text"
            value={label}
            onChange={handleLabelChange}
            className="ui-textarea-label-edit"
            placeholder="Label"
            onClick={(e) => e.stopPropagation()}
            onFocus={(e) => e.stopPropagation()}
          />
        ) : (
          <label className="ui-textarea-label">
            {label}
            {required && <span className="ui-textarea-required">*</span>}
          </label>
        )}
        <textarea
          placeholder={placeholder}
          value={value}
          rows={rows}
          required={required}
          disabled={disabled}
          onChange={handleValueChange}
          className={clsx('ui-textarea', {
            'ui-textarea--disabled': disabled,
          })}
          contentEditable={false}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </NodeViewWrapper>
  )
}

export default TextAreaNodeView

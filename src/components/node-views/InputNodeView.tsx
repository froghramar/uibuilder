import { NodeViewWrapper } from '@tiptap/react'
import { Editor } from '@tiptap/core'
import { Node as ProseMirrorNode } from '@tiptap/pm/model'
import { TextSelection } from '@tiptap/pm/state'
import { useCallback } from 'react'
import clsx from 'clsx'
import './InputNodeView.css'

interface InputNodeViewProps {
  node: ProseMirrorNode
  updateAttributes: (attrs: Record<string, any>) => void
  selected?: boolean
  getPos?: () => number
  editor: Editor
}

const InputNodeView = ({ node, updateAttributes, selected = false, getPos, editor }: InputNodeViewProps) => {

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
  const { label, placeholder, value, type, required, disabled } = node.attrs

  const handleValueChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    updateAttributes({ value: e.target.value })
  }, [updateAttributes])

  const handleLabelChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    updateAttributes({ label: e.target.value })
  }, [updateAttributes])

  return (
    <NodeViewWrapper 
      className={clsx('ui-input-wrapper', { 'ui-input-wrapper--selected': selected })}
      data-selected={selected}
      data-id={node.attrs.id}
      data-type="ui-component"
      onClick={handleClick}
    >
      <div className="ui-input-container">
        {selected ? (
          <input
            type="text"
            value={label}
            onChange={handleLabelChange}
            className="ui-input-label-edit"
            placeholder="Label"
            onClick={(e) => e.stopPropagation()}
            onFocus={(e) => e.stopPropagation()}
          />
        ) : (
          <label className="ui-input-label">
            {label}
            {required && <span className="ui-input-required">*</span>}
          </label>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          required={required}
          disabled={disabled}
          onChange={handleValueChange}
          className={clsx('ui-input', {
            'ui-input--disabled': disabled,
          })}
          contentEditable={false}
          onClick={(e) => {
            e.stopPropagation()
            handleClick(e)
          }}
        />
      </div>
    </NodeViewWrapper>
  )
}

export default InputNodeView

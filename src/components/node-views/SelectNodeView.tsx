import { NodeViewWrapper } from '@tiptap/react'
import { Editor } from '@tiptap/core'
import { Node as ProseMirrorNode } from '@tiptap/pm/model'
import { TextSelection } from '@tiptap/pm/state'
import { useCallback } from 'react'
import clsx from 'clsx'
import './SelectNodeView.css'

interface SelectNodeViewProps {
  node: ProseMirrorNode
  updateAttributes: (attrs: Record<string, any>) => void
  selected?: boolean
  getPos?: () => number
  editor: Editor
}

const SelectNodeView = ({ node, updateAttributes, selected = false, getPos, editor }: SelectNodeViewProps) => {

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
  const { label, options, value, required, disabled } = node.attrs
  const optionsArray = Array.isArray(options) ? options : ['Option 1', 'Option 2', 'Option 3']

  const handleValueChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    updateAttributes({ value: e.target.value })
  }, [updateAttributes])

  const handleLabelChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    updateAttributes({ label: e.target.value })
  }, [updateAttributes])

  const handleOptionsChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newOptions = e.target.value
      .split('\n')
      .map(opt => opt.trim())
      .filter(opt => opt.length > 0)
    updateAttributes({ options: newOptions.length > 0 ? newOptions : ['Option 1'] })
  }, [updateAttributes])

  return (
    <NodeViewWrapper 
      className={clsx('ui-select-wrapper', { 'ui-select-wrapper--selected': selected })}
      data-selected={selected}
      data-id={node.attrs.id}
      data-type="ui-component"
      onClick={handleClick}
    >
      <div className="ui-select-container">
        {selected ? (
          <>
            <input
              type="text"
              value={label}
              onChange={handleLabelChange}
              className="ui-select-label-edit"
              placeholder="Label"
              onClick={(e) => e.stopPropagation()}
              onFocus={(e) => e.stopPropagation()}
            />
            <textarea
              value={optionsArray.join('\n')}
              onChange={handleOptionsChange}
              className="ui-select-options-edit"
              placeholder="One option per line"
              rows={3}
              onClick={(e) => e.stopPropagation()}
              onFocus={(e) => e.stopPropagation()}
            />
          </>
        ) : (
          <label className="ui-select-label">
            {label}
            {required && <span className="ui-select-required">*</span>}
          </label>
        )}
        <select
          value={value}
          required={required}
          disabled={disabled}
          onChange={handleValueChange}
          className={clsx('ui-select', {
            'ui-select--disabled': disabled,
          })}
          contentEditable={false}
          onClick={(e) => e.stopPropagation()}
        >
          {optionsArray.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </NodeViewWrapper>
  )
}

export default SelectNodeView

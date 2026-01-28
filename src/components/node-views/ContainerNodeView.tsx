import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'
import { Editor } from '@tiptap/core'
import { Node as ProseMirrorNode } from '@tiptap/pm/model'
import { TextSelection } from '@tiptap/pm/state'
import { useCallback } from 'react'
import clsx from 'clsx'
import './ContainerNodeView.css'

interface ContainerNodeViewProps {
  node: ProseMirrorNode
  updateAttributes: (attrs: Record<string, any>) => void
  selected?: boolean
  getPos?: () => number
  editor: Editor
}

const ContainerNodeView = ({ node, selected = false, getPos, editor }: ContainerNodeViewProps) => {

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
  const { direction, gap, padding } = node.attrs

  return (
    <NodeViewWrapper 
      className={clsx('ui-container-wrapper', {
        'ui-container-wrapper--selected': selected,
        [`ui-container-wrapper--direction-${direction}`]: direction,
        [`ui-container-wrapper--gap-${gap}`]: gap,
        [`ui-container-wrapper--padding-${padding}`]: padding,
      })}
      data-selected={selected}
      data-id={node.attrs.id}
      data-type="ui-component"
      onClick={handleClick}
    >
      <div className="ui-container">
        <NodeViewContent />
      </div>
    </NodeViewWrapper>
  )
}

export default ContainerNodeView

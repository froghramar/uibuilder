import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'
import { Node as ProseMirrorNode } from '@tiptap/pm/model'
import clsx from 'clsx'
import './ContainerNodeView.css'

interface ContainerNodeViewProps {
  node: ProseMirrorNode
  updateAttributes: (attrs: Record<string, any>) => void
  selected?: boolean
}

const ContainerNodeView = ({ node, selected = false }: ContainerNodeViewProps) => {
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
    >
      <div className="ui-container">
        <NodeViewContent />
      </div>
    </NodeViewWrapper>
  )
}

export default ContainerNodeView

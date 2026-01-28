import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import ContainerNodeView from '../../components/node-views/ContainerNodeView'

export interface ContainerOptions {
  HTMLAttributes: Record<string, any>
}

export const ContainerExtension = Node.create<ContainerOptions>({
  name: 'container',
  group: 'block',
  content: 'block+',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: element => element.getAttribute('data-id'),
        renderHTML: attributes => {
          if (!attributes.id) {
            return {}
          }
          return {
            'data-id': attributes.id,
          }
        },
      },
      direction: {
        default: 'vertical',
        parseHTML: element => element.getAttribute('data-direction') || 'vertical',
        renderHTML: attributes => {
          return {
            'data-direction': attributes.direction || 'vertical',
          }
        },
      },
      gap: {
        default: 'medium',
        parseHTML: element => element.getAttribute('data-gap') || 'medium',
        renderHTML: attributes => {
          return {
            'data-gap': attributes.gap || 'medium',
          }
        },
      },
      padding: {
        default: 'medium',
        parseHTML: element => element.getAttribute('data-padding') || 'medium',
        renderHTML: attributes => {
          return {
            'data-padding': attributes.padding || 'medium',
          }
        },
      },
      className: {
        default: '',
        parseHTML: element => element.getAttribute('class'),
        renderHTML: attributes => {
          if (!attributes.className) {
            return {}
          }
          return {
            class: attributes.className,
          }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="ui-container"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes, node }) {
    return [
      'div',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-type': 'ui-container',
        'data-id': node.attrs.id,
        'data-direction': node.attrs.direction,
        'data-gap': node.attrs.gap,
        'data-padding': node.attrs.padding,
      }),
      0,
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(ContainerNodeView)
  },
})

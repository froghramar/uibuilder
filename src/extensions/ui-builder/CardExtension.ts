import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import CardNodeView from '../../components/node-views/CardNodeView'

export interface CardOptions {
  HTMLAttributes: Record<string, any>
}

export const CardExtension = Node.create<CardOptions>({
  name: 'card',
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
      title: {
        default: 'Card Title',
        parseHTML: element => element.getAttribute('data-title'),
        renderHTML: attributes => {
          if (!attributes.title) {
            return {}
          }
          return {
            'data-title': attributes.title,
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
      shadow: {
        default: true,
        parseHTML: element => element.getAttribute('data-shadow') !== 'false',
        renderHTML: attributes => {
          if (attributes.shadow === false) {
            return {
              'data-shadow': 'false',
            }
          }
          return {}
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
        tag: 'div[data-type="ui-card"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes, node }) {
    return [
      'div',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-type': 'ui-card',
        'data-id': node.attrs.id,
        'data-padding': node.attrs.padding,
        'data-shadow': node.attrs.shadow,
      }),
      [
        'div',
        { class: 'ui-card-header' },
        node.attrs.title,
      ],
      [
        'div',
        { class: 'ui-card-content' },
        0,
      ],
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(CardNodeView)
  },
})

import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import TextAreaNodeView from '../../components/node-views/TextAreaNodeView'

export interface TextAreaOptions {
  HTMLAttributes: Record<string, any>
}

export const TextAreaExtension = Node.create<TextAreaOptions>({
  name: 'textarea',
  group: 'block',
  atom: true,

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
      label: {
        default: 'Label',
        parseHTML: element => element.getAttribute('data-label'),
        renderHTML: attributes => {
          if (!attributes.label) {
            return {}
          }
          return {
            'data-label': attributes.label,
          }
        },
      },
      placeholder: {
        default: 'Enter text...',
        parseHTML: element => element.getAttribute('placeholder'),
        renderHTML: attributes => {
          if (!attributes.placeholder) {
            return {}
          }
          return {
            placeholder: attributes.placeholder,
          }
        },
      },
      value: {
        default: '',
        parseHTML: element => element.textContent || '',
        renderHTML: () => {
          return {}
        },
      },
      rows: {
        default: 4,
        parseHTML: element => parseInt(element.getAttribute('rows') || '4'),
        renderHTML: attributes => {
          return {
            rows: attributes.rows || 4,
          }
        },
      },
      required: {
        default: false,
        parseHTML: element => element.hasAttribute('required'),
        renderHTML: attributes => {
          if (!attributes.required) {
            return {}
          }
          return {
            required: attributes.required,
          }
        },
      },
      disabled: {
        default: false,
        parseHTML: element => element.hasAttribute('disabled'),
        renderHTML: attributes => {
          if (!attributes.disabled) {
            return {}
          }
          return {
            disabled: attributes.disabled,
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
        tag: 'div[data-type="ui-textarea"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes, node }) {
    return [
      'div',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-type': 'ui-textarea',
        'data-id': node.attrs.id,
      }),
      [
        'label',
        { 'data-label': node.attrs.label },
        node.attrs.label,
      ],
      [
        'textarea',
        {
          placeholder: node.attrs.placeholder,
          rows: node.attrs.rows,
          required: node.attrs.required,
          disabled: node.attrs.disabled,
        },
        node.attrs.value,
      ],
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(TextAreaNodeView)
  },
})

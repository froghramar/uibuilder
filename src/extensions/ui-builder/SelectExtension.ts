import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import SelectNodeView from '../../components/node-views/SelectNodeView'

export interface SelectOptions {
  HTMLAttributes: Record<string, any>
}

export const SelectExtension = Node.create<SelectOptions>({
  name: 'select',
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
      options: {
        default: ['Option 1', 'Option 2', 'Option 3'],
        parseHTML: element => {
          const optionsAttr = element.getAttribute('data-options')
          return optionsAttr ? JSON.parse(optionsAttr) : ['Option 1', 'Option 2', 'Option 3']
        },
        renderHTML: attributes => {
          return {
            'data-options': JSON.stringify(attributes.options || []),
          }
        },
      },
      value: {
        default: '',
        parseHTML: element => element.getAttribute('value') || '',
        renderHTML: attributes => {
          if (!attributes.value) {
            return {}
          }
          return {
            value: attributes.value,
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
        tag: 'div[data-type="ui-select"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes, node }) {
    const options = node.attrs.options || []
    return [
      'div',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-type': 'ui-select',
        'data-id': node.attrs.id,
      }),
      [
        'label',
        { 'data-label': node.attrs.label },
        node.attrs.label,
      ],
      [
        'select',
        {
          value: node.attrs.value,
          required: node.attrs.required,
          disabled: node.attrs.disabled,
        },
        ...options.map((option: string) => [
          'option',
          { value: option },
          option,
        ]),
      ],
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(SelectNodeView)
  },
})

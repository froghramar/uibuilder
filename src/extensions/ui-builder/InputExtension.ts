import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import InputNodeView from '../../components/node-views/InputNodeView'

export interface InputOptions {
  HTMLAttributes: Record<string, any>
}

export const InputExtension = Node.create<InputOptions>({
  name: 'input',
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
        parseHTML: element => element.getAttribute('value') || element.textContent,
        renderHTML: attributes => {
          if (!attributes.value) {
            return {}
          }
          return {
            value: attributes.value,
          }
        },
      },
      type: {
        default: 'text',
        parseHTML: element => element.getAttribute('type') || 'text',
        renderHTML: attributes => {
          return {
            type: attributes.type || 'text',
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
        tag: 'div[data-type="ui-input"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes, node }) {
    return [
      'div',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-type': 'ui-input',
        'data-id': node.attrs.id,
      }),
      [
        'label',
        { 'data-label': node.attrs.label },
        node.attrs.label,
      ],
      [
        'input',
        {
          type: node.attrs.type,
          placeholder: node.attrs.placeholder,
          value: node.attrs.value,
          required: node.attrs.required,
          disabled: node.attrs.disabled,
        },
      ],
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(InputNodeView)
  },
})

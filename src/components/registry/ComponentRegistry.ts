import { ComponentDefinition, ComponentCategory, ComponentRegistry as IComponentRegistry } from '../../types/component'

class ComponentRegistry implements IComponentRegistry {
  private components = new Map<string, ComponentDefinition>()

  register(definition: ComponentDefinition): void {
    this.components.set(definition.metadata.id, definition)
  }

  get(id: string): ComponentDefinition | undefined {
    // First try direct lookup by id
    let def = this.components.get(id)
    if (def) return def
    
    // If not found, try to find by extension name
    for (const component of this.components.values()) {
      if (component.extension.name === id) {
        return component
      }
    }
    
    return undefined
  }

  getAll(): ComponentDefinition[] {
    return Array.from(this.components.values())
  }

  getByCategory(category: ComponentCategory): ComponentDefinition[] {
    return this.getAll().filter(
      (def) => def.metadata.category === category
    )
  }
}

// Singleton instance
export const componentRegistry = new ComponentRegistry()

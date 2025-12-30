/**
 * Node style presets for DaisyUI
 * Provides predefined color schemes and styles for mindmap nodes
 */

export const NODE_COLORS = {
  primary: {
    name: 'Primary',
    bgClass: 'bg-primary',
    textClass: 'text-primary-content',
    borderClass: 'border-primary',
    bgValue: 'hsl(var(--p))',
    textValue: 'hsl(var(--pc))',
  },
  secondary: {
    name: 'Secondary',
    bgClass: 'bg-secondary',
    textClass: 'text-secondary-content',
    borderClass: 'border-secondary',
    bgValue: 'hsl(var(--s))',
    textValue: 'hsl(var(--sc))',
  },
  accent: {
    name: 'Accent',
    bgClass: 'bg-accent',
    textClass: 'text-accent-content',
    borderClass: 'border-accent',
    bgValue: 'hsl(var(--a))',
    textValue: 'hsl(var(--ac))',
  },
  neutral: {
    name: 'Neutral',
    bgClass: 'bg-neutral',
    textClass: 'text-neutral-content',
    borderClass: 'border-neutral',
    bgValue: 'hsl(var(--n))',
    textValue: 'hsl(var(--nc))',
  },
  info: {
    name: 'Info',
    bgClass: 'bg-info',
    textClass: 'text-info-content',
    borderClass: 'border-info',
    bgValue: 'hsl(var(--in))',
    textValue: 'hsl(var(--inc))',
  },
  success: {
    name: 'Success',
    bgClass: 'bg-success',
    textClass: 'text-success-content',
    borderClass: 'border-success',
    bgValue: 'hsl(var(--su))',
    textValue: 'hsl(var(--suc))',
  },
  warning: {
    name: 'Warning',
    bgClass: 'bg-warning',
    textClass: 'text-warning-content',
    borderClass: 'border-warning',
    bgValue: 'hsl(var(--wa))',
    textValue: 'hsl(var(--wac))',
  },
  error: {
    name: 'Error',
    bgClass: 'bg-error',
    textClass: 'text-error-content',
    borderClass: 'border-error',
    bgValue: 'hsl(var(--er))',
    textValue: 'hsl(var(--erc))',
  },
}

export const NODE_SHAPES = {
  rectangle: {
    name: 'Rectangle',
    roundedClass: 'rounded-lg',
    cssClass: 'node-shape-rectangle',
  },
  rounded: {
    name: 'Rounded',
    roundedClass: 'rounded-2xl',
    cssClass: 'node-shape-rounded',
  },
  pill: {
    name: 'Pill',
    roundedClass: 'rounded-full',
    cssClass: 'node-shape-pill',
  },
  diamond: {
    name: 'Diamond',
    roundedClass: 'rounded-none',
    cssClass: 'node-shape-diamond',
    transform: 'rotate(45deg)',
  },
}

export const NODE_STYLES = {
  solid: {
    name: 'Solid',
    bgClass: '',
    borderClass: 'border-2',
    shadowClass: 'shadow-md',
  },
  outline: {
    name: 'Outline',
    bgClass: 'bg-base-100',
    borderClass: 'border-2',
    shadowClass: 'shadow-sm',
  },
  ghost: {
    name: 'Ghost',
    bgClass: 'bg-opacity-10',
    borderClass: 'border-2 border-dashed',
    shadowClass: '',
  },
  filled: {
    name: 'Filled',
    bgClass: 'opacity-90',
    borderClass: 'border-0',
    shadowClass: 'shadow-lg',
  },
}

export const DEFAULT_NODE_STYLE = {
  color: 'neutral',
  shape: 'rounded',
  style: 'solid',
  textRotation: 'horizontal',
}

export const TEXT_ROTATION = {
  follow: {
    name: 'Horizontal',
    description: 'Text stays horizontal',
  },
  horizontal: {
    name: 'Follow Shape',
    description: 'Text rotates with shape',
  },
}

export function getNodeClasses(nodeStyle) {
  const { color, shape, style, textRotation } = nodeStyle || DEFAULT_NODE_STYLE

  const colorConfig = NODE_COLORS[color] || NODE_COLORS.neutral
  const shapeConfig = NODE_SHAPES[shape] || NODE_SHAPES.rounded
  const styleConfig = NODE_STYLES[style] || NODE_STYLES.solid

  const isDiamond = shape === 'diamond'
  const textShouldFollow = textRotation === 'follow'

  return {
    container: [
      'node',
      'transition-all',
      'duration-200',
      'min-w-[120px]',
      'max-w-[200px]',
      'p-3',
      'border',
      styleConfig.shadowClass,
      colorConfig.bgClass,
      styleConfig.bgClass,
      colorConfig.borderClass,
      styleConfig.borderClass,
      shapeConfig.roundedClass,
    ]
      .filter(Boolean)
      .join(' '),

    text: [
      'text-sm',
      'font-medium',
      'text-center',
      'whitespace-pre-wrap',
      'word-break',
      colorConfig.textClass,
    ]
      .filter(Boolean)
      .join(' '),

    label: colorConfig.textClass,

    isDiamond,
    textShouldFollow,
  }
}

export function reverseTransformRotation(nodeStyle) {
  const { shape, textRotation } = nodeStyle || DEFAULT_NODE_STYLE

  // Diamond is rotated +45deg via CSS
  // If textRotation is 'follow', counter-rotate with -45deg to keep text horizontal
  // If textRotation is 'horizontal', don't counter-rotate so text rotates with diamond
  if (shape === 'diamond' && textRotation === 'follow') {
    return 'rotate(-45deg)'
  }

  return ''
}

<template>
  <div
    :class="avatarClasses"
    class="avatar placeholder"
    :title="name || seed"
  >
    <div
      :class="[
        sizeClasses,
        'rounded-full ring ring-offset-base-100 ring-offset-2',
        {
          'ring-primary': ringColor === 'primary',
          'ring-0': !ringColor,
        },
      ]"
      :style="avatarStyle"
    >
      <img v-if="avatarUrl" :src="avatarUrl" :alt="name || 'Avatar'" />
      <span v-else class="text-xl">{{ initials }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { createAvatar } from '@dicebear/core'
import { avataaars, bottts, lorelei, personas } from '@dicebear/collection'

const props = defineProps({
  // Seed for avatar generation (username, email, or userId)
  seed: {
    type: String,
    required: true,
  },
  // Display name for fallback initials
  name: {
    type: String,
    default: '',
  },
  // Avatar style
  avatarStyle: {
    type: String,
    default: 'avataaars',
    validator: value =>
      ['avataaars', 'bottts', 'lorelei', 'personas'].includes(value),
  },
  // Size preset
  size: {
    type: String,
    default: 'md',
    validator: value => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value),
  },
  // Ring color
  ringColor: {
    type: String,
    default: null,
    validator: value => !value || ['primary', 'secondary', 'accent'].includes(value),
  },
})

const styleMap = {
  avataaars,
  bottts,
  lorelei,
  personas,
}

const avatarUrl = computed(() => {
  try {
    const avatar = createAvatar(styleMap[props.avatarStyle], {
      seed: props.seed,
      size: 128,
      // Avataaars specific options
      ...(props.avatarStyle === 'avataaars' && {
        backgroundColor: ['b6e3f4', 'c0aede', 'd1d4f9', 'ffd5dc', 'ffdfbf'],
      }),
    })

    return avatar.toDataUri()
  } catch (error) {
    console.error('Error generating avatar:', error)
    return null
  }
})

const initials = computed(() => {
  const displayName = props.name || props.seed || 'U'
  return displayName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const sizeClasses = computed(() => {
  const sizeMap = {
    xs: 'w-8 h-8',
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  }
  return sizeMap[props.size] || sizeMap.md
})

const avatarClasses = computed(() => {
  return ['online']
})

const avatarStyle = computed(() => {
  if (avatarUrl.value) return {}

  // Fallback gradient background based on seed
  const hue = props.seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 360
  return {
    background: `linear-gradient(135deg, hsl(${hue}, 70%, 60%), hsl(${(hue + 60) % 360}, 70%, 70%))`,
  }
})
</script>

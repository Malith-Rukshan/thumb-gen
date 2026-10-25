<template>
  <button
    :type="type"
    :class="['btn', variantClasses, sizeClasses]"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
  >
    <LoadingSpinner v-if="loading" size="sm" />
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import LoadingSpinner from "@/components/common/LoadingSpinner.vue";

interface Props {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  type: "button",
  disabled: false,
  loading: false,
});

const variantClasses = computed(() => `btn-${props.variant}`);

const sizeClasses = computed(() => {
  const classes = {
    sm: "btn-sm",
    md: "",
    lg: "btn-lg",
  };
  return classes[props.size];
});
</script>

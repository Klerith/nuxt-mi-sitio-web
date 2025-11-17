<template>
  <div>
    <div class="error-container">
      <div class="error-content">
        <!-- Animación del número 404 -->
        <div class="error-code-wrapper">
          <h1 class="error-code">{{ $props.error.statusCode || 404 }}</h1>
          <div class="error-glow"></div>
        </div>

        <!-- Mensaje de error -->
        <div class="error-message">
          <h2>{{ $props.error.message }}</h2>
          <p>
            {{ $props.error.data?.myOtherField }}
          </p>
        </div>

        <!-- Botones de acción -->
        <div class="error-actions">
          <button color="success" size="lg" @click="handleError">
            Volver al inicio
          </button>

          <button color="primary" size="lg" variant="ghost" @click="goBack">
            Ir atrás
          </button>
        </div>

        <!-- Información adicional para desarrolladores en modo dev -->
        <div v-if="isDev && error" class="error-details">
          <div class="error-stack">
            <p><strong>Mensaje:</strong> {{ error.message }}</p>
            <p><strong>Status:</strong> {{ error.statusCode }}</p>
            <p v-if="error.url"><strong>URL:</strong> {{ error.url }}</p>
            <pre v-if="error.stack">{{ error.stack }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';

defineProps<{
  error: NuxtError;
}>();

const isDev = import.meta.dev;
const router = useRouter();

const handleError = () => {
  // router.push('/');
  clearError({ redirect: '/' });
};

const goBack = () => {
  router.back();
  // handleError();
};
</script>

<style scoped>
.error-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(135deg, #020420 0%, #0a0f2c 100%);
}

.error-content {
  max-width: 600px;
  width: 100%;
  text-align: center;
}

.error-code-wrapper {
  position: relative;
  margin-bottom: 2rem;
}

.error-code {
  font-size: clamp(6rem, 20vw, 10rem);
  font-weight: 900;
  color: #00dc82;
  margin: 0;
  line-height: 1;
  text-shadow: 0 0 20px rgba(0, 220, 130, 0.5);
  animation: glitch 3s infinite;
}

.error-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle,
    rgba(0, 220, 130, 0.2) 0%,
    transparent 70%
  );
  filter: blur(40px);
  animation: pulse 2s ease-in-out infinite;
}

.error-message {
  margin-bottom: 3rem;
}

.error-message h2 {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  color: #00dc82;
  margin: 0 0 1rem 0;
}

.error-message p {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin: 0;
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.primary-button {
  transition: transform 0.2s ease;
}

.primary-button:hover {
  transform: translateY(-2px);
}

.error-details {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(0, 220, 130, 0.2);
}

.error-stack {
  background: rgba(0, 0, 0, 0.3);
  padding: 1rem;
  border-radius: 8px;
  text-align: left;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
}

.error-stack p {
  margin: 0.5rem 0;
}

.error-stack pre {
  margin-top: 1rem;
  overflow-x: auto;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
}

/* Animaciones */
@keyframes glitch {
  0%,
  100% {
    text-shadow: 0 0 20px rgba(0, 220, 130, 0.5);
  }
  25% {
    text-shadow: -2px 0 20px rgba(0, 220, 130, 0.5),
      2px 2px 20px rgba(0, 220, 130, 0.3);
  }
  50% {
    text-shadow: 2px -2px 20px rgba(0, 220, 130, 0.5),
      -2px 2px 20px rgba(0, 220, 130, 0.3);
  }
  75% {
    text-shadow: -2px 2px 20px rgba(0, 220, 130, 0.5),
      2px -2px 20px rgba(0, 220, 130, 0.3);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.3;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 0.6;
    transform: translate(-50%, -50%) scale(1.1);
  }
}

/* Responsive */
@media (max-width: 640px) {
  .error-actions {
    flex-direction: column;
    width: 100%;
  }

  .error-actions button {
    width: 100%;
  }
}
</style>

<script lang="ts" setup>
import { z } from 'zod';

const router = useRouter();
const route = useRoute();
const toast = useToast();

const filesToUpload = ref<File[]>([]);
const filesToUploadPreviews = ref<string[]>([]);

const messageQuery = route.query.message as string;
if (messageQuery) {
  toast.add({
    title: 'Producto creado',
    description: messageQuery,
  });
  router.replace({ query: {} });
}

// Variables
const rawId = route.params.id as string;

const {
  data: product,
  error,
  pending,
  createOrUpdate,
} = await useAdminProduct(rawId);

if (error.value) {
  await navigateTo('/404');
}

const isCreating = computed(() => rawId === 'new');

const newProduct = ref<Product | null>({ ...product.value } as Product);
const selectedImageIndex = ref(0);
const isSubmitting = ref(false);
const fieldErrors = ref<Record<string, string>>({});

const pageTitle = computed(() =>
  isCreating.value ? 'Crear producto' : 'Editar producto'
);
const subtitle = computed(() =>
  isCreating.value
    ? 'Completa el formulario para agregar un nuevo producto'
    : 'Actualiza la in formación del producto seleccionado'
);

const productSchema = z.object({
  slug: z.string().nonempty('El Slug es requerido'),
  name: z.string().nonempty('El nombre es requerido'),
  description: z.string().nonempty('La descripción es requerida'),
  price: z.number().min(0, 'El precio es requerido'),
});

const checkValidations = () => {
  fieldErrors.value = {};

  const result = productSchema.safeParse(newProduct.value);

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      const field = issue.path[0];

      if (typeof field === 'string') {
        fieldErrors.value[field] = issue.message;
      }
    });

    return false;
  }

  // Si quieres, aquí puedes sobreescribir newProduct con los valores parseados
  // newProduct.value = result.data;

  return true;
};

const handleSubmit = async () => {
  const isFormValid = checkValidations();
  if (!isFormValid) {
    return;
  }
  if (!newProduct.value) return;
  isSubmitting.value = true;

  newProduct.value!.tags = `${newProduct.value!.tags}`.split(',');

  console.log(newProduct.value);
  const product = await createOrUpdate(
    newProduct.value,
    filesToUpload.value.length > 0 ? filesToUpload.value : undefined
  );
  newProduct.value = product;

  if (isCreating.value) {
    // navigateTo
    router.replace(
      `/dashboard/product/${product.id}?message=Producto creado correctamente`
    );
    return;
  }

  // limpiar los archivos seleccionados
  filesToUpload.value = [];

  toast.add({
    title: 'Producto actualizado correctamente',
    description: `El producto ${product.name}, ha sido actualizado correctamente`,
  });
  isSubmitting.value = false;
};

const handleCancel = () => {
  navigateTo('/dashboard/products');
};

const handleFilesChanged = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (!files) return;

  filesToUpload.value = Array.from(files);

  // Crear una vista previa del archivo a subir
  filesToUploadPreviews.value = filesToUpload.value.map((file) => {
    return URL.createObjectURL(file);
  });
};

const removeFilePreview = (index: number) => {
  filesToUploadPreviews.value = filesToUploadPreviews.value.filter(
    (file, i) => i !== index
  );

  filesToUpload.value = filesToUpload.value.filter((file, i) => i !== index);
};

watch(
  newProduct,
  () => {
    checkValidations();
  },
  {
    deep: true,
  }
);
</script>

<template>
  <div class="mx-auto max-w-4xl space-y-8">
    <section class="space-y-1">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        {{ pageTitle }}
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        {{ subtitle }}
      </p>
    </section>

    <div
      v-if="pending"
      class="rounded-lg border border-gray-200 bg-white p-6 text-gray-600 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
    >
      Cargando producto...
    </div>

    <div
      v-else-if="!isCreating && !newProduct"
      class="rounded-lg border border-amber-200 bg-amber-50 p-6 text-amber-800 shadow-sm dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200"
    >
      No encontramos el producto solicitado.
    </div>

    <div v-if="newProduct" class="space-y-6">
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div class="space-y-2">
            <label
              class="text-sm font-medium text-gray-700 dark:text-gray-200"
              for="product-slug"
            >
              Slug
            </label>
            <input
              id="product-slug"
              v-model="newProduct.slug"
              type="text"
              :class="[
                'block w-full rounded-md bg-white px-3 py-2 shadow-sm focus:outline-none dark:bg-gray-900 dark:text-gray-100',
                fieldErrors.slug
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700',
              ]"
              placeholder="ejemplo-producto"
              autocomplete="off"
            />
            <p v-if="fieldErrors.slug" class="text-sm text-red-600">
              {{ fieldErrors.slug }}
            </p>
          </div>

          <div class="space-y-2">
            <label
              class="text-sm font-medium text-gray-700 dark:text-gray-200"
              for="product-name"
            >
              Nombre
            </label>
            <input
              id="product-name"
              v-model="newProduct.name"
              type="text"
              :class="[
                'block w-full rounded-md bg-white px-3 py-2 shadow-sm focus:outline-none dark:bg-gray-900 dark:text-gray-100',
                fieldErrors.name
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700',
              ]"
              placeholder="Nombre del producto"
              autocomplete="off"
            />
            <p v-if="fieldErrors.name" class="text-sm text-red-600">
              {{ fieldErrors.name }}
            </p>
          </div>
        </div>

        <div class="space-y-2">
          <label
            class="text-sm font-medium text-gray-700 dark:text-gray-200"
            for="product-description"
          >
            Descripción
          </label>
          <textarea
            id="product-description"
            v-model="newProduct.description"
            rows="4"
            :class="[
              'block w-full rounded-md bg-white px-3 py-2 shadow-sm focus:outline-none dark:bg-gray-900 dark:text-gray-100',
              fieldErrors.description
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700',
            ]"
            placeholder="Describe el producto con claridad..."
          />

          <p v-if="fieldErrors.description" class="text-sm text-red-600">
            {{ fieldErrors.description }}
          </p>
        </div>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div class="space-y-4">
            <div class="space-y-2">
              <label
                class="text-sm font-medium text-gray-700 dark:text-gray-200"
                for="product-price"
              >
                Precio (entero)
              </label>
              <input
                id="product-price"
                v-model="newProduct.price"
                type="number"
                min="0"
                step="1"
                :class="[
                  'block w-full rounded-md bg-white px-3 py-2 shadow-sm focus:outline-none dark:bg-gray-900 dark:text-gray-100',
                  fieldErrors.price
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700',
                ]"
                placeholder="0"
              />
              <p v-if="fieldErrors.price" class="text-sm text-red-600">
                {{ fieldErrors.price }}
              </p>
            </div>

            <div class="space-y-2">
              <label
                class="text-sm font-medium text-gray-700 dark:text-gray-200"
                for="product-tags"
              >
                Etiquetas
              </label>
              <input
                id="product-tags"
                v-model="newProduct.tags"
                type="text"
                :class="[
                  'block w-full rounded-md bg-white px-3 py-2 shadow-sm focus:outline-none dark:bg-gray-900 dark:text-gray-100',
                  fieldErrors.tagsInput
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700',
                ]"
                placeholder="etiqueta uno, etiqueta dos"
                autocomplete="off"
              />
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Ingresa etiquetas separadas por comas.
              </p>
              <p v-if="fieldErrors.tagsInput" class="text-sm text-red-600">
                {{ fieldErrors.tagsInput }}
              </p>
            </div>
          </div>

          <div class="space-y-3">
            <label
              class="text-sm font-medium text-gray-700 dark:text-gray-200"
              for="product-images"
            >
              Imágenes
            </label>
            <div v-if="newProduct.images.length > 0" class="space-y-3">
              <div
                class="overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800"
              >
                <img
                  :src="newProduct.images[selectedImageIndex]"
                  alt="Previsualización principal del producto"
                  class="h-64 w-full object-cover"
                />
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  v-for="(image, index) in newProduct.images"
                  :key="image"
                  type="button"
                  class="overflow-hidden rounded-md border-2 transition"
                  :class="
                    selectedImageIndex === index
                      ? 'border-blue-500'
                      : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                  "
                  @click="selectedImageIndex = index"
                >
                  <img
                    :src="image"
                    :alt="`Previsualización ${index + 1}`"
                    class="h-20 w-full object-cover"
                    loading="lazy"
                  />
                </button>
              </div>
            </div>

            <!-- Files to upload preview -->
            <ClientOnly>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div
                  v-for="(image, index) in filesToUploadPreviews"
                  :key="image"
                >
                  <div class="overflow-hidden rounded-lg relative">
                    <img
                      :src="image"
                      :alt="`Previsualización ${index + 1}`"
                      class="h-20 w-full object-cover"
                    />
                    <UButton
                      color="error"
                      icon="i-lucide-x"
                      class="absolute top-2 right-2"
                      @click="removeFilePreview(index)"
                    />
                  </div>
                </div>
              </div>
            </ClientOnly>

            <!-- <textarea
              id="product-images"
              v-model="newProduct.images"
              rows="4"
              :class="[
                'block w-full rounded-md bg-white px-3 py-2 shadow-sm focus:outline-none dark:bg-gray-900 dark:text-gray-100',
                fieldErrors.imagesInput
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700',
              ]"
              placeholder="https://ejemplo.com/imagen-1.jpg"
            /> -->
            <UInput
              v-if="!isCreating && !isSubmitting"
              @change="handleFilesChanged($event)"
              type="file"
              multiple
              id="product-images"
              rows="4"
              :class="[
                'block w-full rounded-md bg-white px-3 py-2 shadow-sm focus:outline-none dark:bg-gray-900 dark:text-gray-100',
                fieldErrors.imagesInput
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700',
              ]"
            />
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Ingresa una URL por línea.
            </p>
            <p v-if="fieldErrors.imagesInput" class="text-sm text-red-600">
              {{ fieldErrors.imagesInput }}
            </p>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <UButton
            type="submit"
            color="primary"
            variant="solid"
            :disabled="isSubmitting"
            icon="i-lucide-save"
          >
            {{ isSubmitting ? 'Guardando...' : 'Guardar producto' }}
          </UButton>
          <UButton
            type="button"
            color="neutral"
            variant="outline"
            icon="i-lucide-x"
            @click="handleCancel"
          >
            Cancelar
          </UButton>
        </div>
      </form>

      <section
        v-if="!isCreating && product"
        class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900"
      >
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
          Metadatos
        </h2>
        <dl class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="space-y-1">
            <dt class="text-sm font-medium text-gray-600 dark:text-gray-400">
              Creado
            </dt>
            <dd class="text-gray-900 dark:text-gray-100">
              {{ longDateTimeFormat(new Date(product?.createdAt)) }}
            </dd>
          </div>
          <div class="space-y-1">
            <dt class="text-sm font-medium text-gray-600 dark:text-gray-400">
              Actualizado
            </dt>
            <dd class="text-gray-900 dark:text-gray-100">
              {{ longDateTimeFormat(new Date(product?.updatedAt)) }}
            </dd>
          </div>
        </dl>
      </section>
    </div>
  </div>
</template>

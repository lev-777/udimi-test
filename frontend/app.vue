<template>
  <Transition name='layout' mode='out-in'>
    <div :key='$route.meta.layout'>
      <NuxtLayout>
        <Transition name='page' mode='out-in'>
          <NuxtPage />
        </Transition>
      </NuxtLayout>
    </div>
  </Transition>
</template>

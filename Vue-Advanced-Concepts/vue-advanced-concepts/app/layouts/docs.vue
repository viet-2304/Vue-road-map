<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <div class="flex-1 grid grid-cols-1 lg:grid-cols-[250px_1fr_200px] max-w-7xl mx-auto w-full">
      <!-- Sidebar -->
      <aside class="hidden lg:block border-r border-gray-200 dark:border-gray-800 p-4 overflow-y-auto sticky top-16 h-[calc(100vh-4rem)]">
        <SidebarNav />
      </aside>

      <!-- Main content -->
      <main class="p-6 lg:p-8 min-w-0">
        <slot />
      </main>

      <!-- Table of contents -->
      <aside class="hidden lg:block border-l border-gray-200 dark:border-gray-800 p-4 overflow-y-auto sticky top-16 h-[calc(100vh-4rem)]">
        <slot name="toc" />
      </aside>
    </div>
    <AppFooter />
  </div>
</template>

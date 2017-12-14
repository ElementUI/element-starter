<template>
    <div class="off-canvas-wrapper">
        <div class="c-nav__container off-canvas position-left reveal-for-large" id="siteNav" data-off-canvas>
            <nav class="c-nav">
                <button class="close-button u-hidden-md u-hidden-lg" aria-label="Close menu" type="button" data-close="siteNav">
                    <span aria-hidden="true">&times;</span>
                </button>
                <div class="c-nav__section u-mb0">
                    <h3 class="c-nav__header" v-if="title">{{title}}</h3>
                    <hr class="c-nav__divider" v-if="title"/>
                    <!-- Sidebar content will be transcluded here-->
                    <slot name="sidebar"></slot>
                </div>
            </nav>
        </div>

        <main role="main" class="off-canvas-content" data-off-canvas-content>
            <div id="js-content-container">
                <div id="js-content" class="l-page-content l-page-content--no-sidebar">
                    <div class="l-page__header">
                        <h1 class="c-heading__page"></h1>
                    </div>

                    <div class="l-page__main">
                        <!-- Main content will be transcluded here-->
                        <slot name="main"></slot>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
  export default {
    props: ['title'],
    name: 'ba-page-with-sidebar'
  }
</script>

<style scoped>

</style>

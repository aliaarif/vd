<script setup>
const { data: pages } = await useAsyncData('pages',
  () => {
    return $fetch(`/api/pages`, {
      method: 'get'
    })
  },
)
onMounted(() => {
  let baseUrl = window.location.hostname === 'localhost' ? process.env.SITE_URL_DEV : process.env.SITE_URL_SERVER;
})

const props = defineProps({
  firstParam: Object
})

// const path = useRouter().currentRoute.value
// const firstParam = useRouter().currentRoute.value.params.city
// console.log(firstParam)
</script>
<template>
  <footer class="site-footer " v-if="props.firstParam.currentRoute.value.name != 'login'">
    <div class="container">
      <div class="footer-des">
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur, amet sit! Adipisci sunt quidem iure
          distinctio nobis, perspiciatis porro eos delectus nostrum! Maxime quaerat earum eveniet alias quas saepe nihil.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quas repellendus, unde cupiditate odio,
          aliquam ab sit, quae modi reiciendis repudiandae tempora aspernatur nihil. Porro nesciunt debitis sed maiores
          soluta!
        </p>

      </div>

      <div class="footer-nav">
        <ul class="footer-menu menu">
          <li class="menu-item" v-for="pageName in pages" :key="pageName.slug">
            <nuxt-link :aria-label="pageName.title" :to='`https://easetrail.com/` + pageName.slug'>{{ pageName.title
            }}</nuxt-link>
          </li>
        </ul>
      </div>

      <div class="site-info">
        <span class="is-size-7">©2023 Examdust All Rights Reserved</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  margin-top: 30px;
}

@media screen and (max-width: 768px) {
  .footer-nav .menu {
    justify-content: center;
    text-align: center;
  }
}

.footer-des {
  text-align: center;
  line-height: 28px;
}

@media screen and (max-width: 330px) {

  .footer-nav .menu,
  .site-info {
    font-size: 13px;
  }

  .footer-des {
    font-size: 14px;
  }
}
</style>
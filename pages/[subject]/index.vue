<script setup>
const { city, slug, title, pageTitle, metaContent, meta } = useCommon();
import { useAuthStore } from "@/stores/auth";
import { useAuthDataStore } from "@/stores/auth-data";

const authStore = useAuthStore();
const authDataStore = useAuthDataStore();


const isLoading = ref(false)
onBeforeMount(() => {
    isLoading.value = true
    getQuestion()
});



const isLiked = ref(false);

const subjectName = ref('')
const question = ref({})

const getQuestion = async () => {
    const uri = useRouter()
    const subjectSlug = uri.currentRoute.value.path.split('/')[1]
    // subject = subjectSlug

    $fetch(`/api/get-question?slug=${subjectSlug}`, { method: 'get' }).then((res) => {
        subjectName.value = res.name
        $fetch(`/api/get-question?id=${res._id}`, { method: 'get' }).then((res) => {
            question.value = res
            isLiked.value = question.value.likes.includes(authDataStore.authData._id) ? true : false
        })
    })
}


const like = async (qid) => {
    fetch(`/api/add-like-to-question?qid=${qid}&uid=${authDataStore.authData._id}`)
}

const nextQuestion = async () => {
    getQuestion();
}




useHead({
    title: `${'Examdust - Random Question'}`,
    meta: [{ name: "description", content: metaContent.value ?? 'Examdust - Random Question' }],
});
</script>
<template>
    <div class="mt-6">

        <div class="columns is-multiline">
            <div class="column is-5-tablet is-12-mobile box">
                <div class="is-flex is-justify-content-space-between">
                    <h1 class="subtitle">{{ question.name }}</h1>
                    <span><a @click="addShareCount(`${question._id}`)"><i class="ri-share-line"></i>{{ question.share_counts
                    }}</a></span>
                </div>

                <p class="mb-4">Subject: {{ subjectName }}</p>
                <p class="mb-4">Author: {{ question.created_by }}</p>
                <p class="mb-4">Published: {{ question }}</p>

                <p class="mb-4">Extra Information for this question
                </p>


                <div class="is-flex is-justify-content-space-between">
                    <span>
                        <a @click="like(`${question._id}`), isLiked = !isLiked">
                            <!-- <i class="`ri-heart-3-`${'fill'}`"></i> -->
                            <i class="ri-heart-3-fill" v-if="isLiked"></i>
                            <i class="ri-heart-3-line" v-else></i>
                            {{ question.likes }}
                        </a>

                    </span>
                    <span><a @click="addShareCount(`${question._id}`)"><i class="ri-numbers-line"></i> {{
                        question.visit_counts
                    }}</a></span>
                </div>


            </div>
            <div class="column is-7-tablet is-12-mobile box">
                <div class="is-flex is-justify-content-space-between">
                    <h1 class="subtitle">&nbsp;</h1>
                    <span><a @click="nextQuestion"><i class="ri-arrow-right-line"></i></a></span>
                </div>
                <ul>
                    <!-- <li v-for="(option, index) in question.options" :key="index">
                        <input type="radio" :value="option" v-model="selectedOption" @change="optionSelected"> {{ option }}
                    </li> -->
                </ul>

            </div>
        </div>
    </div>
</template>
<style scoped>
.title {
    color: #363636;
    margin-top: 30px;
    margin-bottom: 0px;
}

@media screen and (max-width: 768px) {
    .title {
        font-size: 26px;
    }
}

.column.is-6-mobile.is-4-tablet.is-4-desktop.is-3-widescreen {
    padding: 10px;
}

.container.mt-2 section {
    margin-left: 20px;
    margin-right: 20px;
}

.heading-ct {
    margin-bottom: 25px;
    margin-top: -10px;
}

.is-peach {
    background-color: rgba(250, 105, 0, .1);
    margin-top: 40px;
    border-radius: 10px;
}

.is-orange {
    border: 2px solid #fa6900;
    background-color: transparent;
    border-radius: 50px;
    color: #fa6900;
    text-align: center;
}

.box.is-orange:hover {
    background-color: orange;
}

.is-orange:hover {
    color: white;
}

.box {
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
    transition: transform 0.3s ease;
}

.box:hover {
    transform: translateY(-2px);
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
}

@media screen and (max-width: 768px) {
    .site-inner {
        padding-left: 20px;
        padding-right: 20px;
    }

    .box.stack {
        padding: 10px;
    }

    .column img {
        width: 50px !important;
        height: 50px !important;
        margin-bottom: 4px;
    }

    .grid-item {
        padding: 10px;
    }

    .inside-container {
        padding: 2rem;
        margin: 40px 0px 0px;
    }

    .et-heading h1 {
        font-size: 24px !important;
        line-height: 30px;
        margin-top: 20px;
    }

    .footer-des {
        text-align: center;
        line-height: 28px;
    }

}
</style>

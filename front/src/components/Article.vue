<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import ky from 'ky';
import Popup from './Popup.vue';

interface Article {
  id: number;
  nom: string;
  description: string;
  img_url: string;
}

const articles = ref<Article[]>([]);
const error = ref<string | null>(null);
const lastId = ref<number>(0);
const fetchingMore = ref(false);
const exist=ref(true)
const isPopupOpen = ref(false);

const loadArticles = async () => {
  if (fetchingMore.value) return;
  fetchingMore.value = true;

  try {
    const response = await ky.get(`http://localhost:5000/articles?lastId=${lastId.value}`);
    const newArticles = await response.json() as Article[];

    if (newArticles.length > 0) {
      articles.value.push(...newArticles);
      lastId.value = newArticles[newArticles.length - 1].id;
    }
  } catch (err) {
    exist.value=false
  } finally {
    fetchingMore.value = false;
  }
};

const handleScroll = () => {
  const scrollPosition = window.innerHeight + window.scrollY;
  const pageHeight = document.documentElement.scrollHeight;

  if (pageHeight - scrollPosition <= 100 && exist.value) {
    loadArticles();
  }
};

const handleSubmitArticle = (article: { id:number,nom: string, description: string, img_url: string }) => {
  articles.value.unshift(article); 
};

onMounted(async () => {
  await loadArticles();
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div class="articles-container">
    <button class="open-popup-btn" @click="isPopupOpen = true">Ajouter un article</button>
    <Popup v-if="isPopupOpen" @close="isPopupOpen = false" @submitArticle="handleSubmitArticle" />

    <div v-if="!error" class="cards-container">
      <div v-for="article in articles" :key="article.id" class="card">
        <h2 class="article-title">{{ article.nom }}</h2>
        <img :src="article.img_url" alt="Image de l'article" class="article-image" />
        <div class="card-content">
          <p class="article-description">{{ article.description }}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.articles-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}



.cards-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  gap: 20px;
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
}

.card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.article-image {
  width: 100%;
  object-fit: cover; 
  border-bottom: 2px solid #eee;
}

.card-content {
  padding: 15px;
}

.article-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #666;
  margin: 10px 0;
}

.article-description {
  font-size: 1rem;
  color: #666;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .cards-container {
    grid-template-columns: 1fr; 
  }

  .article-image {
    width: 100%;
  }
}
</style>

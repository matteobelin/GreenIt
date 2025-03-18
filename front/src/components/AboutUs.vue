<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ky from 'ky';

interface Article {
  id: number;
  nom: string;
  description: string;
}

const articles = ref<Article[]>([]);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const response = await ky.get(`http://localhost:5000/articlesDescription?lastId=0`);
    articles.value = await response.json() as Article[];
  } catch (err) {
    error.value = 'Erreur lors du chargement des articles. Veuillez réessayer plus tard.'; 
    console.log(err);
  }
});
</script>


<template>
    <div class="about-us">
      <h1>About Us</h1>
      <p v-if="error" class="error-message">{{ error }}</p>
      <div v-if="!error" class="carousel-container">
        <div class="carousel">
          <div v-for="article in articles" :key="article.id" class="card">
            <h2 class="article-title">{{ article.nom }}</h2>
            <p class="article-description">{{ article.description }}</p>
          </div>
        </div>
      </div>
      <p class="styled-paragraph">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo ex ab, voluptatem architecto cum placeat nihil tempora enim unde, commodi sequi quos impedit, eum nemo voluptatum perspiciatis deleniti amet recusandae!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo ex ab, voluptatem architecto cum placeat nihil tempora enim unde, commodi sequi quos impedit, eum nemo voluptatum perspiciatis deleniti amet recusandae!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo ex ab, voluptatem architecto cum placeat nihil tempora enim unde, commodi sequi quos impedit, eum nemo voluptatum perspiciatis deleniti amet recusandae!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo ex ab, voluptatem architecto cum placeat nihil tempora enim unde, commodi sequi quos impedit, eum nemo voluptatum perspiciatis deleniti amet recusandae!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo ex ab, voluptatem architecto cum placeat nihil tempora enim unde, commodi sequi quos impedit, eum nemo voluptatum perspiciatis deleniti amet recusandae!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo ex ab, voluptatem architecto cum placeat nihil tempora enim unde, commodi sequi quos impedit, eum nemo voluptatum perspiciatis deleniti amet recusandae!
      </p>
    </div>
  </template>
  
  <style scoped>

.about-us {
    max-width: 100vh;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
  }
.styled-paragraph {
    font-size: 1.1rem; 
    line-height: 1.6;
    padding: 20px; 
    text-align: justify; 
    margin: 20px 0;
}
  .error-message {
    color: red;
    font-weight: bold;
  }
  
  .carousel-container {
    width: 80%;
    margin: 0 auto;
    overflow: hidden;
  }
  
  .carousel {
    display: flex;
    animation: slide 50s infinite linear; 
  }
  
  .card {
    min-width: calc(100% - 20px); 
    padding: 20px;
    margin-right: 20px;
    box-sizing: border-box;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.5s ease;
  }
  
  .card h2 {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
  }
  
  .card p {
    font-size: 1rem;
    color: #666;
    margin-top: 10px;
  }
  
  @keyframes slide {
    0%, 20% {
      transform: translateX(0);
    }
    25%, 45% {
      transform: translateX(-99%);
    }
    50%, 70% {
      transform: translateX(-199%);
    }
    75%, 95% {
      transform: translateX(-299%);
    }
    100% {
      transform: translateX(-399%);
    }
  }
  
  .carousel {
    animation: slide 50s infinite linear;
  }
  </style>
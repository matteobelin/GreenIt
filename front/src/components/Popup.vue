<script setup lang="ts">
import ky from 'ky';
import { ref } from 'vue';

const emit = defineEmits(["close", "submitArticle"]);


const nom = ref("");
const description = ref("");
const image = ref<File | null>(null);
const imagePreview = ref<string | null>(null);


const handleFileUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    image.value = file;
    const reader = new FileReader();
    reader.onload = () => {
      imagePreview.value = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
};


const submitForm = async () => {
  if (!nom.value || !description.value || !image.value) {
    alert("Veuillez remplir tous les champs !");
    return;
  }

  if (description.value.length > 254) {
    alert("La description doit contenir au maximum 254 caractères.");
    return;
  }

  const formData = new FormData();
  formData.append('nom', nom.value);
  formData.append('description', description.value);
  formData.append('image', image.value);
  try {
    const response = await ky.post('http://localhost:5000/articles', {
      body: formData
    });
    const responseData: { id: number,img_url:string } = await response.json();
    emit("submitArticle", { id:responseData.id,nom: nom.value, description: description.value, img_url: responseData.img_url });
    emit("close");  
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'article:', error);
    alert('Une erreur est survenue. Veuillez réessayer.');
  }
};
</script>

<template>
  <div class="popup-overlay" @click.self="$emit('close')">
    <div class="popup-content">
      <h2>Ajouter un article</h2>

      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="nom">Nom :</label>
          <input type="text" id="nom" v-model="nom" maxlength="20" required />
        </div>

        <div class="form-group">
          <label for="description">Description :</label>
          <textarea id="description" v-model="description" maxlength="254" required></textarea>
          <small>{{ description.length }}/254 caractères</small>
        </div>

        <div class="form-group">
          <label for="image">Image :</label>
          <input type="file" id="image" @change="handleFileUpload" accept="image/*" required />
        </div>

        <div v-if="imagePreview" class="image-preview">
          <p>Prévisualisation :</p>
          <img :src="imagePreview" alt="Prévisualisation de l'image" />
        </div>

        <div class="buttons-container">
          <button type="button" class="close-btn" @click="$emit('close')">Annuler</button>
          <button type="submit" class="submit-btn">Ajouter</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.popup-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  width: 400px;
  color: #666;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  color: #666;
}

textarea {
  resize: none;
}


.image-preview {
  margin-top: 10px;
}

.image-preview img {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
}

.buttons-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
}

.submit-btn,
.close-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-btn {
  background-color: blue;
  color: white;
}

.submit-btn:hover {
  background-color: rgb(0, 45, 128);
}

.close-btn {
  background-color: red;
  color: white;
  margin-right: 10px;
}

.close-btn:hover {
  background-color: darkred;
}
</style>
<template>
    <div class="contact-page">
      <div class="contact-card">
        <h1>Contact</h1>
      
        <p>Nous sommes disponibles par e-mail et par téléphone :</p>
    
        <div class="contact-info">
          <p><strong>Email :</strong> 
            <a href="mailto:blabla@example.com" class="contact-email">blabla@example.com</a>
          </p>
    
          <p><strong>Téléphone :</strong> 
            <a href="tel:+33000000000" class="contact-phone">+33 000 000 000</a>
          </p>
    
          <p><strong>Adresse :</strong> 
            123 Rue Exemple, 75000 Paris, France
          </p>
        </div>
    
        <hr />

        <h2>Envoyez-nous un message :</h2>
        <form>
          <div class="form-group">
            <label for="name">Nom :</label>
            <input type="text" id="name" required />
          </div>
    
          <div class="form-group">
            <label for="email">Email :</label>
            <input type="email" id="email" required />
          </div>
    
          <div class="form-group">
            <label for="message">Message :</label>
            <textarea id="message" rows="5" required></textarea>
          </div>
    
          <div class="form-group">
            <button type="submit" class="submit-btn">Envoyer</button>
          </div>
        </form>
      </div>
    </div>
</template>
  
<style scoped>
  .contact-page {
    font-family: Arial, sans-serif;
    color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 85vh;
  }
  
  .contact-card {
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 600px;
  }
  
  .contact-info {
    text-align: left;
    margin: 20px 0;
  }
  
  .contact-email, .contact-phone {
    color: #007bff;
    text-decoration: none;
  }
  
  .contact-email:hover, .contact-phone:hover {
    text-decoration: underline;
  }
  
  hr {
    margin: 20px 0;
    border: 1px solid #ddd;
  }
  
  .form-group {
    margin-bottom: 15px;
    text-align: left;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  input, textarea {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: white;
    color: #666;
  }
  
  button.submit-btn {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button.submit-btn:hover {
    background-color: #0056b3;
  }
</style>
  
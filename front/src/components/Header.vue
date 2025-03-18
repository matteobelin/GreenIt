<!-- src/components/Header.vue -->
<template>
    <header class="app-header">
      <div class="container">
        <h1>Mon Application</h1>
        <nav>
          <ul>
            <li><router-link to="/">Article</router-link></li>
            <li><router-link to="/about">About</router-link></li>
            <li><router-link to="/contact">Contact</router-link></li>
          </ul>
        </nav>
      </div>
    </header>
  </template>
  
  <style scoped>
  .app-header {
    background-color: #333;
    color: white;
    padding: 10px 0;
  }
  
  .app-header .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .app-header nav ul {
    display: flex;
    list-style: none;
  }
  
  .app-header nav ul li {
    margin-right: 20px;
  }
  
  .app-header nav ul li a {
    color: white;
    text-decoration: none;
    font-size: 1.1rem;
  }
  
  .app-header nav ul li a:hover {
    text-decoration: underline;
  }
  </style>
  
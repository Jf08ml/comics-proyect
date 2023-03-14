<template>
    <div class="modal">
      <div class="modal-content">
        <slot>
        </slot>
      </div>
    </div>
  </template>
  
  <script setup>

  </script>
  
  <style>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }
  
  .modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    max-width: 500px;
  }
  </style>
  
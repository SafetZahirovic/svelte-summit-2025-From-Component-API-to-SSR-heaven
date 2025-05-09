<script lang="ts">
  const { name } = $props();

  let message = $state("");
</script>

<div id="app" class="hello-container">
  <div>
    <label for="name">Message:</label>
    <input type="text" id="name" bind:value={message} />
  </div>
  Hello World. My name is {name}. Todays {message}
</div>

<style>
  .hello-container {
    font-size: 4rem;
    text-align: center;
    margin-top: 20px;
    width: 100%;
    height: 100%;
    background-color: red;
  }
</style>

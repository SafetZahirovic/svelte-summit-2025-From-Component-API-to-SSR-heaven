<script lang="ts">
  type Props = {
    text: string;
    onSubmit: () => void;
    disable: boolean;
    type: "primary" | "secondary";
    class: string;
  };

  const {
    onSubmit,
    text = "Submit",
    disable = false,
    type = "primary",
    class: className = "",
  }: Partial<Props> = $props();
</script>

<button
  class={className}
  class:secondary={type === "secondary"}
  class:primary={type === "primary"}
  class:disable
  disabled={disable}
  onclick={onSubmit}
>
  {text}
</button>

<style>
  button.primary {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    position: relative;
  }

  button.primary:hover {
    background-color: #0056b3;
  }

  button.secondary {
    padding: 10px 20px;
    background-color: #6c757d;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    position: relative;
  }
  button.secondary:hover {
    background-color: #5a6268;
  }

  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  button:disabled:hover {
    background-color: #ccc;
    cursor: not-allowed;
  }
</style>

<script>
    export let dataId;
    export let children;
    export let handler;
    export let role;

  </script>
  
  <ul>
    {#each items as item}
      <li>
        {item.label}
        {#if item.children && item.children.length > 0}
          <RecursiveComponent {items=item.children} />
        {/if}
      </li>
    {/each}
  </ul>
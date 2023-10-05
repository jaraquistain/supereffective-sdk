# Optimizations for the DEX Tracker UI box system

## Browser Native APIs

1. Lazy loaded images: `<img loading="lazy" />`
2. DOM Event Delegation:

- We set events like `onClick` on the parent element and use `event.target` + `data-*` attributes to
  determine which child element was clicked.
  - The parent needs to have CSS `pointer-events: none` so that it doesn't receive the event.
  - The children need to have CSS `pointer-events: auto` so that they receive the event.
- We use `data-*` attributes in the children to store the data we need to pass to the event handler.
- This technique reduces the number of event listeners we need to set, which improves performance
  specially when we have thousands of elements.

3. Virtual Scrolling: to render only the visible elements in the DOM. This improves performance
   specially when we have thousands of elements.
4. CSS Content-Visibility: We use the `content-visibility: auto` CSS property to improve the
   performance of scrolling and rendering of elements.
5. Infinite Scrolling: to load more data as the user scrolls down the page.
6. Intersection Observer: to detect when an element is visible in the viewport.
7. Web Workers: We use the `comlink` library to run expensive calculations in a separate thread so
   that the main thread is not blocked.
   https://dev.to/franciscomendes10866/how-to-use-service-workers-with-react-17p2

## React Optimizations

- use `useMemo` for expensive calculations

## Other considerations (not related to performance)

<detail>
<summary>Why we use `useMemo` instead of `useCallback`?</summary>
<p>
   When we pass a prop that is an object, in order to the component to rerender when the object prop
  changes, we need to track the changes using `useState` and `useEffect` in the child component.
  This is not necessary with primitive values like strings and numbers.
</p>
<detail>

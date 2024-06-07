# Flatlist Rendering Techniques

This repo contains a series of branches that iterate on different approaches to rendering Flatlist - primarily to determine what approach performs the best. The example is a list of 1000 items which have a toggle button to select them. The profiler was used to determine the effects of the different implementations on performance.

## Branches

- `main` contains the end result 
- `baseline` is the starting point - no optimizations 
- `context-based` uses React Context to manage selected ids state
- `memoized` uses React.memo to optimize re-renders in flatlist rows
- `context-selectors` uses zustand to manage selected ids state and memoized selectors to optimize re-renders in flatlist rows
- `relative-context-selectors` also uses zustand, but componentizes it instead of reading from a global store
# Recipe videos

Self-hosted video files go here. Name each one after its recipe slug — the
filename in `recipes/` without the `.html` — so the two stay easy to match up:

```
assets/video/buttermilk-pancakes.mp4
assets/video/shakshuka.mp4
```

Dropping a file here does not publish it on its own. Register it in
`src/data/videos.js`, keyed by the same slug, then rebuild:

```js
'buttermilk-pancakes': 'assets/video/buttermilk-pancakes.mp4',
```

MP4 (H.264) plays everywhere. A recipe with no entry keeps its video panel and
shows a "coming soon" placeholder, so videos can be added one at a time.

YouTube and Vimeo recipes need nothing in this folder — see `src/data/videos.js`
for those shapes.

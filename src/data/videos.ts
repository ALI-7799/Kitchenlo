/**
 * Recipe videos — the one place to add them.
 *
 * Keys are recipe slugs, which are the filenames in recipes/ without the
 * .html. A recipe with no entry here still gets its video section: the panel
 * renders a "coming soon" placeholder, in the same spirit as `image: null`
 * falling back to generated cover art. So nothing here is required, and a
 * recipe never shows another recipe's video.
 *
 * Three forms are accepted, and mixing them is fine:
 *
 *   'buttermilk-pancakes': 'assets/video/buttermilk-pancakes.mp4'
 *       A self-hosted file. Shorthand for { file: '...' }.
 *
 *   'shakshuka': {
 *     file: 'assets/video/shakshuka.mp4',
 *     poster: 'assets/img/shakshuka-still.jpg',  // optional first frame
 *     title: 'Shakshuka, start to finish',       // optional caption
 *     seconds: 184                               // optional, for SEO markup
 *   }
 *
 *   'lentil-soup': { youtube: 'dQw4w9WgXcQ' }
 *       An embed. Takes a bare id or any normal YouTube URL. `vimeo` works
 *       the same way.
 *
 * Write paths from the site root, as above; the generator rewrites them for
 * the recipes/ subdirectory. Self-hosted files go in assets/video/ — name
 * them after the slug and they stay easy to match up.
 *
 * After editing, rerun the build.
 */

/** A self-hosted file. */
export interface VideoFile {
  file: string;
  poster?: string;
  title?: string;
  seconds?: number;
  youtube?: never;
  vimeo?: never;
}

/** A YouTube embed, by bare id or any normal YouTube URL. */
export interface VideoYouTube {
  youtube: string;
  title?: string;
  seconds?: number;
  file?: never;
  vimeo?: never;
}

/** A Vimeo embed, by bare id or URL. */
export interface VideoVimeo {
  vimeo: string;
  title?: string;
  seconds?: number;
  file?: never;
  youtube?: never;
}

/** The shorthand string is equivalent to { file: '...' }. */
export type VideoEntry = string | VideoFile | VideoYouTube | VideoVimeo;

/** What the template receives once the entry has been normalised. */
export interface ResolvedVideo {
  kind: 'file' | 'embed';
  src: string;
  poster: string;
  title: string;
  seconds: number;
}

/* Add one line per recipe as each video is ready. The commented examples below
   are the three accepted forms; delete or overwrite them. */
const videos: Record<string, VideoEntry> = {
  // 'buttermilk-pancakes': 'assets/video/buttermilk-pancakes.mp4',
  // 'shakshuka': { file: 'assets/video/shakshuka.mp4', title: 'Shakshuka, start to finish' },
  // 'lentil-soup': { youtube: 'dQw4w9WgXcQ' }
};

/* Pulls the id out of a watch, share, shorts or embed URL, and passes a bare
   id straight through. */
function youtubeId(value: string): string {
  const match = value.match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/)([A-Za-z0-9_-]{6,})/);
  return match ? match[1]! : value.trim();
}

function vimeoId(value: string): string {
  const match = value.match(/(?:vimeo\.com\/(?:video\/)?)(\d+)/);
  return match ? match[1]! : value.trim();
}

/**
 * Normalises whatever shape the entry was written in to one descriptor.
 *
 * Returns null when a recipe has no video, which is what makes the template
 * render the placeholder.
 */
export function forRecipe(slug: string): ResolvedVideo | null {
  const raw = videos[slug];
  if (!raw) return null;

  const entry: VideoFile | VideoYouTube | VideoVimeo =
    typeof raw === 'string' ? { file: raw } : raw;

  const title = entry.title || '';
  const seconds = entry.seconds || 0;

  if ('youtube' in entry && entry.youtube) {
    return {
      kind: 'embed',
      src: 'https://www.youtube-nocookie.com/embed/' + youtubeId(entry.youtube),
      poster: '',
      title,
      seconds
    };
  }

  if ('vimeo' in entry && entry.vimeo) {
    return {
      kind: 'embed',
      src: 'https://player.vimeo.com/video/' + vimeoId(entry.vimeo),
      poster: '',
      title,
      seconds
    };
  }

  if (!('file' in entry) || !entry.file) return null;

  return {
    kind: 'file',
    src: entry.file,
    poster: entry.poster || '',
    title,
    seconds
  };
}

export default videos;

/**
 * Keeps the home page's Recipe of the Day on the site's own calendar.
 *
 * The pages are static, so the panel is baked in at build time and would
 * otherwise stay on whatever recipe was current when the site was last
 * deployed. There is no cron and no server doing this: the build stamps the
 * day it rendered for, and the browser compares that against today.
 *
 * The date is resolved in the site's timezone rather than the visitor's. Two
 * people loading the page at the same instant in Tokyo and Los Angeles are on
 * different calendar dates, and requirement one is that they see the same
 * recipe. One fixed zone is what makes that true.
 *
 * The choice comes from the same function the generator calls, so a swapped-in
 * card is byte-identical to a freshly built one, and it depends only on the
 * date: reloading, or leaving the tab open, cannot change it before midnight.
 */
import * as Recipes from '../../data/recipes.js';
import site from '../../data/site.js';
import { recipeOfTheDayCard } from '../../templates/components.js';
import { $, depth } from '../dom.js';

const panel = $('[data-recipe-of-the-day]');

if (panel) {
  /** Renders the day's recipe into the panel when the stamped day is stale. */
  const sync = (): void => {
    let today: number;
    try {
      today = Recipes.siteDayNumber(new Date(), site.timezone);
    } catch {
      // A browser without this timezone in its ICU data: leave the built card
      // alone rather than replacing it with a guess from the wrong clock.
      return;
    }
    if (Number(panel.getAttribute('data-rotd-day')) === today) return;

    panel.innerHTML = recipeOfTheDayCard(Recipes.recipeOfTheDay(new Date(), site.timezone), depth);
    panel.setAttribute('data-rotd-day', String(today));
  };

  /*
   * A tab left open across midnight would otherwise sit on yesterday, so arm a
   * timer for the moment the site's date next changes rather than polling.
   * The wait is measured by counting forward to the first instant whose site
   * day differs, which keeps it correct on the 23- and 25-hour DST days
   * without doing any offset arithmetic here.
   */
  const armMidnightTimer = (): void => {
    let today: number;
    try {
      today = Recipes.siteDayNumber(new Date(), site.timezone);
    } catch {
      return;
    }
    // Midnight in the site's zone, found by stepping to the next UTC day
    // boundary that the site calendar agrees is a new day.
    const now = Date.now();
    let next = Math.floor(now / 3600000) * 3600000;
    for (let i = 0; i <= 26; i++) {
      next += 3600000;
      if (Recipes.siteDayNumber(new Date(next), site.timezone) !== today) break;
    }
    // A second past the hour it turns, so rounding can never land early.
    const wait = Math.max(1000, next - now + 1000);
    window.setTimeout(() => {
      sync();
      armMidnightTimer();
    }, wait);
  };

  sync();
  armMidnightTimer();

  /*
   * Timers do not survive a sleeping device reliably, so re-check whenever the
   * tab comes back to the foreground. This only touches the DOM on a day that
   * has actually changed.
   */
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) sync();
  });
}

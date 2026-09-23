"use strict";(()=>{var m=class extends Error{constructor(i,n,r=[]){super(n);this.status=i;this.message=n;this.details=r;this.name="ApiError"}},M=()=>{};function k(e){M=e}async function u(e,t={}){let i;try{i=await fetch(e,{...t,credentials:"same-origin",headers:{Accept:"application/json",...t.body?{"Content-Type":"application/json"}:{},...t.headers??{}}})}catch{throw new m(0,"Could not reach the server. Check your connection.")}if(i.status===204)return;let n=null,r=await i.text();if(r)try{n=JSON.parse(r)}catch{throw new m(i.status,`Unexpected response (${i.status})`)}if(!i.ok){let o=n??{};throw i.status===401?(M(),new m(401,o.error??"Your session has expired. Sign in again.")):new m(i.status,o.error??`Request failed (${i.status})`,Array.isArray(o.details)?o.details.map(String):[])}return n}var c={signIn:(e,t)=>u("/api/admin/login",{method:"POST",body:JSON.stringify({email:e,password:t})}),session:()=>u("/api/admin/session"),signOut:()=>u("/api/admin/session",{method:"DELETE"}),listRecipes:(e="")=>u(`/api/admin/recipes${e?`?q=${encodeURIComponent(e)}`:""}`),getRecipe:e=>u(`/api/recipes/${encodeURIComponent(e)}?draft=1`),createRecipe:e=>u("/api/recipes",{method:"POST",body:JSON.stringify(e)}),updateRecipe:(e,t)=>u(`/api/recipes/${encodeURIComponent(e)}`,{method:"PUT",body:JSON.stringify(t)}),deleteRecipe:e=>u(`/api/recipes/${encodeURIComponent(e)}`,{method:"DELETE"}),uploadImage:(e,t)=>u("/api/admin/upload",{method:"POST",body:JSON.stringify({filename:e,data:t})}),rotd:()=>u("/api/admin/rotd"),pinRotd:(e,t,i="")=>u("/api/admin/rotd",{method:"POST",body:JSON.stringify({date:e,slug:t,note:i})}),unpinRotd:e=>u(`/api/admin/rotd?date=${encodeURIComponent(e)}`,{method:"DELETE"}),stats:()=>u("/api/admin/stats"),publish:()=>u("/api/admin/publish",{method:"POST"})};var a=(e,t=document)=>t.querySelector(e),w=(e,t=document)=>Array.from(t.querySelectorAll(e));function s(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function H(e){let t=String(e??"").trim();return t&&/^(https?:\/\/|\/)/i.test(t)?s(t):""}function E(e){return e.split(/[\n,]/).map(t=>t.trim()).filter(Boolean)}function f(e){return e.split(`
`).map(t=>t.trim()).filter(Boolean)}function I(e){if(!e)return"";let t=new Date(e+(e.length===10?"T00:00:00Z":""));return Number.isNaN(t.getTime())?e:t.toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric",timeZone:"UTC"})}function q(e){return new Promise((t,i)=>{let n=new FileReader;n.onload=()=>t(String(n.result)),n.onerror=()=>i(new Error("Could not read that file")),n.readAsDataURL(e)})}var V=[["quick-dinners","Quick Dinners"],["healthy-food","Healthy Food"],["breakfast","Breakfast & Brunch"],["desserts","Desserts"],["comfort-food","Comfort Food"]],B=["vegetarian","vegan","gluten-free","dairy-free","high-protein","high-fibre","low-carb"],G=["Easy","Medium","Hard"];function J(){let e=new Date().toISOString().slice(0,10);return{slug:"",title:"",description:"",intro:"",category:"quick-dinners",cuisine:"",course:"Dinner",method:"",diet:[],keywords:[],image:null,imageAlt:"",prepMinutes:10,cookMinutes:20,servings:4,yieldText:"",difficulty:"Easy",rating:0,ratingCount:0,datePublished:e,dateModified:e,nutrition:{calories:0,protein:0,carbs:0,fat:0,fiber:0,sugar:0,sodium:0},equipment:[],ingredients:[{group:"",items:[]}],instructions:[{title:"",text:""}],tips:[],variations:[],storage:"",faqs:[],related:[],video:null,published:!0}}function A(e,t,i){e.innerHTML='<p class="empty">Loading\u2026</p>',(t?c.getRecipe(t).then(r=>r.recipe):Promise.resolve(J())).then(r=>z(e,r,t,i)).catch(r=>{e.innerHTML=`<p class="empty">${s(r instanceof Error?r.message:"Could not load")}</p>`})}function z(e,t,i,n){e.innerHTML=`
    <div class="editor-head">
      <h1>${i?`Editing ${s(t.title)}`:"New recipe"}</h1>
      <div class="editor-actions">
        ${i?`<a class="btn btn-sm" href="/recipes/${s(t.slug)}" target="_blank"
                rel="noopener">View</a>
             <button class="btn btn-sm btn-danger" data-act="delete" type="button">Delete</button>`:""}
        <button class="btn btn-sm" data-act="cancel" type="button">Back</button>
        <button class="btn btn-sm btn-primary" data-act="save" type="button">Save</button>
      </div>
    </div>

    <div id="editorErrors" hidden></div>

    <form id="recipeForm" autocomplete="off">
      ${Q(t)}
      ${Y(t)}
      ${_(t)}
      ${K(t)}
      ${W(t)}
      ${Z(t)}
      ${X(t)}
      ${ee(t)}
    </form>
  `,te(e,t,i,n)}function Q(e){return`
    <section class="section">
      <h2>Basics</h2>
      <div class="field">
        <label for="f-title">Title</label>
        <input id="f-title" name="title" type="text" value="${s(e.title)}" />
      </div>
      <div class="field">
        <label for="f-slug">Slug</label>
        <input id="f-slug" name="slug" type="text" value="${s(e.slug)}" />
        <p class="hint">
          The page address: /recipes/<strong>${s(e.slug||"your-slug")}</strong>.
          Changing this on a published recipe changes its URL, which costs its
          search ranking \u2014 related links are repointed automatically, but any
          external link will break.
        </p>
      </div>
      <div class="field">
        <label for="f-description">Description</label>
        <textarea id="f-description" name="description">${s(e.description)}</textarea>
        <p class="hint">Used as the meta description and the card text. Aim for 120-160 characters.</p>
      </div>
      <div class="field">
        <label for="f-intro">Intro</label>
        <textarea id="f-intro" name="intro" rows="4">${s(e.intro)}</textarea>
      </div>
      <div class="field-row">
        <div class="field">
          <label for="f-category">Category</label>
          <select id="f-category" name="category">
            ${V.map(([t,i])=>`<option value="${s(t)}"${e.category===t?" selected":""}>${s(i)}</option>`).join("")}
          </select>
        </div>
        <div class="field">
          <label for="f-cuisine">Cuisine</label>
          <input id="f-cuisine" name="cuisine" type="text" value="${s(e.cuisine)}" />
        </div>
        <div class="field">
          <label for="f-course">Course</label>
          <input id="f-course" name="course" type="text" value="${s(e.course)}" />
        </div>
        <div class="field">
          <label for="f-method">Method</label>
          <input id="f-method" name="method" type="text" value="${s(e.method)}" />
        </div>
      </div>
      <div class="field">
        <label>Diet tags</label>
        <div class="checks">
          ${B.map(t=>`
            <label class="check">
              <input type="checkbox" name="diet" value="${s(t)}"
                ${e.diet.includes(t)?"checked":""} />
              ${s(t)}
            </label>`).join("")}
        </div>
      </div>
      <div class="field">
        <label for="f-keywords">Keywords</label>
        <input id="f-keywords" name="keywords" type="text" value="${s(e.keywords.join(", "))}" />
        <p class="hint">Comma separated. These feed search and the Recipe structured data.</p>
      </div>
      <div class="field">
        <label class="check">
          <input type="checkbox" id="f-published" name="published"
            ${e.published!==!1?"checked":""} />
          Published
        </label>
        <p class="hint">Unpublished recipes stay out of the site, the sitemap and search.</p>
      </div>
    </section>`}function Y(e){return`
    <section class="section">
      <h2>Image</h2>
      <img class="image-preview" id="imagePreview"
        src="${H(e.image)||"/favicon.svg"}" alt="" />
      <div class="field">
        <label for="f-imageFile">Upload a new image</label>
        <input id="f-imageFile" type="file" accept="image/jpeg,image/png,image/webp,image/avif" />
        <p class="hint">JPEG, PNG, WebP or AVIF, up to 8 MB. Uploading replaces the URL below.</p>
      </div>
      <div class="field">
        <label for="f-image">Image URL</label>
        <input id="f-image" name="image" type="text" value="${s(e.image??"")}" />
        <p class="hint">Leave empty to use the generated cover art for this recipe.</p>
      </div>
      <div class="field">
        <label for="f-imageAlt">Alt text</label>
        <input id="f-imageAlt" name="imageAlt" type="text" value="${s(e.imageAlt)}" />
        <p class="hint">Describe the photograph for screen readers and image search.</p>
      </div>
    </section>`}function _(e){return`
    <section class="section">
      <h2>Timing &amp; yield</h2>
      <div class="field-row">
        <div class="field">
          <label for="f-prep">Prep minutes</label>
          <input id="f-prep" name="prepMinutes" type="number" min="0" value="${e.prepMinutes}" />
        </div>
        <div class="field">
          <label for="f-cook">Cook minutes</label>
          <input id="f-cook" name="cookMinutes" type="number" min="0" value="${e.cookMinutes}" />
        </div>
        <div class="field">
          <label for="f-servings">Servings</label>
          <input id="f-servings" name="servings" type="number" min="1" value="${e.servings}" />
        </div>
        <div class="field">
          <label for="f-difficulty">Difficulty</label>
          <select id="f-difficulty" name="difficulty">
            ${G.map(t=>`<option value="${t}"${e.difficulty===t?" selected":""}>${t}</option>`).join("")}
          </select>
        </div>
      </div>
      <div class="field">
        <label for="f-yield">Yield text</label>
        <input id="f-yield" name="yieldText" type="text" value="${s(e.yieldText)}" />
      </div>
    </section>`}function K(e){return`
    <section class="section">
      <h2>Ingredients</h2>
      <div id="ingredientGroups">
        ${e.ingredients.map(C).join("")}
      </div>
      <button class="btn btn-sm" type="button" data-act="add-group">Add group</button>
    </section>`}function C(e){return`
    <div class="repeat-item" data-group>
      <div class="repeat-head">
        <input type="text" data-group-name placeholder="Group name (e.g. For the sauce)"
          value="${s(e.group)}" />
        <button class="btn btn-sm btn-danger" type="button" data-act="remove-group">Remove</button>
      </div>
      <textarea data-group-items rows="5"
        placeholder="One ingredient per line">${s(e.items.join(`
`))}</textarea>
    </div>`}function W(e){return`
    <section class="section">
      <h2>Instructions</h2>
      <div id="instructionSteps">
        ${e.instructions.map(P).join("")}
      </div>
      <button class="btn btn-sm" type="button" data-act="add-step">Add step</button>
    </section>`}function P(e){return`
    <div class="repeat-item" data-step>
      <div class="repeat-head">
        <span class="repeat-index" data-step-index></span>
        <input type="text" data-step-title placeholder="Step title" value="${s(e.title)}" />
        <button class="btn btn-sm btn-danger" type="button" data-act="remove-step">Remove</button>
      </div>
      <textarea data-step-text rows="3" placeholder="What to do">${s(e.text)}</textarea>
    </div>`}function Z(e){return`
    <section class="section">
      <h2>Nutrition</h2>
      <p class="hint">Per serving. These appear in the Recipe structured data.</p>
      <div class="field-row">
        ${[["calories","Calories"],["protein","Protein (g)"],["carbs","Carbs (g)"],["fat","Fat (g)"],["fiber","Fibre (g)"],["sugar","Sugar (g)"],["sodium","Sodium (mg)"]].map(([i,n])=>`
          <div class="field">
            <label for="f-n-${i}">${n}</label>
            <input id="f-n-${i}" data-nutrition="${i}" type="number" min="0"
              value="${e.nutrition[i]??0}" />
          </div>`).join("")}
      </div>
    </section>`}function X(e){return`
    <section class="section">
      <h2>Extras</h2>
      <div class="field">
        <label for="f-equipment">Equipment</label>
        <textarea id="f-equipment" name="equipment" rows="3"
          placeholder="One per line">${s(e.equipment.join(`
`))}</textarea>
      </div>
      <div class="field">
        <label for="f-tips">Tips</label>
        <textarea id="f-tips" name="tips" rows="4"
          placeholder="One per line">${s(e.tips.join(`
`))}</textarea>
      </div>
      <div class="field">
        <label for="f-variations">Variations</label>
        <textarea id="f-variations" name="variations" rows="4"
          placeholder="One per line">${s(e.variations.join(`
`))}</textarea>
      </div>
      <div class="field">
        <label for="f-storage">Storage</label>
        <textarea id="f-storage" name="storage" rows="3">${s(e.storage)}</textarea>
      </div>
      <div class="field">
        <label>FAQs</label>
        <div id="faqList">${e.faqs.map(D).join("")}</div>
        <button class="btn btn-sm" type="button" data-act="add-faq">Add FAQ</button>
      </div>
      <div class="field">
        <label for="f-related">Related recipes</label>
        <input id="f-related" name="related" type="text" value="${s(e.related.join(", "))}" />
        <p class="hint">
          Comma-separated slugs. Every one must exist, or the site will not build \u2014
          publishing checks this first.
        </p>
      </div>
    </section>`}function D(e){return`
    <div class="repeat-item" data-faq>
      <div class="repeat-head">
        <input type="text" data-faq-q placeholder="Question" value="${s(e.q)}" />
        <button class="btn btn-sm btn-danger" type="button" data-act="remove-faq">Remove</button>
      </div>
      <textarea data-faq-a rows="2" placeholder="Answer">${s(e.a)}</textarea>
    </div>`}function ee(e){let t=e.video??null;return`
    <section class="section">
      <h2>Video</h2>
      <p class="hint">
        Leave the URL empty and the recipe page shows its "Video coming soon"
        panel \u2014 never an error or an empty frame.
      </p>
      <div class="field">
        <label for="f-videoUrl">Video URL</label>
        <input id="f-videoUrl" name="videoUrl" type="text" value="${s(t?.url??"")}"
          placeholder="https://www.youtube.com/watch?v=\u2026 or assets/video/slug.mp4" />
        <p class="hint">A YouTube or Vimeo link is embedded; any other https URL is played directly.</p>
      </div>
      <div class="field-row">
        <div class="field">
          <label for="f-videoTitle">Caption</label>
          <input id="f-videoTitle" name="videoTitle" type="text" value="${s(t?.title??"")}" />
        </div>
        <div class="field">
          <label for="f-videoSeconds">Length (seconds)</label>
          <input id="f-videoSeconds" name="videoSeconds" type="number" min="0"
            value="${t?.seconds??""}" />
          <p class="hint">Optional, used in the VideoObject markup.</p>
        </div>
        <div class="field">
          <label for="f-videoPoster">Poster image URL</label>
          <input id="f-videoPoster" name="videoPoster" type="text"
            value="${s(t?.poster??"")}" />
        </div>
      </div>
    </section>`}function te(e,t,i,n){let r=a("#recipeForm",e);if(T(e),e.addEventListener("click",o=>{let l=o.target.closest("[data-act]");if(l)switch(l.dataset.act){case"add-group":a("#ingredientGroups",e).insertAdjacentHTML("beforeend",C({group:"",items:[]}));break;case"remove-group":l.closest("[data-group]")?.remove();break;case"add-step":a("#instructionSteps",e).insertAdjacentHTML("beforeend",P({title:"",text:""})),T(e);break;case"remove-step":l.closest("[data-step]")?.remove(),T(e);break;case"add-faq":a("#faqList",e).insertAdjacentHTML("beforeend",D({q:"",a:""}));break;case"remove-faq":l.closest("[data-faq]")?.remove();break;case"cancel":n.onDone();break;case"save":se(e,r,i,n);break;case"delete":ae(t,n);break}}),!i){let o=a("#f-title",e),l=a("#f-slug",e),p=!1;l.addEventListener("input",()=>{p=!0}),o.addEventListener("input",()=>{p||(l.value=o.value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,""))})}a("#f-imageFile",e)?.addEventListener("change",o=>{let l=o.target.files?.[0];l&&ie(e,l,n)})}function T(e){e.querySelectorAll("[data-step-index]").forEach((t,i)=>{t.textContent=String(i+1)})}async function ie(e,t,i){try{i.toast("Uploading image\u2026");let n=await q(t),{url:r}=await c.uploadImage(t.name,n);a("#f-image",e).value=r,a("#imagePreview",e).src=r,i.toast("Image uploaded. Save the recipe to keep it.")}catch(n){i.toast(n instanceof Error?n.message:"Upload failed",!0)}}function ne(e,t){let i=d=>{let h=t.elements.namedItem(d);return h instanceof HTMLInputElement||h instanceof HTMLTextAreaElement||h instanceof HTMLSelectElement?h.value.trim():""},n=d=>Number(i(d))||0,r=Array.from(e.querySelectorAll("[data-group]")).map(d=>({group:d.querySelector("[data-group-name]").value.trim(),items:f(d.querySelector("[data-group-items]").value)})).filter(d=>d.items.length),o=Array.from(e.querySelectorAll("[data-step]")).map(d=>({title:d.querySelector("[data-step-title]").value.trim(),text:d.querySelector("[data-step-text]").value.trim()})).filter(d=>d.text),l=Array.from(e.querySelectorAll("[data-faq]")).map(d=>({q:d.querySelector("[data-faq-q]").value.trim(),a:d.querySelector("[data-faq-a]").value.trim()})).filter(d=>d.q&&d.a),p={};e.querySelectorAll("[data-nutrition]").forEach(d=>{p[d.dataset.nutrition]=Number(d.value)||0});let S=i("videoUrl"),R=n("videoSeconds");return{slug:i("slug"),title:i("title"),description:i("description"),intro:i("intro"),category:i("category"),cuisine:i("cuisine"),course:i("course"),method:i("method"),diet:Array.from(e.querySelectorAll('input[name="diet"]:checked')).map(d=>d.value),keywords:E(i("keywords")),image:i("image")||null,imageAlt:i("imageAlt"),prepMinutes:n("prepMinutes"),cookMinutes:n("cookMinutes"),servings:n("servings")||1,yieldText:i("yieldText"),difficulty:i("difficulty"),nutrition:p,equipment:f(i("equipment")),ingredients:r,instructions:o,tips:f(i("tips")),variations:f(i("variations")),storage:i("storage"),faqs:l,related:E(i("related")),video:S?{url:S,...i("videoPoster")?{poster:i("videoPoster")}:{},...i("videoTitle")?{title:i("videoTitle")}:{},...R>0?{seconds:R}:{}}:null,published:a("#f-published",e)?.checked!==!1}}async function se(e,t,i,n){let r=a("#editorErrors",e);r.hidden=!0;let o=ne(e,t);try{i?await c.updateRecipe(i,o):await c.createRecipe(o),n.toast("Saved. Hit Publish to put it on the live site."),n.onDone()}catch(l){if(l instanceof m&&l.details.length){r.hidden=!1,r.innerHTML=`
        <div class="errors">
          <strong>${s(l.message)}</strong>
          <ul>${l.details.map(p=>`<li>${s(p)}</li>`).join("")}</ul>
        </div>`,r.scrollIntoView({behavior:"smooth",block:"center"});return}n.toast(l instanceof Error?l.message:"Could not save",!0)}}async function ae(e,t){if(window.confirm(`Delete "${e.title}" permanently?

Its page will disappear from the site at the next publish. Any other recipe listing it as related will stop doing so. This cannot be undone.`))try{await c.deleteRecipe(e.slug),t.toast(`Deleted ${e.title}.`),t.onDone()}catch(n){t.toast(n instanceof Error?n.message:"Could not delete",!0)}}var $=a("#signIn"),L=a("#app"),b=a("#toast"),U;function g(e,t=!1){window.clearTimeout(U),b.textContent=e,b.classList.toggle("is-error",t),b.hidden=!1,U=window.setTimeout(()=>{b.hidden=!0},t?8e3:4e3)}k(()=>{L.hidden=!0,$.hidden=!1});async function re(){try{let{user:e}=await c.session();N(e)}catch{$.hidden=!1}}function N(e){$.hidden=!0,L.hidden=!1,a("#whoami").textContent=e.email,y("dashboard")}a("#signInForm").addEventListener("submit",async e=>{e.preventDefault();let t=a("#signInButton"),i=a("#signInError"),n=a("#email").value.trim(),r=a("#password").value;i.hidden=!0,t.disabled=!0,t.textContent="Signing in\u2026";try{let{user:o}=await c.signIn(n,r);a("#password").value="",N(o)}catch(o){i.textContent=o instanceof Error?o.message:"Could not sign in",i.hidden=!1}finally{t.disabled=!1,t.textContent="Sign in"}});a("#signOutButton").addEventListener("click",async()=>{try{await c.signOut()}finally{L.hidden=!0,$.hidden=!1}});function y(e){["dashboard","recipes","rotd","editor"].forEach(t=>{a(`#view-${t}`).hidden=t!==e}),w(".tab").forEach(t=>{t.classList.toggle("is-active",t.getAttribute("data-view")===e)}),e==="dashboard"&&oe(),e==="recipes"&&j(),e==="rotd"&&O()}w(".tab").forEach(e=>{e.addEventListener("click",()=>y(e.getAttribute("data-view")))});async function oe(){let e=a("#view-dashboard");e.innerHTML='<p class="empty">Loading\u2026</p>';let t;try{t=await c.stats()}catch(n){e.innerHTML=`<p class="empty">${s(n instanceof Error?n.message:"Could not load")}</p>`;return}let i=Math.max(1,...t.daily.map(n=>n.views));e.innerHTML=`
    <h1>Dashboard</h1>

    <div class="grid grid-stats" style="margin-bottom:1.5rem">
      ${v(t.totals.recipes,"Published recipes")}
      ${v(t.totals.drafts,"Drafts")}
      ${v(t.views.today,"Views today")}
      ${v(t.views.week,"Views this week")}
      ${v(t.views.month,"Views this month")}
    </div>

    <div class="card" style="margin-bottom:1.5rem">
      <h2>Last 30 days</h2>
      ${t.daily.length?`<div class="spark">
             ${t.daily.map(n=>`
               <div class="spark-bar" style="height:${Math.round(n.views/i*100)}%"
                 title="${s(n.on_date)}: ${n.views} views"></div>`).join("")}
           </div>`:'<p class="hint">No views recorded yet. Data appears once the site is live.</p>'}
    </div>

    <div class="grid grid-2">
      <div class="card">
        <h2>Most read recipes</h2>
        ${x(t.topRecipes.map(n=>[n.slug,`${n.views} views`]),"No recipe views recorded yet.")}
      </div>
      <div class="card">
        <h2>Top searches</h2>
        ${x(t.topSearches.map(n=>[n.term,`${n.searches}\xD7`]),"No searches recorded yet.")}
      </div>
      <div class="card">
        <h2>Searches with no results</h2>
        <p class="hint">Recipes people looked for and the site does not have.</p>
        ${x(t.missedSearches.map(n=>[n.term,`${n.searches}\xD7`]),"Every search found something.")}
      </div>
    </div>`}var v=(e,t)=>`
  <div class="card">
    <div class="stat-value">${e}</div>
    <div class="stat-label">${s(t)}</div>
  </div>`,x=(e,t)=>e.length?`<table><tbody>${e.map(([i,n])=>`<tr><td>${s(i)}</td><td style="text-align:right">${s(n)}</td></tr>`).join("")}</tbody></table>`:`<p class="hint">${s(t)}</p>`;async function j(e=""){let t=a("#view-recipes"),i;try{({recipes:i}=await c.listRecipes(e))}catch(o){t.innerHTML=`<p class="empty">${s(o instanceof Error?o.message:"Could not load")}</p>`;return}t.innerHTML=`
    <div class="toolbar">
      <h1 style="margin:0">Recipes</h1>
      <input type="text" id="recipeSearch" placeholder="Filter by title or slug"
        value="${s(e)}" />
      <span class="hint">${i.length} recipe${i.length===1?"":"s"}</span>
      <button class="btn btn-primary spacer" id="newRecipe" type="button">New recipe</button>
    </div>

    <div class="card table-wrap">
      <table>
        <thead>
          <tr>
            <th></th><th>Title</th><th>Category</th><th>Time</th>
            <th>Video</th><th>Updated</th><th>Status</th><th></th>
          </tr>
        </thead>
        <tbody>
          ${i.map(le).join("")||'<tr><td colspan="8" class="empty">No recipes match.</td></tr>'}
        </tbody>
      </table>
    </div>`,a("#newRecipe").addEventListener("click",()=>F(null));let n=a("#recipeSearch"),r;n.addEventListener("input",()=>{window.clearTimeout(r),r=window.setTimeout(()=>{j(n.value.trim()).then(()=>{let o=a("#recipeSearch");o?.focus(),o?.setSelectionRange(o.value.length,o.value.length)})},200)}),t.querySelectorAll("[data-edit]").forEach(o=>{o.addEventListener("click",()=>F(o.dataset.edit))})}function le(e){return`
    <tr>
      <td>${e.image?`<img class="thumb" src="${s(e.image)}" alt="" loading="lazy" />`:'<span class="pill">art</span>'}</td>
      <td><strong>${s(e.title)}</strong><br /><span class="hint">${s(e.slug)}</span></td>
      <td>${s(e.category)}</td>
      <td>${e.totalMinutes} min</td>
      <td>${e.hasVideo?"\u2713":"\u2014"}</td>
      <td>${s(I(e.dateModified))}</td>
      <td><span class="pill ${e.published?"pill-live":"pill-draft"}">
        ${e.published?"Live":"Draft"}</span></td>
      <td><button class="btn btn-sm" type="button" data-edit="${s(e.slug)}">Edit</button></td>
    </tr>`}function F(e){y("editor"),A(a("#view-editor"),e,{toast:g,onDone:()=>y("recipes")})}async function O(){let e=a("#view-rotd"),t,i;try{({days:t,timezone:i}=await c.rotd())}catch(n){e.innerHTML=`<p class="empty">${s(n instanceof Error?n.message:"Could not load")}</p>`;return}e.innerHTML=`
    <h1>Recipe of the Day</h1>
    <p class="hint" style="margin-bottom:1rem">
      The day's recipe is chosen automatically and changes at midnight
      ${s(i)} time. Every visitor sees the same one, and refreshing
      cannot change it. Every recipe gets a turn before any repeats \u2014 so you
      only need to pin a date for something specific, like a holiday.
    </p>

    <div class="card table-wrap">
      <table>
        <thead>
          <tr><th>Date</th><th>Showing</th><th>Automatic pick</th><th>Pin a recipe</th><th></th></tr>
        </thead>
        <tbody>
          ${t.map(de).join("")}
        </tbody>
      </table>
    </div>`,e.querySelectorAll("[data-pin]").forEach(n=>{n.addEventListener("click",async()=>{let r=n.dataset.pin,l=e.querySelector(`[data-slug="${r}"]`).value.trim();try{l?await c.pinRotd(r,l):await c.unpinRotd(r),g(l?`Pinned ${l} to ${r}.`:`Cleared the pin on ${r}.`),O()}catch(p){g(p instanceof Error?p.message:"Could not update",!0)}})})}function de(e){return`
    <tr>
      <td><strong>${s(e.date)}</strong></td>
      <td>${s(e.effective??"\u2014")}
        ${e.pinned?'<span class="pill">pinned</span>':""}</td>
      <td class="hint">${s(e.computed??"\u2014")}</td>
      <td><input type="text" data-slug="${s(e.date)}" value="${s(e.pinned??"")}"
        placeholder="recipe-slug" /></td>
      <td><button class="btn btn-sm" type="button" data-pin="${s(e.date)}">Save</button></td>
    </tr>`}a("#publishButton").addEventListener("click",async()=>{let e=a("#publishButton");if(window.confirm(`Rebuild and publish the live site?

This regenerates every page from the current database contents. It usually takes a minute or two.`)){e.disabled=!0,e.textContent="Publishing\u2026";try{let i=await c.publish();g(i.note)}catch(i){i instanceof m&&i.details.length?g(`${i.message} (${i.details.join("; ")})`,!0):g(i instanceof Error?i.message:"Could not publish",!0)}finally{e.disabled=!1,e.textContent="Publish"}}});re();})();
//# sourceMappingURL=admin.js.map

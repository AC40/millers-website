import"./Astronav.astro_astro_type_script_index_0_lang.d73f7743.js";class r extends HTMLElement{shadowRoot;constructor(){super();const e=this.getCookie("cookie.map.accepted");let t="";e!==null&&(t="hidden"),this.shadowRoot=this.attachShadow({mode:"closed"});const i=document.createElement("style");i.textContent=`
                :root {
                    --speed: 150ms;
                }
                .cookie-banner-wrapper {
                    z-index: 1;
                    overflow: hidden;
                    height: 500px;
                    width: inherit;
                    position: relative;
                }
                .cookie-banner-wrapper::before {
                    position: absolute;
                    content: url('src/assets/millers/map.png');
                    opacity: 0.3;
                    object-fit: cover;
                    z-index: -1;
                }
                .cookie-banner-wrapper center {
                    padding: 20px;
                }
                .cookie-banner {
                    height: 500px;
                }
                .cookie-banner:hover {
                    opacity: 1;
                }
                .hidden{
                display: none;
                }
                .banner-title {
                    font-size: larger;
                    font-weight: 500;
                }
                .banner-text {
                    font-size: medium;
                    font-weight: 400;
                    margin: 10px 0 20px 0;
                }
                .cookie-confirm {
                    background-color: rgba(255, 255, 255, 0.196);
                    border: 2px solid green;
                    color: black;
                    padding: 10px;
                    font-size: large;
                    border-radius: 5px;
                }
                .cookie-confirm:hover {
                    background-color: green;
                    color: white;

                    -webkit-transition: background-color var(--speed) linear;
                    -o-transition: background-color var(--speed) linear;
                    -moz-transition: background-color var(--speed) linear;
                    transition: background-color var(--speed) linear;
                    -webkit-transition: color var(--speed) linear;
                    -o-transition: color var(--speed) linear;
                    -moz-transition: color var(--speed) linear;
                    transition: color var(--speed) linear;
                }
                button:hover{
                    cursor:pointer;
                }
            `,this.shadowRoot.appendChild(i.cloneNode(!0));const n=document.createElement("template");n.innerHTML=`
                <div class="cookie-banner ${t}">
                    <div class="cookie-banner-wrapper">
                        <center>
                            <slot name="title"><h3 class="banner-title">Karte Aktivieren</h3class="banner-title"></slot>
                            <slot name="text"><p class="banner-text">Beim anzeigen dieser Karte über den Service 'Google Maps', werden Cookies von drittanbietern genutzt. Klicke auf den Button unten um dein Einverständnis zu geben, dass nicht-notwendige Cookies verwendet werden dürfen.</p></slot>
                            <button class="cookie-confirm">Cookies bestätigen</button>
                        </center>
                    </div>    
                </div>
            `,this.shadowRoot.appendChild(n.content.cloneNode(!0))}connectedCallback(){const e=this;this.shadowRoot.querySelector("button.cookie-confirm").addEventListener("click",function(t){e.setCookie("cookie.map.required",!0,30),e.setCookie("cookie.map.accepted",!0,30),document!=null?document.getElementById("embedding-map-wrapper").innerHTML+=`<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3096.795593103269!2d8.87579599964047!3d52.31015809503097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47ba745c9e3f3d65%3A0x61c39557574948ad!2sTietzelweg%207%2C%2032425%20Minden!5e1!3m2!1sen!2sde!4v1680634939620!5m2!1sen!2sde"
						width="100%"
						height="500"
						style="border:0;"
						allowfullscreen=""
						loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"></iframe>`:console.log("oops"),e.hideCookieBanner()})}hideCookieBanner(){this.shadowRoot.querySelector(".cookie-banner").classList.add("hidden")}setCookie(e,t,i){let n="";if(i){let o=new Date;o.setTime(o.getTime()+i*24*60*60*1e3),n="; expires="+o.toUTCString()}document.cookie=e+"="+(t||"")+n+"; path=/"}getCookie(e){let t=e+"=",i=document.cookie.split(";");for(let n=0;n<i.length;n++){let o=i[n];for(;o.charAt(0)==" ";)o=o.substring(1,o.length);if(o.indexOf(t)==0)return o.substring(t.length,o.length)}return null}eraseCookie(e){document.cookie=e+"=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"}}customElements.define("cookie-banner",r);

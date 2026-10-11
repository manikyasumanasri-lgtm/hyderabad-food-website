document.addEventListener("DOMContentLoaded", () => {
    // Theme Toggle
    const themeToggle = document.getElementById("theme-toggle");
    const iconSun = document.getElementById("icon-sun");
    const iconMoon = document.getElementById("icon-moon");

    if (localStorage.getItem("theme") === "night") {
        document.body.classList.replace("theme-day", "theme-night");
        iconSun.classList.add("hidden");
        iconMoon.classList.remove("hidden");
    }

    themeToggle.addEventListener("click", () => {
        if (document.body.classList.contains("theme-day")) {
            document.body.classList.replace("theme-day", "theme-night");
            iconSun.classList.add("hidden");
            iconMoon.classList.remove("hidden");
            localStorage.setItem("theme", "night");
        } else {
            document.body.classList.replace("theme-night", "theme-day");
            iconMoon.classList.add("hidden");
            iconSun.classList.remove("hidden");
            localStorage.setItem("theme", "day");
        }
    });

    // Hero Typing Effect
    const titleText = "Taste of Hyderabad";
    const titleEl = document.getElementById("hero-title");
    let charIndex = 0;
    function typeTitle() {
        if (charIndex < titleText.length) {
            titleEl.textContent = titleText.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeTitle, 100);
        } else {
            titleEl.innerHTML = titleText + '<span class="typing-cursor"></span>';
        }
    }
    setTimeout(typeTitle, 500);

    document.getElementById("start-btn").addEventListener("click", () => {
        document.getElementById("filter-container").scrollIntoView({ behavior: 'smooth' });
    });

    // Render Stops
    const stopsContainer = document.getElementById("stops-container");

    function renderStops() {
        stopsContainer.innerHTML = "";
        dishData.forEach((dish, index) => {
            const stopEl = document.createElement("div");
            stopEl.className = `stop-card visible`;
            stopEl.classList.remove("visible");
            stopEl.setAttribute("data-category", dish.category);
            stopEl.setAttribute("data-diet", dish.diet);

            let interactionHTML = "";
            if (dish.id === "biryani") {
                interactionHTML = `
                    <div class="interaction-area">
                        <button class="btn-secondary interaction-btn" data-target="result-${dish.id}">Lift the Dum Lid 💨</button>
                        <div id="result-${dish.id}" class="interaction-result">Poof! ☁️ Fun Fact: Authentic dum biryani is cooked on firewood with hot coals on top for even heat.</div>
                    </div>`;
            }

            const savedRating = localStorage.getItem(`rating_${dish.id}`) || 0;
            let starsHTML = `<div class="stars" data-dish="${dish.id}">`;
            for (let i = 1; i <= 5; i++) {
                starsHTML += `<span class="star ${i <= savedRating ? "active" : ""}" data-val="${i}">★</span>`;
            }
            starsHTML += `</div>`;

            stopEl.innerHTML = `
                <div class="stop-marker">${index + 1}</div>
                <div class="stop-emoji">${dish.emoji}</div>
                <h3 class="stop-title">${dish.name}</h3>
                <p class="stop-story">${dish.story}</p>
                <div class="stop-details">
                    <span class="detail-badge">📍 ${dish.bestAt}</span>
                    <span class="detail-badge">🌶️ ${"🌶️".repeat(dish.spice) || "None"}</span>
                    <span class="detail-badge">🍬 ${"🍬".repeat(dish.sweet) || "None"}</span>
                </div>
                ${interactionHTML}
                <div class="rating-container">
                    <p>Rate this dish:</p>
                    ${starsHTML}
                </div>
            `;
            stopsContainer.appendChild(stopEl);
        });

        // Setup Interactions & Ratings
        document.querySelectorAll(".interaction-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const target = document.getElementById(e.target.getAttribute("data-target"));
                target.style.display = target.style.display === "block" ? "none" : "block";
            });
        });

        document.querySelectorAll(".star").forEach(star => {
            star.addEventListener("click", (e) => {
                const val = parseInt(e.target.getAttribute("data-val"));
                const container = e.target.parentElement;
                localStorage.setItem(`rating_${container.getAttribute("data-dish")}`, val);
                Array.from(container.children).forEach((s, idx) => {
                    s.classList.toggle("active", idx < val);
                });
            });
        });

        setupObserver();
    }
    renderStops();

    // Filters
    let currentFilter = "All";
    let currentDietFilter = "All";
    
    const typeBtns = document.querySelectorAll(".type-filter .filter-btn");
    const dietBtns = document.querySelectorAll(".diet-filter .filter-btn");

    function applyFilters(autoReset = true) {
        let visibleCount = 0;
        document.querySelectorAll(".stop-card").forEach(card => {
            const matchType = currentFilter === "All" || card.getAttribute("data-category") === currentFilter;
            const matchDiet = currentDietFilter === "All" || card.getAttribute("data-diet") === currentDietFilter;
            const match = matchType && matchDiet;
            
            card.style.display = match ? "block" : "none";
            if (match) {
                setTimeout(() => card.classList.add("visible"), 50);
                visibleCount++;
            } else {
                card.classList.remove("visible");
            }
        });

        // Auto-reset diet filter if a category selection results in 0 items
        if (visibleCount === 0 && autoReset && currentDietFilter !== "All") {
            currentDietFilter = "All";
            dietBtns.forEach(b => b.classList.toggle("active", b.getAttribute("data-diet") === "All"));
            return applyFilters(false);
        }

        document.getElementById("no-results").classList.toggle("hidden", visibleCount > 0);
        drawTrailLine();
    }

    typeBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const target = e.currentTarget;
            typeBtns.forEach(b => b.classList.remove("active"));
            target.classList.add("active");
            currentFilter = target.getAttribute("data-filter");
            applyFilters();
        });
    });

    dietBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const target = e.currentTarget;
            dietBtns.forEach(b => b.classList.remove("active"));
            target.classList.add("active");
            currentDietFilter = target.getAttribute("data-diet");
            applyFilters();
        });
    });

    // Intersection Observer
    function setupObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add("visible");
            });
        }, { threshold: 0.1 });
        document.querySelectorAll(".stop-card").forEach(card => observer.observe(card));
    }

    // Trail Line Drawing
    function drawTrailLine() {
        const path = document.getElementById("trail-path");
        const cards = Array.from(document.querySelectorAll(".stop-card")).filter(c => c.style.display !== "none");
        if (cards.length < 2) { path.setAttribute("d", ""); return; }
        
        const rect = stopsContainer.getBoundingClientRect();
        let d = `M 2 0`;
        cards.forEach(card => {
            const cardRect = card.getBoundingClientRect();
            d += ` L 2 ${(cardRect.top - rect.top) + (cardRect.height / 2)}`;
        });
        d += ` L 2 ${rect.height}`;
        path.setAttribute("d", d);
        document.querySelector(".trail-line-svg").style.height = rect.height + "px";
    }
    window.addEventListener("resize", drawTrailLine);
    setTimeout(drawTrailLine, 500);

    // Scroll Progress & SVG Dash Offset Animation
    const progressBar = document.getElementById("progress-bar");
    const trailPath = document.getElementById("trail-path");
    
    window.addEventListener("scroll", () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        progressBar.style.width = (height > 0 ? (winScroll / height) * 100 : 0) + "%";
        
        // Simple trail reveal animation could go here by adjusting dashoffset based on scroll
    });

    // Quiz Logic
    let currentQuestion = 0, scores = {};
    const qContainer = document.getElementById("quiz-question-container");
    const qResult = document.getElementById("quiz-result");
    
    document.getElementById("start-quiz-btn").addEventListener("click", () => {
        scores = {}; dishData.forEach(d => scores[d.id] = 0);
        currentQuestion = 0;
        document.getElementById("quiz-intro").classList.add("hidden");
        qResult.classList.add("hidden");
        qContainer.classList.remove("hidden");
        showQuestion();
    });

    function showQuestion() {
        if(currentQuestion >= quizQuestions.length) return showResult();
        const q = quizQuestions[currentQuestion];
        document.getElementById("question-text").innerText = q.question;
        document.getElementById("quiz-progress").style.width = `${(currentQuestion / quizQuestions.length) * 100}%`;
        
        const optsContainer = document.getElementById("options-container");
        optsContainer.innerHTML = "";
        q.options.forEach(opt => {
            const btn = document.createElement("button");
            btn.className = "quiz-option";
            btn.innerText = opt.text;
            btn.addEventListener("click", () => {
                for (const [id, score] of Object.entries(opt.scores)) scores[id] += score;
                currentQuestion++;
                showQuestion();
            });
            optsContainer.appendChild(btn);
        });
    }

    function showResult() {
        qContainer.classList.add("hidden");
        qResult.classList.remove("hidden");
        document.getElementById("quiz-progress").style.width = "100%";

        let topDishId = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
        const match = dishData.find(d => d.id === topDishId) || dishData[0];
        
        document.getElementById("result-dish-name").innerText = match.name;
        document.getElementById("result-emoji").innerText = match.emoji;
        
        let desc = match.spice > 3 ? "You're fiery and bold!" : (match.sweet > 3 ? "You're sweet and comforting." : "You're complex and loved by everyone.");
        document.getElementById("result-desc").innerText = desc;
        
        const percent = Math.min(Math.round((scores[topDishId] / (quizQuestions.length * 3)) * 100) + 10, 99);
        document.getElementById("result-match").innerText = percent;
        localStorage.setItem("quizResult", match.id);
    }

    document.getElementById("retake-quiz-btn").addEventListener("click", () => document.getElementById("start-quiz-btn").click());
    
    document.getElementById("share-quiz-btn").addEventListener("click", async () => {
        const text = `I got ${document.getElementById("result-dish-name").innerText} on the Hyderabad Food Trail Quiz!`;
        if (navigator.share && window.location.protocol !== 'file:') {
            try { await navigator.share({ title: 'Hyderabad Food Trail', text: text, url: window.location.href }); } catch(e){}
        } else {
            navigator.clipboard.writeText(text + " " + window.location.href);
            alert("Result copied to clipboard!");
        }
    });

    // Fact & Confetti
    const canvas = document.getElementById("confetti-canvas");
    const ctx = canvas.getContext("2d");
    function resizeCanvas() { canvas.width = canvas.parentElement.offsetWidth; canvas.height = canvas.parentElement.offsetHeight; }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    document.getElementById("fact-btn").addEventListener("click", () => {
        document.getElementById("fact-display").innerText = foodFacts[Math.floor(Math.random() * foodFacts.length)];
        document.getElementById("fact-display").classList.remove("hidden");
        
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            let particles = Array.from({length: 40}, () => ({
                x: canvas.width / 2, y: canvas.height - 20, r: Math.random() * 6 + 2,
                dx: Math.random() * 10 - 5, dy: Math.random() * -10 - 5,
                color: ['#F4A300', '#5B0E1D', '#0F6B54', '#FFF'][Math.floor(Math.random() * 4)]
            }));
            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                let active = 0;
                particles.forEach(p => {
                    p.x += p.dx; p.y += p.dy; p.dy += 0.5;
                    if (p.y < canvas.height) {
                        active++;
                        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = p.color; ctx.fill();
                    }
                });
                if (active > 0) requestAnimationFrame(animate);
                else ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            animate();
        }
    });
});

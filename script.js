// ===== Climate Facts Database - East Africa & Uganda Focused =====
const climateFacts = [
    "🇺🇬 Uganda is Africa's source of the Nile River, which 11 countries depend on! Protecting Uganda's forests protects water security for 400+ million people!",
    "🇺🇬 Kampala's rainfall has become increasingly unpredictable due to climate change. Planting trees in urban areas can reduce temperatures by 2-3°C!",
    "🦁 East Africa's wildlife depends on stable ecosystems - the Great Migration of 1.5 million animals is already shifting due to climate change.",
    "🌳 Uganda's forests store massive amounts of carbon. The Budongo Forest can absorb carbon equal to removing 100,000 cars from roads annually!",
    "🇪🇦 East Africa faces severe droughts every 3-5 years. Climate adaptation farming techniques help communities maintain food security.",
    "🌾 Traditional East African agro-forestry (mixing crops with trees) increases soil resilience by 40% against droughts!",
    "💧 Lake Victoria, shared by Uganda, Tanzania & Kenya, is warming 1°C faster than the global ocean average - affecting fish populations!",
    "🇺🇬 Rwanda's plastic ban reduced landfill waste by 80%! Uganda is following suit - say no to single-use plastics!",
    "🦓 The migration corridor of zebras and wildebeest in East Africa requires protection from grazing land degradation caused by climate change.",
    "☀️ East Africa has some of the world's best solar potential! Solar energy could power 85% of Uganda's electricity by 2040.",
    "🇺🇬 Uganda's Mt. Rwenzori's glaciers have shrunk 85% in 100 years due to climate change - a visible sign of our warming planet!",
    "🌊 Rising Lake Victoria levels threaten homes and livelihoods of 30 million people across East Africa - climate action is survival!",
    "🌳 Restoring degraded lands in East Africa through tree-planting creates jobs AND fights climate change - it's a win-win!",
    "🇺🇬 Kampala's 'green belt' initiative aims to plant 1 million trees by 2025. Join the movement in your community!",
    "🐘 East Africa's elephants migrate hundreds of kilometers for water. Climate-resilient water sources protect entire ecosystems!",
    "🧑‍🌾 Ugandan farmers practicing conservation agriculture increase yields by 30% while reducing water use by 25% - climate smart!",
    "🌍 East Africa's population growth (fastest in the world) means we MUST innovate sustainable solutions - solar cooking, water harvesting!",
    "🇺🇬 Uganda's coffee industry (worth $500M+) faces climate stress. Shade-grown coffee protects both farmers AND biodiversity!",
    "🏞️ The Serengeti-Mara ecosystem spans Uganda, Kenya & Tanzania - protecting it protects one of Earth's last great wildernesses!",
    "💨 Air pollution in Kampala rivals major Asian cities. Switching to electric transport now protects future generations!",
    "🌺 Uganda's indigenous plants have adapted to climate extremes for millennia - let's learn and protect this knowledge!",
    "🇪🇦 East African youth are leading climate action! Young innovators are creating solar chargers, water filters & sustainable businesses.",
    "🏭 Kenya's geothermal energy provides 40% of electricity! East Africa's geothermal potential is huge - let's tap it!",
    "🌾 Crop rotation and mulching (ancient East African techniques) build soil health and reduce climate vulnerability by 50%!",
    "🐠 Lake Tanganyika (shared with DRC, Tanzania, Zambia) is losing fish species due to warming waters - marine protection is climate action!",
    "🇺🇬 Kampala's informal settlements are most vulnerable to flooding. Green infrastructure (rain gardens) protects communities!",
    "🎋 Bamboo grows faster than trees and sequesters 35% more CO₂! East Africa's bamboo farming is a climate superpower!",
    "🌅 East Africa's morning markets show incredible biodiversity - but only if we protect the ecosystems that support them!",
    "🏊 Water scarcity affects 40 million East Africans. Every liter saved today = life saved tomorrow!",
    "🇺🇬 Uganda's Mahai Swamps are Earth's kidneys - they filter water and store carbon. Protect wetlands, protect our future!"
];

// ===== Local Storage Management =====
function initializeStorage() {
    if (!localStorage.getItem('climateStats')) {
        localStorage.setItem('climateStats', JSON.stringify({
            actionsCompleted: 0,
            co2Saved: 0,
            peopleInspired: 0,
            factIndex: 0,
            challengesCompleted: []
        }));
    }
}

function getStats() {
    return JSON.parse(localStorage.getItem('climateStats'));
}

function updateStats(stats) {
    localStorage.setItem('climateStats', JSON.stringify(stats));
}

// ===== Fact Management =====
function getRandomFact() {
    const stats = getStats();
    const randomIndex = Math.floor(Math.random() * climateFacts.length);
    stats.factIndex = randomIndex;
    updateStats(stats);
    
    const factText = document.getElementById('fact-text');
    const factCounter = document.getElementById('fact-counter');
    
    // Add fade out effect
    factText.style.opacity = '0';
    
    setTimeout(() => {
        factText.textContent = climateFacts[randomIndex];
        factCounter.textContent = `Fact #${randomIndex + 1}`;
        factText.style.opacity = '1';
        factText.style.transition = 'opacity 0.5s ease-in';
    }, 300);
}

function displayDailyFact() {
    const stats = getStats();
    const today = new Date().toDateString();
    
    // Check if we've already shown a fact today
    if (!localStorage.getItem('lastFactDate') || localStorage.getItem('lastFactDate') !== today) {
        const randomIndex = Math.floor(Math.random() * climateFacts.length);
        stats.factIndex = randomIndex;
        updateStats(stats);
        localStorage.setItem('lastFactDate', today);
    }
    
    document.getElementById('fact-text').textContent = climateFacts[stats.factIndex];
    document.getElementById('fact-counter').textContent = `Fact #${stats.factIndex + 1}`;
}

function shareFact() {
    const stats = getStats();
    const factText = climateFacts[stats.factIndex];
    const shareText = `🌍 Climate Budd East Africa Fact: ${factText} Join me in becoming a Climate Champion! 🌱`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Climate Budd - Daily East African Climate Fact',
            text: shareText
        });
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(shareText);
        alert('Fact copied to clipboard! Share it with your friends!');
    }
}

// ===== Challenge Management =====
function completeChallenge(button) {
    const stats = getStats();
    const challengeName = button.parentElement.parentElement.querySelector('h3').textContent;
    
    // Calculate CO2 savings based on challenge
    const co2SavingsMap = {
        'Reduce Plastic Waste': 0.5,
        'Sustainable Transport': 2.5,
        'Save Energy': 1.2,
        'Plant Native Trees': 0.8,
        'Eco Food Choice': 1.5,
        'Water Conservation': 1.0,
        'Spread Awareness': 0.1
    };
    
    if (!stats.challengesCompleted.includes(challengeName)) {
        stats.actionsCompleted++;
        stats.co2Saved += co2SavingsMap[challengeName] || 0.5;
        stats.peopleInspired = Math.floor(stats.actionsCompleted / 2);
        stats.challengesCompleted.push(challengeName);
        updateStats(stats);
        
        // Update UI
        button.textContent = '✓ Completed';
        button.classList.add('completed');
        button.disabled = true;
        
        // Trigger celebration
        celebrateCompletion(button);
    }
    
    updateLeaderboard();
}

function celebrateCompletion(element) {
    // Create confetti effect with African-inspired emojis
    const celebrations = ['🎉', '🌍', '🌱', '🦁', '🦓', '⭐', '🌟', '✨'];
    
    for (let i = 0; i < 5; i++) {
        const confetti = document.createElement('div');
        confetti.textContent = celebrations[Math.floor(Math.random() * celebrations.length)];
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-50px';
        confetti.style.fontSize = '2rem';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.animation = 'fall 3s ease-in forwards';
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3000);
    }
    
    // Show notification
    showNotification('🌍 Asante! Well done, Climate Champion! Every action counts! 🌱');
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #D4A574, #8B6F47);
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.5s ease;
        border-left: 5px solid #FF6B35;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.5s ease reverse';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// ===== Leaderboard Updates =====
function updateLeaderboard() {
    const stats = getStats();
    
    document.getElementById('total-actions').textContent = stats.actionsCompleted;
    document.getElementById('co2-saved').textContent = stats.co2Saved.toFixed(1);
    document.getElementById('people-inspired').textContent = stats.peopleInspired;
    
    // Update champion tier
    let championsHtml = '';
    if (stats.actionsCompleted >= 150) {
        championsHtml = '<li>🥇 You! Simba of Climate - ' + stats.actionsCompleted + ' actions</li>';
    } else if (stats.actionsCompleted >= 100) {
        championsHtml = '<li>🥇 You! Guardian of Nature - ' + stats.actionsCompleted + ' actions</li>';
    } else if (stats.actionsCompleted >= 50) {
        championsHtml = '<li>🥇 You! Friend of Earth - ' + stats.actionsCompleted + ' actions</li>';
    } else if (stats.actionsCompleted > 0) {
        championsHtml = '<li>🌱 You! Climate Starter - ' + stats.actionsCompleted + ' actions</li>';
    }
    
    championsHtml += '<li>🦁 East Africa Warriors - 150+ actions</li>';
    championsHtml += '<li>🌍 Global Champions - 100+ actions</li>';
    
    document.getElementById('champions').innerHTML = championsHtml;
}

// ===== Smooth Scrolling =====
function scrollToFact() {
    document.getElementById('daily-fact').scrollIntoView({ behavior: 'smooth' });
}

// ===== Journey Starter =====
function startJourney() {
    showNotification('🌍 Jambo! Welcome to your climate action journey! 🌱');
    scrollToFact();
}

// ===== Event Listeners and Initialization =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize
    initializeStorage();
    displayDailyFact();
    updateLeaderboard();
    
    // Add animation to fact card on load
    const factCard = document.querySelector('.fact-card');
    factCard.style.animation = 'slideInUp 0.8s ease';
    
    // Add scroll animation to challenges
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.challenge-card, .tip-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
    
    // Daily greeting in Swahili
    const hour = new Date().getHours();
    let greeting = 'Habari ya asubuhi';
    if (hour >= 12) greeting = 'Habari ya mchana';
    if (hour >= 18) greeting = 'Habari ya jioni';
    
    console.log(`%c${greeting}! Karibu Climate Budd 🌍🦁`, 'color: #D4A574; font-size: 16px; font-weight: bold;');
});

// ===== Add CSS Animation to Stylesheet =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideInUp {
        from {
            transform: translateY(30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes fall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes pulse-glow {
        0%, 100% {
            box-shadow: 0 0 10px rgba(212, 165, 116, 0.3);
        }
        50% {
            box-shadow: 0 0 30px rgba(212, 165, 116, 0.6);
        }
    }
`;
document.head.appendChild(style);

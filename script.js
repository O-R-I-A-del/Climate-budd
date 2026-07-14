// ===== Climate Facts Database =====
const climateFacts = [
    "Renewable energy now accounts for 30% of global electricity generation!",
    "Planting trees is a proven way to fight climate change - one tree absorbs 48 lbs of CO₂ annually!",
    "Electric vehicles produce 50% fewer emissions over their lifetime than gas cars.",
    "Carpooling 5 days a week can reduce your carbon footprint by 2 metric tons per year!",
    "LED bulbs use 75% less energy than traditional incandescent bulbs and last 25 times longer.",
    "It takes 2,700 liters of water to make one cotton t-shirt. Buy less, choose sustainable!",
    "Eating one plant-based meal per day can reduce your carbon footprint by 0.5 metric tons per year!",
    "Ocean temperatures have risen by 1.4°F (0.8°C) over the last 100 years.",
    "Switching to renewable energy sources could prevent 7 million premature deaths per year.",
    "A single plastic bottle takes 450+ years to decompose in the ocean.",
    "Global renewable energy capacity grew by 45% in the last 5 years!",
    "Recycling 1 ton of paper saves 17 trees, 7,000 gallons of water, and 463 gallons of oil.",
    "Wind power is the fastest-growing energy source globally!",
    "Methane is 25 times more potent than CO₂ at trapping heat in the atmosphere.",
    "3 in 4 renewable energy projects are cost-competitive with fossil fuels.",
    "By 2030, solar could be the single largest source of electricity in many countries!",
    "Composting reduces landfill waste by 30% and creates nutrient-rich soil.",
    "Your digital footprint matters - watching videos online generates carbon emissions!",
    "Bike commuting just once a month reduces CO₂ by 48kg annually!",
    "Switching to a plant-based diet is one of the most impactful personal changes you can make.",
    "Green roofs reduce building energy consumption by up to 30%!",
    "By 2050, climate change could displace 1 billion people - act now!",
    "Sustainable fashion could reduce water consumption by 80% industry-wide.",
    "Coral reefs support 25% of marine life but cover less than 1% of the ocean floor.",
    "Home insulation improvements can reduce heating/cooling energy use by 15-20%.",
    "Tipping points in climate systems could trigger irreversible changes - we must act now!",
    "A vegan diet requires 1/3 the land of a meat-based diet!",
    "Solar energy installations are growing 3x faster than fossil fuel capacity!",
    "Reducing meat consumption by 50% can lower your food carbon footprint by 75%!",
    "Climate action creates 3 jobs for every 1 job in fossil fuels."
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
    const shareText = `🌍 Climate Budd Fun Fact: ${factText} Join me in becoming a Climate Champion! 🌱`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Climate Budd - Daily Climate Fact',
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
        'Reduce Waste': 0.5,
        'Active Transport': 2.5,
        'Save Energy': 1.2,
        'Plant Connection': 0.3,
        'Eco Food Choice': 1.5,
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
    // Create confetti effect
    const confetti = document.createElement('div');
    confetti.textContent = '🎉';
    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-50px';
    confetti.style.fontSize = '2rem';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '9999';
    document.body.appendChild(confetti);
    
    // Animate falling
    let top = -50;
    const interval = setInterval(() => {
        top += 5;
        confetti.style.top = top + 'px';
        confetti.style.opacity = 1 - (top / window.innerHeight);
        
        if (top > window.innerHeight) {
            clearInterval(interval);
            confetti.remove();
        }
    }, 30);
    
    // Show notification
    showNotification('Challenge Completed! Great job, Climate Champion! 🌱');
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #2ecc71, #27ae60);
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.5s ease;
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
        championsHtml = '<li>🥇 You! Climate Warrior - ' + stats.actionsCompleted + ' actions</li>';
    } else if (stats.actionsCompleted >= 100) {
        championsHtml = '<li>🥇 You! Green Guardian - ' + stats.actionsCompleted + ' actions</li>';
    } else if (stats.actionsCompleted >= 50) {
        championsHtml = '<li>🥇 You! Earth Protector - ' + stats.actionsCompleted + ' actions</li>';
    } else if (stats.actionsCompleted > 0) {
        championsHtml = '<li>🌱 You! Climate Starter - ' + stats.actionsCompleted + ' actions</li>';
    }
    
    championsHtml += '<li>🥈 Community Warriors - 150+ actions</li>';
    championsHtml += '<li>🥉 Global Heroes - 100+ actions</li>';
    
    document.getElementById('champions').innerHTML = championsHtml;
}

// ===== Smooth Scrolling =====
function scrollToFact() {
    document.getElementById('daily-fact').scrollIntoView({ behavior: 'smooth' });
}

// ===== Journey Starter =====
function startJourney() {
    showNotification('Welcome to your climate action journey! 🌍 Start with today\'s challenges!');
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
    
    // Daily greeting
    const hour = new Date().getHours();
    let greeting = 'Good morning';
    if (hour >= 12) greeting = 'Good afternoon';
    if (hour >= 18) greeting = 'Good evening';
    
    console.log(`%c${greeting}! Welcome to Climate Budd 🌍`, 'color: #2ecc71; font-size: 16px; font-weight: bold;');
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
`;
document.head.appendChild(style);
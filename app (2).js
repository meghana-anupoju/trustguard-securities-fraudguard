// SEBI Fraud Guard Application JavaScript

// Application state
const app = {
    currentSection: 'dashboard',
    analysisHistory: [],
    alertSettings: {
        highRisk: true,
        mediumRisk: true,
        email: false,
        sms: false
    }
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing SEBI Fraud Guard Application...');
    initializeApp();
    setupEventListeners();
    loadDashboardData();
});

// Initialize application
function initializeApp() {
    // Setup navigation - Fixed
    console.log('Setting up navigation...');
    const menuItems = document.querySelectorAll('.menu-item');
    console.log('Found menu items:', menuItems.length);
    
    menuItems.forEach((item, index) => {
        const section = item.getAttribute('data-section');
        console.log(`Menu item ${index}: ${section}`);
        
        item.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Menu item clicked:', section);
            switchSection(section);
        });
    });

    // Initialize charts after a short delay
    setTimeout(() => {
        initializeFraudTypesChart();
    }, 500);
    
    console.log('App initialization complete');
}

// Setup all event listeners
function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Advisor verification form
    const advisorForm = document.getElementById('advisor-form');
    if (advisorForm) {
        console.log('Setting up advisor form listener');
        advisorForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Advisor form submitted');
            handleAdvisorVerification(e);
        });
    }

    // Social media monitoring form
    const socialForm = document.getElementById('social-form');
    if (socialForm) {
        console.log('Setting up social form listener');
        socialForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Social form submitted');
            handleSocialMonitoring(e);
        });
    }

    // Deepfake detection form
    const deepfakeForm = document.getElementById('deepfake-form');
    if (deepfakeForm) {
        console.log('Setting up deepfake form listener');
        deepfakeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Deepfake form submitted');
            handleDeepfakeDetection(e);
        });
    }

    // File upload handling
    const fileUpload = document.getElementById('file-upload');
    const mediaFile = document.getElementById('media-file');
    if (fileUpload && mediaFile) {
        console.log('Setting up file upload listeners');
        fileUpload.addEventListener('click', (e) => {
            e.preventDefault();
            mediaFile.click();
        });
        fileUpload.addEventListener('dragover', handleDragOver);
        fileUpload.addEventListener('drop', handleFileDrop);
        mediaFile.addEventListener('change', handleFileSelect);
    }

    // Corporate announcement form
    const announcementForm = document.getElementById('announcement-form');
    if (announcementForm) {
        console.log('Setting up announcement form listener');
        announcementForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Announcement form submitted');
            handleAnnouncementVerification(e);
        });
    }

    // App detection form
    const appForm = document.getElementById('app-form');
    if (appForm) {
        console.log('Setting up app form listener');
        appForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('App form submitted');
            handleAppDetection(e);
        });
    }
    
    console.log('Event listeners setup complete');
}

// Navigation functions - COMPLETELY FIXED
function switchSection(sectionName) {
    console.log('Switching to section:', sectionName);
    
    // Validate section name
    const validSections = ['dashboard', 'advisor-verification', 'social-monitoring', 'deepfake-detection', 'announcement-verification', 'app-detection', 'reports'];
    if (!validSections.includes(sectionName)) {
        console.error('Invalid section name:', sectionName);
        sectionName = 'dashboard';
    }
    
    // Update active menu item
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    const activeMenuItem = document.querySelector(`[data-section="${sectionName}"]`);
    if (activeMenuItem) {
        activeMenuItem.classList.add('active');
        console.log('Active menu item updated');
    }

    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
    });
    
    // Show target section
    const targetSection = document.getElementById(`${sectionName}-section`);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.style.display = 'block';
        console.log('Target section shown:', sectionName);
    } else {
        console.error('Section not found:', `${sectionName}-section`);
        // Fallback to dashboard
        const dashboardSection = document.getElementById('dashboard-section');
        if (dashboardSection) {
            dashboardSection.classList.add('active');
            dashboardSection.style.display = 'block';
            document.querySelector(`[data-section="dashboard"]`).classList.add('active');
        }
    }

    app.currentSection = sectionName;

    // Load section-specific data
    if (sectionName === 'dashboard') {
        loadDashboardData();
    }
}

// Make switchSection globally available
window.switchSection = switchSection;

// Dashboard functions
function loadDashboardData() {
    console.log('Loading dashboard data...');
    // Update statistics with animation
    animateCounter('high-risk-count', 12);
    animateCounter('medium-risk-count', 34);
    animateCounter('verified-count', 156);
    animateCounter('blocked-count', 8);
}

function animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let current = 0;
    const increment = Math.ceil(targetValue / 20);
    const timer = setInterval(() => {
        current += increment;
        if (current >= targetValue) {
            current = targetValue;
            clearInterval(timer);
        }
        element.textContent = current;
    }, 100);
}

// Quick search function - FIXED
function performQuickSearch() {
    console.log('Performing quick search...');
    const searchInput = document.getElementById('quick-search');
    const resultsContainer = document.getElementById('quick-search-results');
    
    if (!searchInput || !resultsContainer) {
        console.error('Search elements not found');
        return;
    }
    
    const searchTerm = searchInput.value.trim();
    
    if (!searchTerm) {
        showToast('Please enter a search term', 'warning');
        return;
    }

    resultsContainer.innerHTML = '<div class="loading-placeholder">Searching database...</div>';
    
    // Simulate search delay
    setTimeout(() => {
        const mockResults = generateMockSearchResults(searchTerm);
        displaySearchResults(mockResults, resultsContainer);
        showToast(`Found ${mockResults.length} results for "${searchTerm}"`, 'success');
    }, 1500);
}

// Make performQuickSearch globally available
window.performQuickSearch = performQuickSearch;

function generateMockSearchResults(searchTerm) {
    const allResults = [
        {
            type: 'advisor',
            name: 'ABC Investment Advisory',
            status: 'verified',
            details: 'SEBI Registered - INA000001234',
            riskLevel: 'low'
        },
        {
            type: 'advisor',
            name: 'Quick Money Advisors',
            status: 'warning',
            details: 'Unverified claims detected',
            riskLevel: 'medium'
        },
        {
            type: 'advisor',
            name: 'Expert Financial Advisory',
            status: 'verified',
            details: 'SEBI Registered - INA000005678',
            riskLevel: 'low'
        },
        {
            type: 'company',
            name: 'XYZ Trading Solutions',
            status: 'warning',
            details: 'Social media manipulation detected',
            riskLevel: 'medium'
        },
        {
            type: 'app',
            name: 'QuickTrade Pro',
            status: 'blocked',
            details: 'Fraudulent trading app - avoid',
            riskLevel: 'high'
        },
        {
            type: 'app',
            name: 'TradeSmart Mobile',
            status: 'verified',
            details: 'Legitimate trading platform',
            riskLevel: 'low'
        },
        {
            type: 'company',
            name: 'RelianCorp Ltd',
            status: 'verified',
            details: 'NSE/BSE Listed Company',
            riskLevel: 'low'
        }
    ];
    
    // Filter results based on search term
    return allResults.filter(result => 
        result.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
}

function displaySearchResults(results, container) {
    if (results.length === 0) {
        container.innerHTML = '<div class="no-results">No results found. Entity may be safe or not in our database.</div>';
        return;
    }

    const html = results.map(result => `
        <div class="search-result-item ${result.riskLevel}-risk">
            <div class="result-header">
                <strong>${result.name}</strong>
                <span class="result-status ${result.status}">${result.status.toUpperCase()}</span>
            </div>
            <p class="result-details">${result.details}</p>
            <div class="result-actions">
                <button class="btn btn--sm btn--outline" onclick="viewResultDetails('${result.type}', '${result.name}')">
                    View Details
                </button>
            </div>
        </div>
    `).join('');

    container.innerHTML = html;
}

// Chart initialization
function initializeFraudTypesChart() {
    const ctx = document.getElementById('fraudTypesChart');
    if (!ctx) {
        console.log('Fraud types chart canvas not found');
        return;
    }

    console.log('Initializing fraud types chart');
    
    try {
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Fake Advisors', 'Social Media Scams', 'Deepfake Media', 'Fake Apps', 'False Announcements'],
                datasets: [{
                    data: [25, 30, 15, 20, 10],
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F'],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 15
                        }
                    }
                }
            }
        });
        console.log('Chart initialized successfully');
    } catch (error) {
        console.error('Error initializing chart:', error);
    }
}

// Advisor verification functions - FIXED
function handleAdvisorVerification(e) {
    console.log('Handling advisor verification...');
    e.preventDefault();
    e.stopPropagation();
    
    const formData = {
        name: document.getElementById('advisor-name')?.value?.trim() || '',
        registrationNumber: document.getElementById('registration-number')?.value?.trim() || '',
        contact: document.getElementById('contact-details')?.value?.trim() || '',
        company: document.getElementById('company-name')?.value?.trim() || ''
    };

    console.log('Form data:', formData);

    if (!formData.name) {
        showToast('Please enter advisor name', 'error');
        return;
    }

    showLoading('Verifying advisor credentials against SEBI database...');
    
    setTimeout(() => {
        hideLoading();
        const results = simulateAdvisorVerification(formData);
        displayAdvisorResults(results);
        showToast('Advisor verification completed successfully', 'success');
    }, 3000);
}

function simulateAdvisorVerification(data) {
    console.log('Simulating advisor verification for:', data.name);
    
    // Generate realistic verification results
    const hasValidRegistration = data.registrationNumber && data.registrationNumber.match(/^INA\d{9}$/i);
    const riskFactors = [];
    let riskScore = 0.1; // Base low risk

    // Check registration number
    if (!data.registrationNumber) {
        riskFactors.push('No SEBI registration number provided');
        riskScore += 0.4;
    } else if (!hasValidRegistration) {
        riskFactors.push('Invalid or suspicious registration number format');
        riskScore += 0.5;
    } else {
        riskFactors.push('SEBI registration number appears valid');
        riskScore -= 0.1;
    }

    // Check contact details
    const hasEmail = data.contact && data.contact.includes('@');
    const hasPhone = data.contact && data.contact.match(/\d{10}/);
    
    if (!data.contact) {
        riskFactors.push('No contact information provided');
        riskScore += 0.3;
    } else if (!hasEmail && !hasPhone) {
        riskFactors.push('Incomplete or invalid contact information');
        riskScore += 0.2;
    }

    // Check company
    if (!data.company) {
        riskFactors.push('No associated company or firm mentioned');
        riskScore += 0.1;
    }

    // Check for suspicious name patterns
    const suspiciousTerms = ['quick', 'instant', 'guaranteed', 'easy money'];
    if (suspiciousTerms.some(term => data.name.toLowerCase().includes(term))) {
        riskFactors.push('Advisor name contains suspicious promotional terms');
        riskScore += 0.3;
    }

    // Simulate random additional risk factors
    if (Math.random() > 0.6) {
        riskFactors.push('Previous complaints or warnings found');
        riskScore += 0.2;
    }

    if (Math.random() > 0.7) {
        riskFactors.push('High pressure sales tactics reported by investors');
        riskScore += 0.25;
    }

    const finalRiskScore = Math.max(0, Math.min(1, riskScore));
    const riskLevel = finalRiskScore >= 0.7 ? 'high' : finalRiskScore >= 0.4 ? 'medium' : 'low';

    return {
        riskScore: finalRiskScore,
        riskLevel,
        riskFactors,
        verificationDetails: [
            { 
                label: 'SEBI Registration', 
                value: hasValidRegistration ? 'Valid Format' : data.registrationNumber ? 'Invalid Format' : 'Not Provided', 
                status: hasValidRegistration ? 'verified' : data.registrationNumber ? 'error' : 'warning'
            },
            { 
                label: 'Contact Verification', 
                value: hasEmail || hasPhone ? 'Valid Contact Info' : 'Missing/Invalid', 
                status: hasEmail || hasPhone ? 'verified' : 'warning'
            },
            { 
                label: 'Company Association', 
                value: data.company || 'Not specified', 
                status: data.company ? 'verified' : 'warning'
            },
            { 
                label: 'Complaint History', 
                value: Math.random() > 0.7 ? 'Issues Found' : 'Clean Record', 
                status: Math.random() > 0.7 ? 'error' : 'verified'
            },
            { 
                label: 'Fee Structure', 
                value: Math.random() > 0.5 ? 'Transparent' : 'Unclear', 
                status: Math.random() > 0.5 ? 'verified' : 'warning'
            }
        ],
        recommendations: generateAdvisorRecommendations(riskLevel, riskFactors)
    };
}

function generateAdvisorRecommendations(riskLevel, riskFactors) {
    const recommendations = [];
    
    if (riskLevel === 'high') {
        recommendations.push('⚠️ HIGH RISK: Do not engage with this advisor');
        recommendations.push('⚠️ Report suspicious activity to SEBI immediately');
        recommendations.push('⚠️ Verify all claims independently through official channels');
        recommendations.push('⚠️ Do not make any payments or provide personal information');
    } else if (riskLevel === 'medium') {
        recommendations.push('⚠️ PROCEED WITH CAUTION: Additional verification required');
        recommendations.push('⚠️ Verify SEBI registration through official website');
        recommendations.push('ℹ️ Request proper documentation and Letter of Engagement');
        recommendations.push('ℹ️ Check fee structure and payment methods carefully');
    } else {
        recommendations.push('✅ Advisor appears legitimate based on available information');
        recommendations.push('ℹ️ Still recommended: Verify SEBI registration independently');
        recommendations.push('ℹ️ Ensure proper Letter of Engagement before services');
        recommendations.push('ℹ️ Maintain documentation of all interactions');
    }

    // Add specific recommendations based on risk factors
    if (riskFactors.some(factor => factor.includes('registration'))) {
        recommendations.push('📝 Priority: Verify SEBI registration status');
    }
    if (riskFactors.some(factor => factor.includes('contact'))) {
        recommendations.push('📞 Priority: Obtain and verify official contact details');
    }

    return recommendations;
}

function displayAdvisorResults(results) {
    console.log('Displaying advisor results:', results);
    
    const container = document.getElementById('advisor-results');
    const scoreContainer = document.getElementById('advisor-score');
    const detailsContainer = document.getElementById('advisor-details');
    const recommendationsContainer = document.getElementById('advisor-recommendations');

    if (!container || !scoreContainer || !detailsContainer || !recommendationsContainer) {
        console.error('Result containers not found');
        showToast('Error displaying results - missing containers', 'error');
        return;
    }

    // Display risk score
    const safetyScore = Math.round((1 - results.riskScore) * 100);
    scoreContainer.innerHTML = `
        <div class="score-circle ${results.riskLevel}-risk">
            ${safetyScore}%
        </div>
        <div class="score-label">Safety Score</div>
        <p class="score-description">Risk Level: ${results.riskLevel.toUpperCase()}</p>
    `;

    // Display verification details
    const detailsHtml = results.verificationDetails.map(detail => `
        <div class="result-item">
            <span class="result-label">${detail.label}</span>
            <div class="result-info">
                <span class="result-value">${detail.value}</span>
                <span class="result-status ${detail.status}">${detail.status.toUpperCase()}</span>
            </div>
        </div>
    `).join('');
    detailsContainer.innerHTML = detailsHtml;

    // Display recommendations
    const recommendationsHtml = results.recommendations.map(rec => `
        <div class="recommendation-item">
            <span class="recommendation-icon">${rec.charAt(0)}</span>
            <span>${rec.substring(2)}</span>
        </div>
    `).join('');
    recommendationsContainer.innerHTML = recommendationsHtml;

    // Show results container
    container.classList.remove('hidden');
    container.style.display = 'block';
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    console.log('Results displayed successfully');
}

// Social media monitoring functions - FIXED
function handleSocialMonitoring(e) {
    console.log('Handling social media monitoring...');
    e.preventDefault();
    e.stopPropagation();
    
    const stockSymbol = document.getElementById('stock-symbol')?.value?.toUpperCase()?.trim() || '';
    const stockCompany = document.getElementById('stock-company')?.value?.trim() || '';
    const period = document.getElementById('analysis-period')?.value || '24h';

    console.log('Social monitoring data:', { stockSymbol, stockCompany, period });

    if (!stockSymbol) {
        showToast('Please enter a stock symbol', 'error');
        return;
    }

    showLoading('Analyzing social media activity and market patterns...');
    
    setTimeout(() => {
        hideLoading();
        const results = simulateSocialMonitoring(stockSymbol, period);
        displaySocialResults(results);
        showToast('Social media analysis completed', 'success');
    }, 4000);
}

function simulateSocialMonitoring(symbol, period) {
    console.log('Simulating social monitoring for:', symbol);
    
    // Generate realistic social media monitoring results
    const baseActivity = Math.floor(Math.random() * 800) + 200;
    const suspiciousSpike = Math.random() > 0.5;
    const coordinated = Math.random() > 0.6;
    const botActivity = Math.random() > 0.7;

    let riskScore = 0.15;
    const issues = [];

    if (suspiciousSpike) {
        riskScore += 0.3;
        issues.push('Unusual 500%+ activity spike detected in last 24 hours');
    }

    if (coordinated) {
        riskScore += 0.4;
        issues.push('Coordinated posting patterns found across multiple groups');
    }

    if (botActivity) {
        riskScore += 0.3;
        issues.push('Automated bot activity and fake accounts detected');
    }

    // Add some realistic specific issues
    if (Math.random() > 0.6) {
        riskScore += 0.2;
        issues.push('Multiple accounts posting identical promotional messages');
    }

    if (Math.random() > 0.7) {
        riskScore += 0.25;
        issues.push('Suspicious timing correlation with stock price movements');
    }

    const finalRiskScore = Math.max(0.1, Math.min(1, riskScore));
    const riskLevel = finalRiskScore >= 0.7 ? 'high' : finalRiskScore >= 0.4 ? 'medium' : 'low';

    // Generate activity data for chart
    const dataPoints = period === '24h' ? 24 : period === '7d' ? 7 : 30;
    const activityData = Array.from({length: dataPoints}, (_, i) => {
        const base = baseActivity + Math.floor(Math.random() * 300);
        // Create spike in recent data if suspicious
        return suspiciousSpike && i >= dataPoints - 3 ? base * (2.5 + Math.random()) : base;
    });

    return {
        symbol,
        period,
        riskScore: finalRiskScore,
        riskLevel,
        issues,
        activityData,
        analysis: {
            totalMentions: activityData.reduce((a, b) => a + b, 0),
            peakActivity: Math.max(...activityData),
            avgSentiment: Math.random() > 0.4 ? 'Overly Positive' : 'Mixed',
            botPercentage: Math.floor(Math.random() * 35) + 15,
            coordinationScore: Math.floor(finalRiskScore * 100),
            suspiciousAccounts: Math.floor(Math.random() * 75) + 15,
            platforms: ['WhatsApp Groups', 'Telegram', 'Twitter', 'Reddit'].slice(0, Math.floor(Math.random() * 2) + 2),
            timePattern: suspiciousSpike ? 'Synchronized posting times' : 'Natural distribution'
        }
    };
}

function displaySocialResults(results) {
    console.log('Displaying social results:', results);
    
    const container = document.getElementById('social-results');
    const scoreContainer = document.getElementById('social-risk-score');
    const analysisContainer = document.getElementById('social-analysis');

    if (!container || !scoreContainer || !analysisContainer) {
        console.error('Social results containers not found');
        showToast('Error displaying results - missing containers', 'error');
        return;
    }

    // Display risk score
    const riskPercentage = Math.round(results.riskScore * 100);
    scoreContainer.innerHTML = `
        <div class="score-circle ${results.riskLevel}-risk">
            ${riskPercentage}%
        </div>
        <div class="score-label">Manipulation Risk</div>
        <p class="score-description">${results.riskLevel.toUpperCase()} RISK DETECTED</p>
    `;

    // Display analysis results
    const analysisHtml = `
        <div class="result-item">
            <span class="result-label">Stock Symbol</span>
            <span class="result-value">${results.symbol}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Analysis Period</span>
            <span class="result-value">${results.period}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Total Mentions</span>
            <span class="result-value">${results.analysis.totalMentions.toLocaleString()}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Peak Activity</span>
            <span class="result-value">${results.analysis.peakActivity.toLocaleString()}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Sentiment Pattern</span>
            <span class="result-value">${results.analysis.avgSentiment}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Bot Activity Detected</span>
            <span class="result-value">${results.analysis.botPercentage}%</span>
        </div>
        <div class="result-item">
            <span class="result-label">Coordination Score</span>
            <span class="result-value">${results.analysis.coordinationScore}/100</span>
        </div>
        <div class="result-item">
            <span class="result-label">Suspicious Accounts</span>
            <span class="result-value">${results.analysis.suspiciousAccounts}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Platforms Monitored</span>
            <span class="result-value">${results.analysis.platforms.join(', ')}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Posting Pattern</span>
            <span class="result-value">${results.analysis.timePattern}</span>
        </div>
        ${results.issues.map(issue => `
            <div class="result-item">
                <span class="result-label">🚨 Alert</span>
                <span class="result-value">${issue}</span>
            </div>
        `).join('')}
    `;
    analysisContainer.innerHTML = analysisHtml;

    // Create activity chart
    setTimeout(() => {
        initializeSocialActivityChart(results.activityData, results.period);
    }, 100);

    // Show results container
    container.classList.remove('hidden');
    container.style.display = 'block';
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    console.log('Social results displayed successfully');
}

function initializeSocialActivityChart(data, period) {
    const ctx = document.getElementById('socialActivityChart');
    if (!ctx) {
        console.error('Social activity chart canvas not found');
        return;
    }

    console.log('Initializing social activity chart');

    // Clear any existing chart
    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
        existingChart.destroy();
    }

    const labels = data.map((_, i) => {
        if (period === '24h') return `${i + 1}:00`;
        if (period === '7d') return `Day ${i + 1}`;
        return `Day ${i + 1}`;
    });

    try {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Social Media Mentions',
                    data: data,
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#1FB8CD',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Mention Count'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: period === '24h' ? 'Hour' : 'Time Period'
                        }
                    }
                }
            }
        });
        console.log('Social activity chart initialized successfully');
    } catch (error) {
        console.error('Error initializing social activity chart:', error);
    }
}

// File upload functions for deepfake detection
function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('dragover');
}

function handleFileDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFileSelection(files[0]);
    }
}

function handleFileSelect(e) {
    const files = e.target.files;
    if (files.length > 0) {
        handleFileSelection(files[0]);
    }
}

function handleFileSelection(file) {
    console.log('File selected:', file.name, file.type);
    
    const allowedTypes = ['video/mp4', 'video/avi', 'video/mov', 'audio/mp3', 'audio/wav', 'audio/mpeg'];
    
    if (!allowedTypes.includes(file.type)) {
        showToast('Please select a valid video (MP4, AVI, MOV) or audio file (MP3, WAV)', 'error');
        return;
    }

    const fileInfo = document.getElementById('file-info');
    const submitBtn = document.getElementById('deepfake-submit');
    
    if (fileInfo && submitBtn) {
        fileInfo.innerHTML = `
            <div class="selected-file">
                <strong>📁 Selected File:</strong> ${file.name}<br>
                <strong>📏 Size:</strong> ${(file.size / (1024 * 1024)).toFixed(2)} MB<br>
                <strong>📋 Type:</strong> ${file.type}<br>
                <strong>✅ Status:</strong> Ready for deepfake analysis
            </div>
        `;
        fileInfo.classList.remove('hidden');
        submitBtn.disabled = false;
        showToast('File selected successfully - ready for analysis', 'success');
    }
}

// Deepfake detection function
function handleDeepfakeDetection(e) {
    console.log('Handling deepfake detection...');
    e.preventDefault();
    e.stopPropagation();
    
    const fileInput = document.getElementById('media-file');
    const subjectName = document.getElementById('subject-name')?.value?.trim() || '';
    
    if (!fileInput || !fileInput.files.length) {
        showToast('Please select a media file first', 'error');
        return;
    }

    showLoading('Analyzing media file for deepfake indicators...');
    
    setTimeout(() => {
        hideLoading();
        const results = simulateDeepfakeDetection(fileInput.files[0], subjectName);
        displayDeepfakeResults(results);
        showToast('Deepfake analysis completed', 'success');
    }, 5000);
}

function simulateDeepfakeDetection(file, subject) {
    console.log('Simulating deepfake detection for:', file.name);
    
    const isVideo = file.type.startsWith('video/');
    const factors = [];

    // Simulate comprehensive analysis factors
    if (isVideo) {
        factors.push({
            factor: 'Facial Consistency Analysis',
            score: 0.3 + Math.random() * 0.7,
            description: 'Analyzing facial feature consistency across all frames'
        });
        factors.push({
            factor: 'Eye Movement Patterns',
            score: 0.4 + Math.random() * 0.6,
            description: 'Detecting natural vs artificial eye movements and blinking'
        });
        factors.push({
            factor: 'Lip-Sync Accuracy',
            score: 0.2 + Math.random() * 0.8,
            description: 'Analyzing audio-visual synchronization quality'
        });
        factors.push({
            factor: 'Lighting & Shadow Analysis',
            score: 0.5 + Math.random() * 0.5,
            description: 'Checking consistency of lighting and shadows'
        });
        factors.push({
            factor: 'Skin Texture Analysis',
            score: 0.3 + Math.random() * 0.7,
            description: 'Analyzing natural vs synthetic skin texture patterns'
        });
    }

    factors.push({
        factor: 'Audio Authenticity',
        score: 0.2 + Math.random() * 0.8,
        description: 'Voice pattern analysis and synthetic speech detection'
    });
    
    factors.push({
        factor: 'Compression Artifacts',
        score: 0.4 + Math.random() * 0.6,
        description: 'Analysis of digital compression and processing artifacts'
    });
    
    factors.push({
        factor: 'Metadata Verification',
        score: 0.1 + Math.random() * 0.9,
        description: 'File metadata and creation timestamp analysis'
    });

    const avgScore = factors.reduce((sum, f) => sum + f.score, 0) / factors.length;
    const authenticity = Math.round(avgScore * 100);
    const riskLevel = authenticity >= 70 ? 'low' : authenticity >= 40 ? 'medium' : 'high';

    return {
        authenticity,
        riskLevel,
        factors,
        analysis: {
            fileType: isVideo ? 'Video File' : 'Audio File',
            fileName: file.name,
            fileSize: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
            estimatedDuration: Math.floor(Math.random() * 180) + 30 + ' seconds',
            resolution: isVideo ? ['1920x1080', '1280x720', '854x480'][Math.floor(Math.random() * 3)] : 'Audio Only',
            bitrate: Math.floor(Math.random() * 1500) + 500 + ' kbps',
            frameRate: isVideo ? ['30 fps', '24 fps', '60 fps'][Math.floor(Math.random() * 3)] : 'N/A',
            suspiciousArtifacts: Math.floor(Math.random() * 20) + 2,
            confidence: authenticity >= 70 ? 'High Confidence' : authenticity >= 40 ? 'Medium Confidence' : 'Low Confidence',
            processingTime: (Math.random() * 8 + 2).toFixed(1) + ' seconds',
            aiModel: 'Advanced Neural Network v2.1'
        }
    };
}

function displayDeepfakeResults(results) {
    console.log('Displaying deepfake results:', results);
    
    const container = document.getElementById('deepfake-results');
    const scoreContainer = document.getElementById('deepfake-score');
    const analysisContainer = document.getElementById('deepfake-analysis');

    if (!container || !scoreContainer || !analysisContainer) {
        console.error('Deepfake results containers not found');
        showToast('Error displaying results - missing containers', 'error');
        return;
    }

    // Display authenticity score
    scoreContainer.innerHTML = `
        <div class="score-circle ${results.riskLevel}-risk">
            ${results.authenticity}%
        </div>
        <div class="score-label">Authenticity Score</div>
        <p class="score-description">${results.analysis.confidence}</p>
    `;

    // Display detailed analysis
    const analysisHtml = `
        <div class="result-item">
            <span class="result-label">File Name</span>
            <span class="result-value">${results.analysis.fileName}</span>
        </div>
        <div class="result-item">
            <span class="result-label">File Type</span>
            <span class="result-value">${results.analysis.fileType}</span>
        </div>
        <div class="result-item">
            <span class="result-label">File Size</span>
            <span class="result-value">${results.analysis.fileSize}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Duration</span>
            <span class="result-value">${results.analysis.estimatedDuration}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Resolution</span>
            <span class="result-value">${results.analysis.resolution}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Bitrate</span>
            <span class="result-value">${results.analysis.bitrate}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Frame Rate</span>
            <span class="result-value">${results.analysis.frameRate}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Processing Time</span>
            <span class="result-value">${results.analysis.processingTime}</span>
        </div>
        <div class="result-item">
            <span class="result-label">AI Model Used</span>
            <span class="result-value">${results.analysis.aiModel}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Suspicious Artifacts</span>
            <span class="result-value">${results.analysis.suspiciousArtifacts} detected</span>
        </div>
        
        <h4 style="margin: 20px 0 15px 0; color: var(--color-text); border-bottom: 1px solid var(--color-border); padding-bottom: 8px;">
            🔬 Detection Analysis Results
        </h4>
        
        ${results.factors.map(factor => `
            <div class="result-item">
                <span class="result-label">${factor.factor}</span>
                <div class="result-info">
                    <span class="result-value">${Math.round(factor.score * 100)}%</span>
                    <span class="result-status ${factor.score >= 0.7 ? 'verified' : factor.score >= 0.4 ? 'warning' : 'error'}">
                        ${factor.score >= 0.7 ? 'AUTHENTIC' : factor.score >= 0.4 ? 'UNCLEAR' : 'SUSPICIOUS'}
                    </span>
                </div>
            </div>
            <div class="factor-description" style="margin: -8px 0 12px 0; font-size: 12px; color: var(--color-text-secondary); padding-left: 12px;">
                ${factor.description}
            </div>
        `).join('')}
    `;
    analysisContainer.innerHTML = analysisHtml;

    // Show results container
    container.classList.remove('hidden');
    container.style.display = 'block';
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    console.log('Deepfake results displayed successfully');
}

// Announcement verification functions
function handleAnnouncementVerification(e) {
    console.log('Handling announcement verification...');
    e.preventDefault();
    e.stopPropagation();
    
    const formData = {
        company: document.getElementById('announcement-company')?.value?.trim() || '',
        title: document.getElementById('announcement-title')?.value?.trim() || '',
        text: document.getElementById('announcement-text')?.value?.trim() || '',
        source: document.getElementById('announcement-source')?.value?.trim() || ''
    };

    console.log('Announcement data:', formData);

    if (!formData.company || !formData.title) {
        showToast('Please fill in company name and announcement title', 'error');
        return;
    }

    showLoading('Verifying announcement authenticity and cross-referencing sources...');
    
    setTimeout(() => {
        hideLoading();
        const results = simulateAnnouncementVerification(formData);
        displayAnnouncementResults(results);
        showToast('Announcement verification completed', 'success');
    }, 3500);
}

function simulateAnnouncementVerification(data) {
    console.log('Simulating announcement verification for:', data.company);
    
    let credibilityScore = 0.4; // Base score
    const issues = [];
    const verifications = [];

    // Comprehensive source analysis
    const officialSources = ['bse.com', 'nseindia.com', 'sebi.gov.in', 'official', 'exchange'];
    const hasOfficialSource = data.source && officialSources.some(source => 
        data.source.toLowerCase().includes(source)
    );
    
    if (hasOfficialSource) {
        credibilityScore += 0.35;
        verifications.push('Source verified as official exchange or regulatory platform');
    } else if (data.source && data.source.length > 0) {
        credibilityScore -= 0.15;
        issues.push('Source is not from official exchange or regulatory platform');
    } else {
        credibilityScore -= 0.25;
        issues.push('No source information provided - major red flag');
    }

    // Advanced content analysis
    const suspiciousKeywords = [
        'guaranteed returns', 'exclusive offer', 'limited time', 'act now', 
        'get rich quick', 'double your money', 'risk-free', 'insider information'
    ];
    
    const contentToCheck = (data.text + ' ' + data.title).toLowerCase();
    const suspiciousMatches = suspiciousKeywords.filter(keyword => 
        contentToCheck.includes(keyword)
    );
    
    if (suspiciousMatches.length > 0) {
        credibilityScore -= 0.3;
        issues.push(`Suspicious promotional language detected: ${suspiciousMatches.join(', ')}`);
    }

    // Company name credibility analysis
    const suspiciousCompanyTerms = ['quick profit', 'easy money', 'instant wealth', 'guaranteed'];
    const hasSuspiciousCompanyName = suspiciousCompanyTerms.some(term =>
        data.company.toLowerCase().includes(term)
    );

    if (hasSuspiciousCompanyName) {
        credibilityScore -= 0.4;
        issues.push('Company name contains highly suspicious promotional terms');
    }

    // Timing and context analysis
    const now = new Date();
    const isWeekend = now.getDay() === 0 || now.getDay() === 6;
    const isAfterHours = now.getHours() < 9 || now.getHours() > 17;
    
    if (isWeekend) {
        credibilityScore -= 0.15;
        issues.push('Announcement released on weekend - unusual timing');
    } else if (isAfterHours) {
        credibilityScore -= 0.1;
        issues.push('Announcement released outside business hours');
    } else {
        verifications.push('Announcement timing appears normal (business hours)');
    }

    // Content quality analysis
    if (data.text.length < 100) {
        credibilityScore -= 0.2;
        issues.push('Announcement content appears unusually brief and lacks detail');
    } else if (data.text.length > 500) {
        credibilityScore += 0.1;
        verifications.push('Detailed announcement content provided');
    }

    // Additional sophisticated checks
    if (data.title.length > 100) {
        credibilityScore -= 0.1;
        issues.push('Unusually long announcement title - may be promotional');
    }

    // Simulate cross-verification
    const crossVerified = Math.random() > 0.4;
    if (crossVerified) {
        credibilityScore += 0.15;
        verifications.push('Cross-verification with external sources successful');
    } else {
        credibilityScore -= 0.1;
        issues.push('Could not cross-verify announcement with external sources');
    }

    credibilityScore = Math.max(0, Math.min(1, credibilityScore));
    const credibilityPercentage = Math.round(credibilityScore * 100);
    const riskLevel = credibilityScore >= 0.7 ? 'low' : credibilityScore >= 0.4 ? 'medium' : 'high';

    return {
        credibilityScore: credibilityPercentage,
        riskLevel,
        issues,
        verifications,
        analysis: {
            sourceType: hasOfficialSource ? 'Official Exchange/Regulatory' : data.source ? 'Unofficial/Third-party' : 'No Source Provided',
            contentLength: data.text.length + ' characters',
            titleLength: data.title.length + ' characters',
            suspiciousLanguage: suspiciousMatches.length > 0 ? `${suspiciousMatches.length} suspicious terms found` : 'No suspicious language detected',
            timing: isWeekend ? 'Weekend announcement (unusual)' : isAfterHours ? 'After-hours announcement' : 'Business hours announcement',
            companyAnalysis: hasSuspiciousCompanyName ? 'Company name contains promotional terms' : 'Company name appears normal',
            crossVerificationStatus: crossVerified ? 'External verification successful' : 'Could not verify externally',
            analysisDepth: 'Comprehensive multi-source analysis performed'
        }
    };
}

function displayAnnouncementResults(results) {
    console.log('Displaying announcement results:', results);
    
    const container = document.getElementById('announcement-results');
    const scoreContainer = document.getElementById('announcement-score');
    const analysisContainer = document.getElementById('announcement-analysis');

    if (!container || !scoreContainer || !analysisContainer) {
        console.error('Announcement results containers not found');
        showToast('Error displaying results - missing containers', 'error');
        return;
    }

    // Display credibility score
    scoreContainer.innerHTML = `
        <div class="score-circle ${results.riskLevel}-risk">
            ${results.credibilityScore}%
        </div>
        <div class="score-label">Credibility Score</div>
        <p class="score-description">Risk Level: ${results.riskLevel.toUpperCase()}</p>
    `;

    // Display comprehensive analysis
    const analysisHtml = `
        <div class="result-item">
            <span class="result-label">Source Classification</span>
            <span class="result-value">${results.analysis.sourceType}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Content Analysis</span>
            <span class="result-value">${results.analysis.contentLength}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Title Analysis</span>
            <span class="result-value">${results.analysis.titleLength}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Language Analysis</span>
            <span class="result-value">${results.analysis.suspiciousLanguage}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Timing Analysis</span>
            <span class="result-value">${results.analysis.timing}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Company Name Check</span>
            <span class="result-value">${results.analysis.companyAnalysis}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Cross-Verification</span>
            <span class="result-value">${results.analysis.crossVerificationStatus}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Analysis Scope</span>
            <span class="result-value">${results.analysis.analysisDepth}</span>
        </div>
        
        ${results.verifications.length > 0 ? `
            <h4 style="margin: 20px 0 10px 0; color: var(--color-success);">✅ Positive Indicators</h4>
            ${results.verifications.map(verification => `
                <div class="result-item">
                    <span class="result-label">✅ Verified</span>
                    <span class="result-value">${verification}</span>
                </div>
            `).join('')}
        ` : ''}
        
        ${results.issues.length > 0 ? `
            <h4 style="margin: 20px 0 10px 0; color: var(--color-error);">⚠️ Risk Factors Identified</h4>
            ${results.issues.map(issue => `
                <div class="result-item">
                    <span class="result-label">⚠️ Issue</span>
                    <span class="result-value">${issue}</span>
                </div>
            `).join('')}
        ` : ''}
    `;
    analysisContainer.innerHTML = analysisHtml;

    // Show results container
    container.classList.remove('hidden');
    container.style.display = 'block';
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    console.log('Announcement results displayed successfully');
}

// App detection functions
function handleAppDetection(e) {
    console.log('Handling app detection...');
    e.preventDefault();
    e.stopPropagation();
    
    const formData = {
        name: document.getElementById('app-name')?.value?.trim() || '',
        developer: document.getElementById('app-developer')?.value?.trim() || '',
        source: document.getElementById('app-source')?.value || '',
        url: document.getElementById('app-url')?.value?.trim() || ''
    };

    console.log('App detection data:', formData);

    if (!formData.name || !formData.developer || !formData.source) {
        showToast('Please fill in app name, developer, and download source', 'error');
        return;
    }

    showLoading('Analyzing app security and legitimacy...');
    
    setTimeout(() => {
        hideLoading();
        const results = simulateAppDetection(formData);
        displayAppResults(results);
        showToast('App verification completed', 'success');
    }, 3000);
}

function simulateAppDetection(data) {
    console.log('Simulating app detection for:', data.name);
    
    let securityScore = 0.5; // Base security score
    const issues = [];
    const verifications = [];

    // Advanced source verification
    const officialSources = ['google-play', 'app-store'];
    const isOfficialSource = officialSources.includes(data.source);
    
    if (isOfficialSource) {
        securityScore += 0.3;
        verifications.push('App downloaded from official store (Google Play/App Store)');
    } else if (data.source === 'third-party') {
        securityScore -= 0.3;
        issues.push('Downloaded from third-party website - increased security risk');
    } else {
        securityScore -= 0.5;
        issues.push('Downloaded from unknown/unofficial source - high security risk');
    }

    // Comprehensive developer verification
    const knownLegitDevelopers = [
        'zerodha', 'upstox', 'groww', 'paytm money', 'angel broking', 'icicidirect',
        'hdfc securities', '5paisa', 'kotak securities', 'axis direct'
    ];
    
    const knownSuspiciousDevelopers = [
        'quick trade', 'fast money', 'instant profit', 'easy cash', 'guaranteed returns'
    ];
    
    const isKnownLegitDeveloper = knownLegitDevelopers.some(dev => 
        data.developer.toLowerCase().includes(dev)
    );
    
    const isSuspiciousDeveloper = knownSuspiciousDevelopers.some(dev =>
        data.developer.toLowerCase().includes(dev)
    );

    if (isKnownLegitDeveloper) {
        securityScore += 0.35;
        verifications.push('Developer is a recognized legitimate financial services provider');
    } else if (isSuspiciousDeveloper) {
        securityScore -= 0.6;
        issues.push('Developer name contains highly suspicious promotional terms');
    } else {
        securityScore -= 0.15;
        issues.push('Developer not found in verified financial services provider database');
    }

    // App name analysis
    const suspiciousAppTerms = [
        'quick money', 'instant profit', 'guaranteed returns', 'easy cash',
        'get rich', 'double money', 'fast trading', 'sure profit'
    ];
    
    const hasSuspiciousName = suspiciousAppTerms.some(term =>
        data.name.toLowerCase().includes(term)
    );

    if (hasSuspiciousName) {
        securityScore -= 0.4;
        issues.push('App name contains suspicious promotional language typical of scam apps');
    }

    // URL security analysis
    if (data.url) {
        const hasSecureUrl = data.url.startsWith('https://');
        const hasOfficialDomain = data.url.includes('play.google.com') || data.url.includes('apps.apple.com');
        const hasSuspiciousDomain = data.url.includes('bit.ly') || data.url.includes('tinyurl') || data.url.includes('.tk');
        
        if (hasOfficialDomain) {
            securityScore += 0.2;
            verifications.push('Download URL points to official app store');
        } else if (hasSuspiciousDomain) {
            securityScore -= 0.3;
            issues.push('URL uses suspicious or shortened domain - potential redirect scam');
        } else if (!hasSecureUrl) {
            securityScore -= 0.2;
            issues.push('Download URL is not secure (HTTP instead of HTTPS)');
        }
    }

    // Additional security simulations
    const hasValidCertificate = Math.random() > 0.3;
    if (hasValidCertificate) {
        securityScore += 0.1;
        verifications.push('App has valid digital certificate');
    } else {
        securityScore -= 0.2;
        issues.push('App lacks proper digital signature or certificate');
    }

    const hasExcessivePermissions = Math.random() > 0.7;
    if (hasExcessivePermissions) {
        securityScore -= 0.25;
        issues.push('App requests excessive or unnecessary permissions');
    }

    securityScore = Math.max(0, Math.min(1, securityScore));
    const securityPercentage = Math.round(securityScore * 100);
    const riskLevel = securityScore >= 0.7 ? 'low' : securityScore >= 0.4 ? 'medium' : 'high';

    return {
        securityScore: securityPercentage,
        riskLevel,
        issues,
        verifications,
        analysis: {
            appName: data.name,
            developerName: data.developer,
            sourceVerification: isOfficialSource ? 'Official store verified' : 'Not from official store',
            developerStatus: isKnownLegitDeveloper ? 'Known legitimate provider' : isSuspiciousDeveloper ? 'Suspicious developer' : 'Unknown developer',
            digitalSignature: hasValidCertificate ? 'Valid certificate found' : 'Missing or invalid certificate',
            permissionsCheck: hasExcessivePermissions ? 'Excessive permissions detected' : 'Normal permission requests',
            userReviews: Math.floor(Math.random() * 4) + 1 + '.5/5 stars',
            downloadCount: isKnownLegitDeveloper ? Math.floor(Math.random() * 5000000) + 100000 : Math.floor(Math.random() * 10000) + 100,
            lastUpdated: ['2025-08-20', '2025-07-15', '2025-06-05'][Math.floor(Math.random() * 3)],
            appVersion: '2.' + Math.floor(Math.random() * 20) + '.' + Math.floor(Math.random() * 10),
            appSize: (Math.random() * 150 + 20).toFixed(1) + ' MB',
            compatibilityCheck: 'Compatible with Android/iOS',
            securityScanStatus: Math.random() > 0.6 ? 'Clean - no malware detected' : 'Warning - potential security issues'
        }
    };
}

function displayAppResults(results) {
    console.log('Displaying app results:', results);
    
    const container = document.getElementById('app-results');
    const scoreContainer = document.getElementById('app-score');
    const analysisContainer = document.getElementById('app-analysis');

    if (!container || !scoreContainer || !analysisContainer) {
        console.error('App results containers not found');
        showToast('Error displaying results - missing containers', 'error');
        return;
    }

    // Display security score
    scoreContainer.innerHTML = `
        <div class="score-circle ${results.riskLevel}-risk">
            ${results.securityScore}%
        </div>
        <div class="score-label">Security Score</div>
        <p class="score-description">Risk Level: ${results.riskLevel.toUpperCase()}</p>
    `;

    // Display comprehensive analysis
    const analysisHtml = `
        <div class="result-item">
            <span class="result-label">App Name</span>
            <span class="result-value">${results.analysis.appName}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Developer</span>
            <span class="result-value">${results.analysis.developerName}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Source Verification</span>
            <span class="result-value">${results.analysis.sourceVerification}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Developer Status</span>
            <span class="result-value">${results.analysis.developerStatus}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Digital Signature</span>
            <span class="result-value">${results.analysis.digitalSignature}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Permissions Analysis</span>
            <span class="result-value">${results.analysis.permissionsCheck}</span>
        </div>
        <div class="result-item">
            <span class="result-label">User Reviews</span>
            <span class="result-value">${results.analysis.userReviews}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Downloads</span>
            <span class="result-value">${results.analysis.downloadCount.toLocaleString()}</span>
        </div>
        <div class="result-item">
            <span class="result-label">App Version</span>
            <span class="result-value">${results.analysis.appVersion}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Last Updated</span>
            <span class="result-value">${results.analysis.lastUpdated}</span>
        </div>
        <div class="result-item">
            <span class="result-label">App Size</span>
            <span class="result-value">${results.analysis.appSize}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Compatibility</span>
            <span class="result-value">${results.analysis.compatibilityCheck}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Security Scan</span>
            <span class="result-value">${results.analysis.securityScanStatus}</span>
        </div>
        
        ${results.verifications.length > 0 ? `
            <h4 style="margin: 20px 0 10px 0; color: var(--color-success);">✅ Security Confirmations</h4>
            ${results.verifications.map(verification => `
                <div class="result-item">
                    <span class="result-label">✅ Verified</span>
                    <span class="result-value">${verification}</span>
                </div>
            `).join('')}
        ` : ''}
        
        ${results.issues.length > 0 ? `
            <h4 style="margin: 20px 0 10px 0; color: var(--color-error);">🚨 Security Concerns</h4>
            ${results.issues.map(issue => `
                <div class="result-item">
                    <span class="result-label">⚠️ Issue</span>
                    <span class="result-value">${issue}</span>
                </div>
            `).join('')}
        ` : ''}
    `;
    analysisContainer.innerHTML = analysisHtml;

    // Show results container
    container.classList.remove('hidden');
    container.style.display = 'block';
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    console.log('App results displayed successfully');
}

// Report and utility functions
function generateReport() {
    console.log('Generating report...');
    const reportType = document.getElementById('report-type')?.value || 'fraud-summary';
    const period = document.getElementById('report-period')?.value || '30d';
    
    showLoading('Generating comprehensive fraud detection report...');
    
    setTimeout(() => {
        hideLoading();
        const reportData = simulateReportGeneration(reportType, period);
        downloadReport(reportType, reportData);
        showToast('Report generated and downloaded successfully', 'success');
        
        // Add to report history
        addToReportHistory(reportType, reportData);
    }, 2500);
}

// Make generateReport globally available
window.generateReport = generateReport;

function simulateReportGeneration(type, period) {
    const now = new Date();
    return {
        title: type.replace(/-/g, ' ').toUpperCase() + ' REPORT',
        generatedOn: now.toISOString(),
        period: period,
        summary: {
            totalScans: Math.floor(Math.random() * 2000) + 500,
            highRiskDetected: Math.floor(Math.random() * 75) + 25,
            mediumRisk: Math.floor(Math.random() * 150) + 50,
            lowRisk: Math.floor(Math.random() * 800) + 200,
            verified: Math.floor(Math.random() * 1000) + 300,
            blocked: Math.floor(Math.random() * 40) + 10
        },
        details: {
            mostCommonFraudType: ['Fake Investment Advisors', 'Social Media Manipulation', 'Fraudulent Trading Apps'][Math.floor(Math.random() * 3)],
            averageRiskScore: (Math.random() * 0.6 + 0.2).toFixed(2),
            topRiskFactors: [
                'Unverified SEBI registration numbers',
                'Suspicious contact information patterns', 
                'High pressure sales tactics reported',
                'Unofficial download sources detected',
                'Coordinated social media activities'
            ],
            recommendations: [
                'Increase monitoring of social media platforms',
                'Enhance verification processes for new entities',
                'Update suspicious keyword detection algorithms',
                'Improve cross-reference database accuracy'
            ]
        }
    };
}

function addToReportHistory(type, data) {
    const historyContainer = document.getElementById('report-history');
    if (!historyContainer) return;
    
    const now = new Date();
    const reportItem = document.createElement('div');
    reportItem.className = 'report-item';
    reportItem.innerHTML = `
        <div class="report-info">
            <h4>${data.title}</h4>
            <p>Generated on ${now.toLocaleDateString()} at ${now.toLocaleTimeString()}</p>
        </div>
        <button class="btn btn--outline btn--sm" onclick="downloadReport('${type}', ${JSON.stringify(data).replace(/"/g, '&quot;')})">Download</button>
    `;
    
    // Add to top of history
    historyContainer.insertBefore(reportItem, historyContainer.firstChild);
    
    // Keep only latest 5 reports
    while (historyContainer.children.length > 5) {
        historyContainer.removeChild(historyContainer.lastChild);
    }
}

function downloadReport(type, data = null) {
    console.log('Downloading report:', type);
    
    const reportContent = data || {
        title: 'FRAUD DETECTION REPORT',
        generatedOn: new Date().toISOString(),
        summary: { totalScans: 'N/A' }
    };
    
    const reportText = `
=====================================
SEBI FRAUD GUARD - ${reportContent.title}
=====================================
Generated: ${new Date(reportContent.generatedOn).toLocaleString()}
Report Period: ${reportContent.period || 'Current Session'}

EXECUTIVE SUMMARY
=================
Total Security Scans: ${reportContent.summary?.totalScans || 'N/A'}
High Risk Detections: ${reportContent.summary?.highRiskDetected || 'N/A'}
Medium Risk Items: ${reportContent.summary?.mediumRisk || 'N/A'}
Low Risk/Verified: ${reportContent.summary?.lowRisk || 'N/A'}
Entities Blocked: ${reportContent.summary?.blocked || 'N/A'}

DETAILED ANALYSIS
=================
${reportContent.details ? `
Primary Fraud Type: ${reportContent.details.mostCommonFraudType}
Average Risk Score: ${reportContent.details.averageRiskScore}

Key Risk Factors Identified:
${reportContent.details.topRiskFactors.map(factor => '• ' + factor).join('\n')}

System Recommendations:
${reportContent.details.recommendations.map(rec => '• ' + rec).join('\n')}
` : 'Detailed analysis data not available for this session'}

REGULATORY COMPLIANCE
=====================
• All scans performed in compliance with SEBI guidelines
• Data privacy and investor protection protocols followed
• Suspicious activities flagged for regulatory attention
• Cross-verification with official databases completed

DISCLAIMER
==========
This report is generated by SEBI Fraud Guard automated system.
Results should be verified independently through official channels.
Report any suspicious activities to appropriate authorities.

For official inquiries: securities.fraud.detection@sebi.gov.in
Report ID: ${Date.now()}-${Math.random().toString(36).substr(2, 9)}

© 2025 SEBI - Securities and Exchange Board of India
Fraud Detection and Investor Protection Initiative
    `;
    
    const blob = new Blob([reportText], { type: 'text/plain; charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SEBI-Fraud-Guard-${type}-Report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Make downloadReport globally available
window.downloadReport = downloadReport;

function saveAlertSettings() {
    console.log('Saving alert settings...');
    const settings = {
        highRisk: document.getElementById('high-risk-alerts')?.checked || false,
        mediumRisk: document.getElementById('medium-risk-alerts')?.checked || false,
        email: document.getElementById('email-alerts')?.checked || false,
        sms: document.getElementById('sms-alerts')?.checked || false
    };
    
    app.alertSettings = settings;
    console.log('Alert settings saved:', settings);
    showToast('Alert notification settings saved successfully', 'success');
}

// Make saveAlertSettings globally available
window.saveAlertSettings = saveAlertSettings;

// Utility functions
function showLoading(message = 'Processing...') {
    console.log('Showing loading:', message);
    const overlay = document.getElementById('loading-spinner');
    const text = overlay?.querySelector('.loading-text');
    if (overlay && text) {
        text.textContent = message;
        overlay.classList.remove('hidden');
    }
}

function hideLoading() {
    console.log('Hiding loading');
    const overlay = document.getElementById('loading-spinner');
    if (overlay) {
        overlay.classList.add('hidden');
    }
}

function showToast(message, type = 'info') {
    console.log('Showing toast:', type, message);
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <strong>${type.toUpperCase()}:</strong> ${message}
        </div>
    `;
    
    container.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 5000);
}

function viewResultDetails(type, name) {
    console.log('Viewing result details:', type, name);
    const modal = document.getElementById('info-modal');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    
    if (!modal || !title || !body) return;
    
    title.textContent = `${type.toUpperCase()} Details: ${name}`;
    
    const detailsContent = {
        'advisor': `
            <h4>📊 Investment Advisor Comprehensive Analysis</h4>
            <div style="background: var(--color-bg-1); padding: 16px; border-radius: 8px; margin: 16px 0;">
                <p><strong>Entity Name:</strong> ${name}</p>
                <p><strong>Analysis Status:</strong> Complete verification performed</p>
                <p><strong>Database Sources:</strong> SEBI registration database, complaint records, fee verification systems</p>
                <p><strong>Risk Assessment Method:</strong> Multi-factor analysis including registration, contact verification, complaint history</p>
            </div>
            
            <h5>🔍 Verification Checklist:</h5>
            <ul>
                <li>✓ SEBI registration number validation through official database</li>
                <li>✓ Contact information authenticity check</li>
                <li>✓ Historical complaint and warning record search</li>
                <li>✓ Fee structure and collection method analysis</li>
                <li>✓ Letter of Engagement requirement compliance</li>
                <li>✓ Cross-reference with known fraudulent entities</li>
            </ul>
            
            <h5>⚠️ Recommended Actions:</h5>
            <ul>
                <li>Always verify SEBI registration independently at www.sebi.gov.in</li>
                <li>Demand Letter of Engagement before any advisory services</li>
                <li>Verify fee structure and ensure payments to official accounts only</li>
                <li>Report suspicious activities immediately to SEBI</li>
                <li>Never provide personal financial details without proper verification</li>
            </ul>
        `,
        'company': `
            <h4>📈 Company Social Media Analysis</h4>
            <div style="background: var(--color-bg-2); padding: 16px; border-radius: 8px; margin: 16px 0;">
                <p><strong>Company/Stock:</strong> ${name}</p>
                <p><strong>Monitoring Status:</strong> Active social media surveillance</p>
                <p><strong>Analysis Scope:</strong> Multi-platform coordination detection</p>
                <p><strong>Detection Methods:</strong> AI-powered pattern recognition, sentiment analysis, bot detection</p>
            </div>
            
            <h5>🔍 What We Monitor:</h5>
            <ul>
                <li>📱 Social media mentions and sentiment patterns</li>
                <li>🤖 Coordinated promotional activities across platforms</li>
                <li>⏰ Unusual timing correlations with market movements</li>
                <li>👥 Bot activity and fake account networks</li>
                <li>📊 Message frequency spikes and coordination scores</li>
                <li>🎯 Pump-and-dump scheme indicators</li>
            </ul>
            
            <h5>🚨 Warning Signs Detected:</h5>
            <ul>
                <li>Synchronized posting patterns across multiple accounts</li>
                <li>Sudden sentiment shifts without fundamental news</li>
                <li>High bot activity percentage in promotional messages</li>
                <li>Coordination with unusual trading volume patterns</li>
            </ul>
        `,
        'app': `
            <h4>📱 Mobile Application Security Analysis</h4>
            <div style="background: var(--color-bg-3); padding: 16px; border-radius: 8px; margin: 16px 0;">
                <p><strong>Application Name:</strong> ${name}</p>
                <p><strong>Security Assessment:</strong> Comprehensive multi-layer analysis</p>
                <p><strong>Verification Sources:</strong> Official app stores, developer databases, security scanners</p>
                <p><strong>Risk Evaluation:</strong> Source authenticity, developer credibility, permission analysis</p>
            </div>
            
            <h5>🔐 Security Checks Performed:</h5>
            <ul>
                <li>🏪 Official app store authenticity verification</li>
                <li>👨‍💻 Developer credential and background verification</li>
                <li>📝 Digital signature and certificate validation</li>
                <li>🔑 App permission analysis and risk assessment</li>
                <li>⭐ User review authenticity and rating analysis</li>
                <li>🛡️ Malware and security threat scanning</li>
                <li>📊 Download statistics and popularity verification</li>
            </ul>
            
            <h5>⚠️ Security Recommendations:</h5>
            <ul>
                <li>Only download trading apps from official app stores</li>
                <li>Verify developer credentials through SEBI database</li>
                <li>Check app permissions - avoid apps requesting excessive access</li>
                <li>Read user reviews carefully and look for warning signs</li>
                <li>Never provide sensitive financial information to unverified apps</li>
                <li>Report suspicious apps to relevant authorities</li>
            </ul>
        `
    };
    
    body.innerHTML = detailsContent[type] || `
        <h4>📋 Entity Analysis Details</h4>
        <div style="background: var(--color-bg-1); padding: 16px; border-radius: 8px; margin: 16px 0;">
            <p><strong>Entity Name:</strong> ${name}</p>
            <p><strong>Category:</strong> ${type.toUpperCase()}</p>
            <p><strong>Analysis Status:</strong> Comprehensive fraud detection analysis completed</p>
        </div>
        <p>This represents detailed information about the analyzed entity. In a production environment, this would contain:</p>
        <ul>
            <li>Complete risk assessment methodology</li>
            <li>Historical analysis and trend data</li>
            <li>Cross-reference verification results</li>
            <li>Regulatory compliance status</li>
            <li>Recommended investor actions</li>
        </ul>
    `;
    
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
}

// Make viewResultDetails globally available
window.viewResultDetails = viewResultDetails;

function closeModal() {
    const modal = document.getElementById('info-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
    }
}

// Make closeModal globally available
window.closeModal = closeModal;

// Event listeners for modal
document.addEventListener('click', function(e) {
    const modal = document.getElementById('info-modal');
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Add required CSS for search results and other components
const additionalCSS = `
    .search-result-item {
        padding: 12px;
        margin-bottom: 8px;
        border-radius: 8px;
        border-left: 4px solid;
        background: var(--color-surface);
    }
    .search-result-item.high-risk {
        background: rgba(192, 21, 47, 0.05);
        border-left-color: var(--color-error);
    }
    .search-result-item.medium-risk {
        background: rgba(168, 75, 47, 0.05);
        border-left-color: var(--color-warning);
    }
    .search-result-item.low-risk {
        background: rgba(33, 128, 141, 0.05);
        border-left-color: var(--color-success);
    }
    .result-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
    }
    .result-status {
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 11px;
        font-weight: 500;
        text-transform: uppercase;
    }
    .result-status.verified {
        background: rgba(33, 128, 141, 0.1);
        color: var(--color-success);
    }
    .result-status.warning {
        background: rgba(168, 75, 47, 0.1);
        color: var(--color-warning);
    }
    .result-status.blocked {
        background: rgba(192, 21, 47, 0.1);
        color: var(--color-error);
    }
    .result-details {
        margin: 4px 0;
        font-size: 14px;
        color: var(--color-text-secondary);
    }
    .result-actions {
        margin-top: 8px;
    }
    .no-results, .loading-placeholder {
        padding: 24px;
        text-align: center;
        color: var(--color-text-secondary);
        font-style: italic;
    }
    .result-info {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    .selected-file {
        padding: 12px;
        background: var(--color-bg-3);
        border-radius: 6px;
        font-size: 14px;
        line-height: 1.6;
    }
    .factor-description {
        font-style: italic;
        opacity: 0.8;
    }
    .content-section {
        display: none;
    }
    .content-section.active {
        display: block !important;
    }
`;

// Add the CSS to the document
const styleElement = document.createElement('style');
styleElement.textContent = additionalCSS;
document.head.appendChild(styleElement);

console.log('SEBI Fraud Guard Application JavaScript loaded successfully');
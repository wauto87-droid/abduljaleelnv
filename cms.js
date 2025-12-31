/**
 * CMS Logic for Abdul Jaleel's Portfolio
 * Connects to Google Sheets via Apps Script Web App
 */

// CONFIGURATION
// Replace this with your deployed Web App URL
const API_URL = 'MOCK_DATA'; // 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec'; 

async function loadGallery() {
    const galleryContainer = document.getElementById('gallery-grid');
    if (!galleryContainer) return;

    galleryContainer.innerHTML = '<p>Loading content...</p>';

    try {
        let data;

        // Development vs Production Logic
        if (API_URL === 'MOCK_DATA') {
            const response = await fetch('mock_data.json');
            data = await response.json();
            console.log('Loaded Mock Data:', data);
        } else {
            const response = await fetch(API_URL);
            const result = await response.json();
            data = result.data; // Assuming GAS returns { status: 'success', data: [...] }
        }

        // Filter for 'published' items only
        const publishedItems = data.filter(item => item.status && item.status.toLowerCase() === 'published');

        renderItems(publishedItems, galleryContainer);

    } catch (error) {
        console.error('Error loading gallery:', error);
        galleryContainer.innerHTML = '<p>Unable to load content at this time.</p>';
    }
}

function renderItems(items, container) {
    if (items.length === 0) {
        container.innerHTML = '<p>No content published yet.</p>';
        return;
    }

    container.innerHTML = ''; // Clear loading text

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card gallery-item';

        let contentHtml = '';

        // Handle different content types
        if (item.type === 'quote') {
            contentHtml = `
                <div class="quote-content">
                    <i class="fa-solid fa-quote-left quote-icon"></i>
                    <blockquote>"${item.description || item.title}"</blockquote>
                </div>
            `;
        } else if (item.type === 'image') {
            contentHtml = `
                <div class="image-content">
                    <img src="${item.image_url}" alt="${item.title}">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                </div>
            `;
        } else {
            // Default Post
            contentHtml = `
                <h4>${item.title}</h4>
                <p>${item.description}</p>
            `;
        }

        card.innerHTML = contentHtml;
        container.appendChild(card);
    });
}

// Auto-load on page load
document.addEventListener('DOMContentLoaded', loadGallery);

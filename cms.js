/**
 * CMS Logic for Abdul Jaleel's Portfolio
 * Connects to Google Sheets via Apps Script Web App
 */

// CONFIGURATION
// Replace this with your deployed Web App URL
const API_URL = 'https://script.google.com/macros/s/AKfycbyhYliSyK6uFgGotiHV7gcBXcjlCDRsNHnD-1kz7v9kzEcrY8m-tFiPewHsZb6DjM8tdw/exec';

const LOCAL_DATA = [
    {
        "id": "1",
        "type": "quote",
        "title": "The Goal of Automation",
        "description": "Automation is not about replacing humans; it's about replacing robotic work so humans can be creative.",
        "status": "published",
        "created_date": "2026-01-01"
    },
    {
        "id": "2",
        "type": "quote",
        "title": "Data Decisions",
        "description": "Without data, you're just another person with an opinion.",
        "status": "published",
        "created_date": "2026-01-02"
    },
    {
        "id": "3",
        "type": "quote",
        "title": "System Design",
        "description": "A bad system will beat a good person every time. Fix the system.",
        "status": "published",
        "created_date": "2026-01-03"
    },
    {
        "id": "4",
        "type": "quote",
        "title": "Efficiency",
        "description": "Efficiency is intelligent laziness. Do it once, automate it forever.",
        "status": "published",
        "created_date": "2026-01-04"
    },
    {
        "id": "5",
        "type": "quote",
        "title": "Business Intelligence",
        "description": "The goal is to turn data into information, and information into insight.",
        "status": "published",
        "created_date": "2026-01-05"
    },
    {
        "id": "8",
        "type": "project",
        "title": "Inventory System v2",
        "description": "Just deployed a new QR-code based inventory tracker for a retail client. Reduced check-out time by 40%.",
        "status": "published",
        "created_date": "2026-01-08"
    },
    {
        "id": "9",
        "type": "quote",
        "title": "Simplicity",
        "description": "Complexity is the enemy of execution.",
        "status": "published",
        "created_date": "2026-01-09"
    },
    {
        "id": "10",
        "type": "thought",
        "title": "AI in Sheets",
        "description": "Currently experimenting with Gemini API inside Google Sheets to auto-categorize expense reports. The results are promising.",
        "status": "published",
        "created_date": "2026-01-10"
    }
];

async function loadGallery() {
    const galleryContainer = document.getElementById('gallery-grid');
    if (!galleryContainer) return;

    galleryContainer.innerHTML = '<p>Loading content...</p>';

    try {
        let data;

        // Development vs Production Logic
        if (API_URL === 'MOCK_DATA') {
            // Use embedded local data directly
            console.log('Using Embedded Mock Data');
            data = LOCAL_DATA;
        } else {
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            try {
                const result = await response.json();
                data = result.data;
            } catch (e) {
                throw new Error('Received HTML instead of JSON. This usually means the script permissions are wrong. Make sure it is set to "Anyone".');
            }
        }

        // Filter for 'published' items only
        const publishedItems = data.filter(item => item.status && item.status.toLowerCase() === 'published');

        renderItems(publishedItems, galleryContainer);

    } catch (error) {
        console.error('Error loading gallery:', error);
        galleryContainer.innerHTML = `
            <div style="text-align: center; color: var(--text-secondary);">
                <p>Unable to load content.</p>
                <code style="display:block; margin-top:1rem; font-size: 0.8rem; color: #ff6b6b;">${error.message}</code>
                <p style="font-size: 0.8rem; margin-top: 0.5rem;">Check if the Google Sheet Script is deployed as "Anyone" and not "Anyone with Google Account".</p>
            </div>
        `;
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

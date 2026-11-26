


const itemsGrid = document.getElementById("itemsGrid");
const itemForm = document.getElementById("itemForm");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const statusFilter = document.getElementById("statusFilter");



const sampleItems = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        description: "Black wireless headphones with a small scratch.",
        location: "Central Library",
        status: "Lost",
        person: "Rahul",
        date: "26 Nov 2026"
    },
    {
        id: 2,
        name: "Blue Water Bottle",
        category: "Accessories",
        description: "Blue stainless steel water bottle.",
        location: "Cafeteria",
        status: "Found",
        person: "Priya",
        date: "25 Nov 2026"
    },
    {
        id: 3,
        name: "DSA Notebook",
        category: "Books",
        description: "Notebook containing Java and DSA notes.",
        location: "Block A",
        status: "Lost",
        person: "Aman",
        date: "24 Nov 2026"
    },
    {
        id: 4,
        name: "Black Backpack",
        category: "Accessories",
        description: "Black backpack found near the computer lab.",
        location: "Computer Lab",
        status: "Found",
        person: "Sneha",
        date: "23 Nov 2026"
    },
    {
        id: 5,
        name: "College ID Card",
        category: "Other",
        description: "Student ID card found near the main gate.",
        location: "Main Gate",
        status: "Returned",
        person: "Karan",
        date: "22 Nov 2026"
    },
    {
        id: 6,
        name: "Scientific Calculator",
        category: "Electronics",
        description: "Casio scientific calculator in a black cover.",
        location: "Room 204",
        status: "Lost",
        person: "Neha",
        date: "21 Nov 2026"
    }
];



let items = JSON.parse(localStorage.getItem("findItItems"));

if (!items) {
    items = sampleItems;
    saveItems();
}



function saveItems() {
    localStorage.setItem("findItItems", JSON.stringify(items));
}



function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function(char) {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[char];
    });
}



function getEmoji(category) {
    const emojis = {
        Electronics: "🎧",
        Accessories: "🎒",
        Books: "📚",
        Clothing: "👕",
        Other: "📦"
    };

    return emojis[category] || "📦";
}


function displayItems(data) {

    itemsGrid.innerHTML = "";

    document.getElementById("resultCount").textContent =
        `${data.length} items`;

    if (data.length === 0) {
        itemsGrid.innerHTML =
            `<div class="empty-message">
                <h3>No items found!</h3>
                <p>Try changing your search or filters.</p>
            </div>`;

        return;
    }

    data.forEach(function(item) {

        const card = document.createElement("div");
        card.className = "item-card";

        card.innerHTML = `
            <div class="card-top">
                <div class="item-emoji">
                    ${getEmoji(item.category)}
                </div>

                <span class="status ${item.status.toLowerCase()}">
                    ${escapeHTML(item.status)}
                </span>
            </div>

            <h3>${escapeHTML(item.name)}</h3>

            <p class="item-description">
                ${escapeHTML(item.description)}
            </p>

            <div class="item-details">
                <p>📍 ${escapeHTML(item.location)}</p>
                <p>👤 ${escapeHTML(item.person)}</p>
                <p>📅 ${escapeHTML(item.date)}</p>
                <p>🏷️ ${escapeHTML(item.category)}</p>
            </div>

            <div class="card-actions">
                ${
                    item.status !== "Returned"
                    ? `<button class="return-btn" data-action="return"
                        data-id="${item.id}">
                        ✓ Mark Returned
                       </button>`
                    : `<button class="return-btn" disabled>
                        ✓ Returned
                       </button>`
                }

                <button class="delete-btn" data-action="delete"
                    data-id="${item.id}">
                    Delete
                </button>
            </div>
        `;

        itemsGrid.appendChild(card);
    });
}



function updateStats() {

    document.getElementById("totalCount").textContent =
        items.length;

    document.getElementById("lostCount").textContent =
        items.filter(item => item.status === "Lost").length;

    document.getElementById("foundCount").textContent =
        items.filter(item => item.status === "Found").length;

    document.getElementById("returnedCount").textContent =
        items.filter(item => item.status === "Returned").length;
}


function filterItems() {

    const searchValue = searchInput.value.toLowerCase();
    const categoryValue = categoryFilter.value;
    const statusValue = statusFilter.value;

    const filteredItems = items.filter(function(item) {

        const matchesSearch =
            item.name.toLowerCase().includes(searchValue) ||
            item.description.toLowerCase().includes(searchValue) ||
            item.location.toLowerCase().includes(searchValue);

        const matchesCategory =
            categoryValue === "All" ||
            item.category === categoryValue;

        const matchesStatus =
            statusValue === "All" ||
            item.status === statusValue;

        return matchesSearch && matchesCategory && matchesStatus;
    });

    displayItems(filteredItems);
}


itemForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const newItem = {
        id: Date.now(),

        name: document.getElementById("itemName").value.trim(),

        category: document.getElementById("itemCategory").value,

        description: document.getElementById("itemDescription").value.trim(),

        location: document.getElementById("itemLocation").value.trim(),

        status: document.getElementById("itemStatus").value,

        person: document.getElementById("itemPerson").value.trim(),

        date: new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        })
    };

    if (
        !newItem.name ||
        !newItem.category ||
        !newItem.description ||
        !newItem.location ||
        !newItem.person
    ) {
        alert("Please fill in all fields.");
        return;
    }

    items.unshift(newItem);

    saveItems();

    itemForm.reset();

    searchInput.value = "";
    categoryFilter.value = "All";
    statusFilter.value = "All";

    updateStats();
    filterItems();

    alert("Item reported successfully!");

    document.getElementById("itemsSection").scrollIntoView({
        behavior: "smooth"
    });
});



itemsGrid.addEventListener("click", function(event) {

    const button = event.target.closest("button[data-action]");

    if (!button) return;

    const id = Number(button.dataset.id);
    const action = button.dataset.action;

    if (action === "return") {

        const item = items.find(item => item.id === id);

        if (item && item.status !== "Returned") {
            item.status = "Returned";
        }

    } else if (action === "delete") {

        const confirmDelete = confirm(
            "Are you sure you want to delete this item?"
        );

        if (!confirmDelete) return;

        items = items.filter(item => item.id !== id);
    }

    saveItems();
    updateStats();
    filterItems();
});



searchInput.addEventListener("input", filterItems);

categoryFilter.addEventListener("change", filterItems);

statusFilter.addEventListener("change", filterItems);



document.getElementById("openFormBtn").addEventListener("click", function() {

    document.getElementById("reportSection").scrollIntoView({
        behavior: "smooth"
    });

});

document.getElementById("exploreBtn").addEventListener("click", function() {

    document.getElementById("itemsSection").scrollIntoView({
        behavior: "smooth"
    });

});



updateStats();
displayItems(items);

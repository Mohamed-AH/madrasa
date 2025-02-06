document.addEventListener('DOMContentLoaded', () => {
    const winnersContainer = document.getElementById('winners-container');
    
    async function fetchWinnerData() {
        try {
            const response = await fetch('winners_data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching JSON data:", error);
            return [];
        }
    }

    function createWinnerCard(winner, place) {
        const card = document.createElement('div');
        card.className = 'winner-card bg-white rounded-lg overflow-hidden shadow-lg';
        
        const placeColors = {
            1: 'from-yellow-400 to-yellow-300',
            2: 'from-gray-300 to-gray-200',
            3: 'from-yellow-700 to-yellow-600'
        };

        card.innerHTML = `
            <div class="bg-gradient-to-r ${placeColors[place]} p-4">
                <h2 class="text-2xl font-bold text-center text-white">${place}${getOrdinal(place)} Place</h2>
            </div>
            <div class="p-6">
                <img src="${winner.PhotoFilename || 'placeholder.jpg'}" alt="${winner['Winner Name']}" class="winner-photo w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-lg">
                <h3 class="text-xl font-semibold text-center mb-2">${winner['Winner Name']}</h3>
                <p class="text-center text-gray-600">${winner['Contest Name']}</p>
                <p class="text-center text-gray-600">${winner.Category} - ${winner['Age Group']}</p>
            </div>
        `;

        return card;
    }

    function getOrdinal(n) {
        return ["st","nd","rd"][((n+90)%100-10)%10-1] || "th";
    }

    async function displayTopThreeWinners() {
        const winners = await fetchWinnerData();
        const topThree = winners.filter(winner => ['1', '2', '3'].includes(winner['Prize Position']))
                                .sort((a, b) => a['Prize Position'] - b['Prize Position']);

        topThree.forEach((winner, index) => {
            const card = createWinnerCard(winner, index + 1);
            winnersContainer.appendChild(card);
        });
    }

    displayTopThreeWinners();
});

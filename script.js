document.addEventListener('DOMContentLoaded', () => {
    const winnersContainer = document.getElementById('winners-container');
    let winners = [];

    async function fetchWinnerData() {
        try {
            const response = await fetch('winners_data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching JSON data:", error);
            return [];
        }
    }

    function displayWinnersByEvent() {
        const events = groupWinnersByEvent(winners);

        for (const event in events) {
            let eventWinners = events[event];

            // ***THIS IS THE KEY CHANGE: Sort BEFORE displaying***
            eventWinners.sort((a, b) => {
                const rankA = parseInt(a.Rank || a['Prize Position'] || Infinity);
                const rankB = parseInt(b.Rank || b['Prize Position'] || Infinity);
                return rankA - rankB;
            });

            const eventCard = document.createElement('div');
            eventCard.classList.add('event-card');

            const eventTitle = document.createElement('h3');
            eventTitle.classList.add('event-title');
            eventTitle.textContent = event;

            eventCard.appendChild(eventTitle);

            for (let i = 0; i < eventWinners.length; i++) {
                const winner = eventWinners[i];
                const winnerRow = document.createElement('div');
                winnerRow.classList.add('winner-row');

                const winnerPhoto = document.createElement('img');
                winnerPhoto.classList.add('winner-photo');
                winnerPhoto.src = winner.PhotoFilename || 'placeholder.jpg';
                winnerPhoto.alt = `${winner['Winner Name']} Photo`;

                const winnerDetails = document.createElement('div');
                winnerDetails.classList.add('winner-details');

                const winnerRank = document.createElement('span');
                winnerRank.classList.add('winner-rank');
                winnerRank.textContent = getRank(i + 1);

                const winnerName = document.createElement('span');
                winnerName.classList.add('winner-name');
                winnerName.textContent = winner['Winner Name'];

                winnerDetails.appendChild(winnerRank);
                winnerDetails.appendChild(winnerName);

                winnerRow.appendChild(winnerPhoto);
                winnerRow.appendChild(winnerDetails);
                eventCard.appendChild(winnerRow);
            }
            winnersContainer.appendChild(eventCard);
        }
    }

    function groupWinnersByEvent(winners) {
        const events = {};
        for (const winner of winners) {
            const event = `${winner['Contest Name']} - ${winner.Category} - ${winner['Age Group']}`;
            if (!events[event]) {
                events[event] = [];
            }
            events[event].push(winner);
        }
        return events;
    }

    function getRank(position) {
        if (position === 1) return "1st";
        if (position === 2) return "2nd";
        if (position === 3) return "3rd";
        return `${position}th`;
    }

    async function initialize() {
        winners = await fetchWinnerData();
        if (winners.length > 0) {
            displayWinnersByEvent();
        } else {
            console.error("Failed to load winner data. Please check the JSON file.");
        }
    }

    initialize();
});
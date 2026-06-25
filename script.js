const cryptoContainer =
document.getElementById("cryptoContainer");

const refreshBtn =
document.getElementById("refreshBtn");

const searchInput =
document.getElementById("searchInput");

let allCoins = [];

const apiURL =
"https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=10&page=1&sparkline=false";

async function fetchCryptoData(){

    try{

        cryptoContainer.innerHTML =
        "<h2>Loading...</h2>";

        const response =
        await fetch(apiURL);

        const data =
        await response.json();

        allCoins = data;

        displayCoins(allCoins);

        document.getElementById("lastUpdated").innerText =
        "Last Updated : " +
        new Date().toLocaleTimeString();

    }

    catch(error){

        cryptoContainer.innerHTML =
        "<h2>Error Loading Data</h2>";

        console.log(error);
    }
}

function displayCoins(coins){

    cryptoContainer.innerHTML = "";

    coins.forEach((coin)=>{

        const changeClass =
        coin.price_change_percentage_24h >= 0
        ? "positive"
        : "negative";

        const arrow =
        coin.price_change_percentage_24h >= 0
        ? "📈"
        : "📉";

        const card =
        document.createElement("div");

        card.classList.add("coin-card");

        card.innerHTML = `

        <span class="rank">
        #${coin.market_cap_rank}
        </span>

        <img
        src="${coin.image}"
        alt="${coin.name}"
        >

        <h3>${coin.name}</h3>

        <p class="symbol">
        ${coin.symbol.toUpperCase()}
        </p>

        <p class="price">
        ₹${coin.current_price.toLocaleString("en-IN")}
        </p>

        <p class="change ${changeClass}">
        ${arrow}
        ${coin.price_change_percentage_24h.toFixed(2)}%
        </p>

        `;

        cryptoContainer.appendChild(card);
    });
}

/* Search */

searchInput.addEventListener("keyup",()=>{

    const value =
    searchInput.value.toLowerCase();

    const filteredCoins =
    allCoins.filter((coin)=>

        coin.name
        .toLowerCase()
        .includes(value)

    );

    displayCoins(filteredCoins);

});

/* Refresh */

refreshBtn.addEventListener(
"click",
fetchCryptoData
);

/* Auto Refresh */

setInterval(
fetchCryptoData,
60000
);

fetchCryptoData();
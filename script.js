/* =====================================================
   MY TRIP
   Complete trip management application
===================================================== */


/* ================= DATA ================= */

let packingItems =
    JSON.parse(localStorage.getItem("packingItems")) || [];

let places =
    JSON.parse(localStorage.getItem("places")) || [];

let expenses =
    JSON.parse(localStorage.getItem("expenses")) || [];

let travellers =
    JSON.parse(localStorage.getItem("travellers")) || [];

let plans =
    JSON.parse(localStorage.getItem("plans")) || [];

let photos =
    JSON.parse(localStorage.getItem("photos")) || [];


let tripData =
    JSON.parse(localStorage.getItem("tripData")) || {

        name: "My Dream Trip ✈️",
        destination: "",
        start: "",
        end: "",
        budget: 0,
        notes: "",

        hotelName: "",
        hotelAddress: "",
        transport: "",
        departureTime: "",
        importantContact: ""

    };


/* ================= START ================= */

document.addEventListener("DOMContentLoaded", () => {

    loadTripDetails();

    renderPacking();

    renderPlaces();

    renderTravellers();

    renderExpenses();

    renderPaymentSummary();

    renderPlanner();

    renderPhotos();

    updateBudget();

    updateDashboard();

    updateCountdown();

    setInterval(updateCountdown, 60000);

});


/* =====================================================
   NAVIGATION
===================================================== */

function showPage(pageId) {

    document.querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove("active-page");

        });


    document.getElementById(pageId)
        .classList.add("active-page");


    document.querySelectorAll(".nav-btn")
        .forEach(btn => {

            btn.classList.remove("active");

        });


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   TRIP DETAILS
===================================================== */

function saveTripDetails() {

    tripData.name =
        document.getElementById("tripName").value.trim()
        || "My Dream Trip ✈️";

    tripData.destination =
        document.getElementById("destination").value.trim();

    tripData.start =
        document.getElementById("tripStart").value;

    tripData.end =
        document.getElementById("tripEnd").value;


    saveTripData();

    updateDashboard();

    updateCountdown();

    alert("Trip details saved ✈️");

}


function loadTripDetails() {

    document.getElementById("tripName").value =
        tripData.name === "My Dream Trip ✈️"
            ? ""
            : tripData.name;

    document.getElementById("destination").value =
        tripData.destination || "";

    document.getElementById("tripStart").value =
        tripData.start || "";

    document.getElementById("tripEnd").value =
        tripData.end || "";


    document.getElementById("tripNotes").value =
        tripData.notes || "";


    document.getElementById("hotelName").value =
        tripData.hotelName || "";

    document.getElementById("hotelAddress").value =
        tripData.hotelAddress || "";

    document.getElementById("transport").value =
        tripData.transport || "";

    document.getElementById("departureTime").value =
        tripData.departureTime || "";

    document.getElementById("importantContact").value =
        tripData.importantContact || "";

}


function saveTripData() {

    localStorage.setItem(
        "tripData",
        JSON.stringify(tripData)
    );

}


function saveNotes() {

    tripData.notes =
        document.getElementById("tripNotes").value;

    saveTripData();

}


/* =====================================================
   IMPORTANT INFORMATION
===================================================== */

function saveImportantInfo() {

    tripData.hotelName =
        document.getElementById("hotelName").value;

    tripData.hotelAddress =
        document.getElementById("hotelAddress").value;

    tripData.transport =
        document.getElementById("transport").value;

    tripData.departureTime =
        document.getElementById("departureTime").value;

    tripData.importantContact =
        document.getElementById("importantContact").value;


    saveTripData();

    alert("Important information saved 🆘");

}


/* =====================================================
   PACKING
===================================================== */

function addPackingItem() {

    const input =
        document.getElementById("packingInput");

    const name =
        input.value.trim();

    if (!name) return;


    packingItems.push({

        id: Date.now(),

        name: name,

        completed: false

    });


    localStorage.setItem(
        "packingItems",
        JSON.stringify(packingItems)
    );


    input.value = "";

    renderPacking();

}


function togglePacking(id) {

    packingItems =
        packingItems.map(item => {

            if (item.id === id) {

                item.completed =
                    !item.completed;

            }

            return item;

        });


    localStorage.setItem(
        "packingItems",
        JSON.stringify(packingItems)
    );


    renderPacking();

}


function deletePacking(id) {

    packingItems =
        packingItems.filter(
            item => item.id !== id
        );


    localStorage.setItem(
        "packingItems",
        JSON.stringify(packingItems)
    );


    renderPacking();

}


function renderPacking() {

    const list =
        document.getElementById("packingList");

    list.innerHTML = "";


    if (!packingItems.length) {

        list.innerHTML = `
            <div class="empty">
                🎒 Your packing list is empty.
            </div>
        `;

    }


    packingItems.forEach(item => {

        const div =
            document.createElement("div");

        div.className =
            "check-item " +
            (item.completed ? "completed" : "");


        div.innerHTML = `

            <input
                type="checkbox"
                ${item.completed ? "checked" : ""}
                onchange="togglePacking(${item.id})">

            <span>
                ${escapeHTML(item.name)}
            </span>

            <button
                class="delete-btn"
                onclick="deletePacking(${item.id})">
                ×
            </button>

        `;


        list.appendChild(div);

    });


    const total =
        packingItems.length;

    const done =
        packingItems.filter(
            x => x.completed
        ).length;


    const percentage =
        total
            ? Math.round(done / total * 100)
            : 0;


    document.getElementById(
        "packingPercentage"
    ).textContent =
        percentage + "%";


    document.getElementById(
        "packingProgressText"
    ).textContent =
        `${done} / ${total}`;


    document.getElementById(
        "packingProgress"
    ).style.width =
        percentage + "%";


    updateDashboard();

}


/* =====================================================
   PLACES
===================================================== */

function addPlace() {

    const input =
        document.getElementById("placeInput");

    const name =
        input.value.trim();

    if (!name) return;


    places.push({

        id: Date.now(),

        name: name,

        completed: false

    });


    localStorage.setItem(
        "places",
        JSON.stringify(places)
    );


    input.value = "";

    renderPlaces();

}


function togglePlace(id) {

    places =
        places.map(place => {

            if (place.id === id) {

                place.completed =
                    !place.completed;

            }

            return place;

        });


    localStorage.setItem(
        "places",
        JSON.stringify(places)
    );


    renderPlaces();

}


function deletePlace(id) {

    places =
        places.filter(
            place => place.id !== id
        );


    localStorage.setItem(
        "places",
        JSON.stringify(places)
    );


    renderPlaces();

}


function renderPlaces() {

    const list =
        document.getElementById("placesList");

    list.innerHTML = "";


    if (!places.length) {

        list.innerHTML = `
            <div class="empty">
                📍 Add places you want to visit.
            </div>
        `;

    }


    places.forEach(place => {

        const div =
            document.createElement("div");

        div.className =
            "check-item " +
            (place.completed ? "completed" : "");


        div.innerHTML = `

            <input
                type="checkbox"
                ${place.completed ? "checked" : ""}
                onchange="togglePlace(${place.id})">

            <span>
                📍 ${escapeHTML(place.name)}
            </span>

            <button
                class="delete-btn"
                onclick="deletePlace(${place.id})">
                ×
            </button>

        `;


        list.appendChild(div);

    });


    const total =
        places.length;

    const done =
        places.filter(
            x => x.completed
        ).length;


    const percentage =
        total
            ? Math.round(done / total * 100)
            : 0;


    document.getElementById(
        "placesPercentage"
    ).textContent =
        percentage + "%";


    document.getElementById(
        "placesProgressText"
    ).textContent =
        `${done} / ${total}`;


    document.getElementById(
        "placesProgress"
    ).style.width =
        percentage + "%";


    updateDashboard();

}


/* =====================================================
   DAY PLANNER
===================================================== */

function addPlan() {

    const day =
        Number(
            document.getElementById("planDay").value
        );

    const time =
        document.getElementById("planTime").value;

    const activity =
        document.getElementById("planActivity")
        .value.trim();


    if (!day || !activity) {

        alert("Enter the day and activity.");

        return;

    }


    plans.push({

        id: Date.now(),

        day: day,

        time: time || "--:--",

        activity: activity,

        completed: false

    });


    localStorage.setItem(
        "plans",
        JSON.stringify(plans)
    );


    document.getElementById("planDay").value = "";

    document.getElementById("planTime").value = "";

    document.getElementById("planActivity").value = "";


    renderPlanner();

}


function togglePlan(id) {

    plans =
        plans.map(plan => {

            if (plan.id === id) {

                plan.completed =
                    !plan.completed;

            }

            return plan;

        });


    localStorage.setItem(
        "plans",
        JSON.stringify(plans)
    );


    renderPlanner();

}


function deletePlan(id) {

    plans =
        plans.filter(
            plan => plan.id !== id
        );


    localStorage.setItem(
        "plans",
        JSON.stringify(plans)
    );


    renderPlanner();

}


function renderPlanner() {

    const container =
        document.getElementById(
            "plannerList"
        );

    container.innerHTML = "";


    if (!plans.length) {

        container.innerHTML = `
            <div class="empty">
                🗓️ No activities added yet.
            </div>
        `;

    }


    plans
        .slice()
        .sort((a,b) => {

            if (a.day !== b.day) {
                return a.day - b.day;
            }

            return a.time.localeCompare(b.time);

        })
        .forEach(plan => {

            const div =
                document.createElement("div");

            div.className =
                "plan-item " +
                (plan.completed ? "completed" : "");


            div.innerHTML = `

                <input
                    type="checkbox"
                    ${plan.completed ? "checked" : ""}
                    onchange="togglePlan(${plan.id})">

                <div class="plan-time">
                    ${escapeHTML(plan.time)}
                </div>

                <div class="plan-info">

                    <strong>
                        ${escapeHTML(plan.activity)}
                    </strong>

                    <div class="plan-day">
                        Day ${plan.day}
                    </div>

                </div>

                <button
                    class="delete-btn"
                    onclick="deletePlan(${plan.id})">
                    ×
                </button>

            `;


            container.appendChild(div);

        });


    updateDashboard();

}


/* =====================================================
   TRAVELLERS
===================================================== */

function addTraveller() {

    const input =
        document.getElementById(
            "travellerInput"
        );

    const name =
        input.value.trim();


    if (!name) return;


    if (
        travellers.some(
            x => x.toLowerCase() ===
                 name.toLowerCase()
        )
    ) {

        alert("This traveller already exists.");

        return;

    }


    travellers.push(name);


    localStorage.setItem(
        "travellers",
        JSON.stringify(travellers)
    );


    input.value = "";

    renderTravellers();

}


function deleteTraveller(name) {

    travellers =
        travellers.filter(
            x => x !== name
        );


    localStorage.setItem(
        "travellers",
        JSON.stringify(travellers)
    );


    renderTravellers();

}


function renderTravellers() {

    const list =
        document.getElementById(
            "travellerList"
        );

    const select =
        document.getElementById(
            "expensePayer"
        );


    list.innerHTML = "";


    select.innerHTML = `
        <option value="">
            Select traveller
        </option>
    `;


    travellers.forEach(name => {

        list.innerHTML += `

            <div class="traveller">

                👤 ${escapeHTML(name)}

                <button
                    onclick="deleteTraveller(
                        '${escapeAttribute(name)}'
                    )">
                    ×
                </button>

            </div>

        `;


        select.innerHTML += `

            <option value="${escapeAttribute(name)}">
                ${escapeHTML(name)}
            </option>

        `;

    });

}


/* =====================================================
   BUDGET
===================================================== */

function saveBudget() {

    const amount =
        Number(
            document.getElementById(
                "totalBudget"
            ).value
        );


    if (amount < 0 || isNaN(amount)) {

        alert("Enter a valid budget.");

        return;

    }


    tripData.budget = amount;

    saveTripData();

    updateBudget();

}


function addExpense() {

    const name =
        document.getElementById(
            "expenseName"
        ).value.trim();


    const amount =
        Number(
            document.getElementById(
                "expenseAmount"
            ).value
        );


    const payer =
        document.getElementById(
            "expensePayer"
        ).value;


    if (!name || amount <= 0 || !payer) {

        alert(
            "Enter expense, amount and who paid."
        );

        return;

    }


    expenses.push({

        id: Date.now(),

        name: name,

        amount: amount,

        payer: payer,

        date:
            new Date()
                .toLocaleDateString()

    });


    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );


    document.getElementById(
        "expenseName"
    ).value = "";


    document.getElementById(
        "expenseAmount"
    ).value = "";


    document.getElementById(
        "expensePayer"
    ).value = "";


    renderExpenses();

    renderPaymentSummary();

    updateBudget();

}


function deleteExpense(id) {

    expenses =
        expenses.filter(
            x => x.id !== id
        );


    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );


    renderExpenses();

    renderPaymentSummary();

    updateBudget();

}


function renderExpenses() {

    const list =
        document.getElementById(
            "expenseList"
        );

    list.innerHTML = "";


    if (!expenses.length) {

        list.innerHTML = `
            <div class="empty">
                🧾 No expenses yet.
            </div>
        `;

        return;

    }


    expenses
        .slice()
        .reverse()
        .forEach(expense => {

            const div =
                document.createElement("div");

            div.className = "expense";


            div.innerHTML = `

                <div class="expense-icon">
                    💸
                </div>

                <div class="expense-info">

                    <strong>
                        ${escapeHTML(expense.name)}
                    </strong>

                    <small>
                        Paid by
                        ${escapeHTML(expense.payer)}
                        •
                        ${expense.date}
                    </small>

                </div>

                <div class="expense-amount">
                    ₹${formatMoney(expense.amount)}
                </div>

                <button
                    class="delete-btn"
                    onclick="deleteExpense(${expense.id})">
                    ×
                </button>

            `;


            list.appendChild(div);

        });

}


/* =====================================================
   PAYMENT SUMMARY
===================================================== */

function renderPaymentSummary() {

    const container =
        document.getElementById(
            "paymentSummary"
        );

    container.innerHTML = "";


    if (!travellers.length) {

        container.innerHTML = `
            <div class="empty">
                👥 Add travellers first.
            </div>
        `;

        return;

    }


    travellers.forEach(person => {

        const total =
            expenses
                .filter(
                    expense =>
                        expense.payer === person
                )
                .reduce(
                    (sum, expense) =>
                        sum +
                        Number(expense.amount),
                    0
                );


        container.innerHTML += `

            <div class="payment-person">

                <div class="payment-avatar">
                    ${getInitial(person)}
                </div>

                <div>

                    <strong>
                        ${escapeHTML(person)}
                    </strong>

                    <small>
                        paid in total
                    </small>

                </div>

                <strong>
                    ₹${formatMoney(total)}
                </strong>

            </div>

        `;

    });

}


/* =====================================================
   UPDATE BUDGET
===================================================== */

function updateBudget() {

    const total =
        Number(tripData.budget) || 0;


    const spent =
        expenses.reduce(
            (sum, expense) =>
                sum +
                Number(expense.amount),
            0
        );


    const remaining =
        total - spent;


    document.getElementById(
        "totalBudget"
    ).value =
        total || "";


    document.getElementById(
        "budgetTotal"
    ).textContent =
        "₹" + formatMoney(total);


    document.getElementById(
        "budgetSpent"
    ).textContent =
        "₹" + formatMoney(spent);


    document.getElementById(
        "budgetRemaining"
    ).textContent =
        "₹" + formatMoney(remaining);


    updateDailySpending();

    updateDashboard();

}


/* =====================================================
   DAILY SPENDING
===================================================== */

function updateDailySpending() {

    const total =
        Number(tripData.budget) || 0;


    const spent =
        expenses.reduce(
            (sum, expense) =>
                sum +
                Number(expense.amount),
            0
        );


    const remaining =
        total - spent;


    let days = 0;


    if (tripData.end) {

        const today =
            new Date();

        const end =
            new Date(
                tripData.end + "T23:59:59"
            );


        days =
            Math.max(
                1,
                Math.ceil(
                    (end - today) /
                    (1000 * 60 * 60 * 24)
                )
            );

    }


    const recommended =
        days
            ? remaining / days
            : 0;


    document.getElementById(
        "dailyRemaining"
    ).textContent =
        "₹" + formatMoney(remaining);


    document.getElementById(
        "dailyDays"
    ).textContent =
        days;


    document.getElementById(
        "dailyLimit"
    ).textContent =
        "₹" + formatMoney(recommended);

}


/* =====================================================
   PHOTOS
===================================================== */

function handlePhotos(event) {

    const files =
        Array.from(event.target.files);


    files.forEach(file => {

        if (!file.type.startsWith("image/")) {
            return;
        }


        const reader =
            new FileReader();


        reader.onload = function(e) {

            photos.push({

                id:
                    Date.now() +
                    Math.random(),

                src:
                    e.target.result,

                caption: "",

                date:
                    new Date()
                        .toLocaleDateString()

            });


            localStorage.setItem(
                "photos",
                JSON.stringify(photos)
            );


            renderPhotos();

        };


        reader.readAsDataURL(file);

    });


    event.target.value = "";

}


function deletePhoto(id) {

    photos =
        photos.filter(
            photo => photo.id !== id
        );


    localStorage.setItem(
        "photos",
        JSON.stringify(photos)
    );


    renderPhotos();

}


function updatePhotoCaption(id, caption) {

    photos =
        photos.map(photo => {

            if (photo.id === id) {

                photo.caption = caption;

            }

            return photo;

        });


    localStorage.setItem(
        "photos",
        JSON.stringify(photos)
    );

}


function renderPhotos() {

    const gallery =
        document.getElementById(
            "photoGallery"
        );

    gallery.innerHTML = "";


    if (!photos.length) {

        gallery.innerHTML = `
            <div class="empty"
                 style="grid-column:1/-1">

                📸 Your memories will appear here.

            </div>
        `;

        return;

    }


    photos
        .slice()
        .reverse()
        .forEach(photo => {

            const card =
                document.createElement("div");

            card.className =
                "photo-card";


            card.innerHTML = `

                <img
                    src="${photo.src}"
                    alt="Trip memory">

                <button
                    class="photo-delete"
                    onclick="deletePhoto(${photo.id})">
                    ×
                </button>

                <div class="photo-caption">

                    <input
                        value="${escapeAttribute(
                            photo.caption
                        )}"
                        placeholder="Write a caption..."
                        onchange="
                            updatePhotoCaption(
                                ${photo.id},
                                this.value
                            )
                        ">

                    <small style="
                        display:block;
                        color:#9aa8bd;
                        margin-top:8px;">

                        ${photo.date}

                    </small>

                </div>

            `;


            gallery.appendChild(card);

        });

}


/* =====================================================
   DASHBOARD
===================================================== */

function updateDashboard() {

    document.getElementById(
        "dashboardTripName"
    ).textContent =
        tripData.name ||
        "My Dream Trip ✈️";


    document.getElementById(
        "dashboardDestination"
    ).textContent =
        tripData.destination ||
        "Plan it. Experience it. Remember it.";


    const packed =
        packingItems.filter(
            x => x.completed
        ).length;


    document.getElementById(
        "packingStat"
    ).textContent =
        `${packed} / ${packingItems.length}`;


    const visited =
        places.filter(
            x => x.completed
        ).length;


    document.getElementById(
        "placesStat"
    ).textContent =
        `${visited} / ${places.length}`;


    const spent =
        expenses.reduce(
            (sum,x) =>
                sum + Number(x.amount),
            0
        );


    const remaining =
        (Number(tripData.budget) || 0)
        - spent;


    document.getElementById(
        "remainingStat"
    ).textContent =
        "₹" + formatMoney(remaining);


    document.getElementById(
        "photoStat"
    ).textContent =
        photos.length;


    renderDashboardToday();

}


/* =====================================================
   TODAY'S PLAN
===================================================== */

function renderDashboardToday() {

    const container =
        document.getElementById(
            "dashboardToday"
        );

    container.innerHTML = "";


    if (!plans.length) {

        container.innerHTML = `
            <div class="empty">
                🗓️ Add activities in the Day Planner.
            </div>
        `;

        return;

    }


    let currentDay = 1;


    if (tripData.start) {

        const start =
            new Date(
                tripData.start + "T00:00:00"
            );


        const today =
            new Date();


        currentDay =
            Math.max(
                1,
                Math.floor(
                    (today - start) /
                    (1000 * 60 * 60 * 24)
                ) + 1
            );

    }


    const todayPlans =
        plans
            .filter(
                plan =>
                    Number(plan.day) ===
                    currentDay
            )
            .sort(
                (a,b) =>
                    a.time.localeCompare(b.time)
            );


    if (!todayPlans.length) {

        container.innerHTML = `
            <div class="empty">
                🌤️ Nothing planned for Day
                ${currentDay}.
            </div>
        `;

        return;

    }


    todayPlans.forEach(plan => {

        container.innerHTML += `

            <div class="plan-item
                ${plan.completed ? "completed" : ""}">

                <input
                    type="checkbox"
                    ${plan.completed ? "checked" : ""}
                    onchange="
                        togglePlan(${plan.id})
                    ">

                <div class="plan-time">
                    ${escapeHTML(plan.time)}
                </div>

                <div class="plan-info">

                    <strong>
                        ${escapeHTML(plan.activity)}
                    </strong>

                    <div class="plan-day">
                        Today • Day ${currentDay}
                    </div>

                </div>

            </div>

        `;

    });

}


/* =====================================================
   COUNTDOWN
===================================================== */

function updateCountdown() {

    if (!tripData.start) {

        setCountdown("—","—","—");

        return;

    }


    const target =
        new Date(
            tripData.start + "T00:00:00"
        );


    const now =
        new Date();


    const difference =
        target - now;


    if (difference <= 0) {

        setCountdown(0,0,0);

        return;

    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (difference /
            (1000 * 60 * 60)) % 24
        );


    const minutes =
        Math.floor(
            (difference /
            (1000 * 60)) % 60
        );


    setCountdown(
        days,
        hours,
        minutes
    );

}


function setCountdown(
    days,
    hours,
    minutes
) {

    document.getElementById(
        "daysLeft"
    ).textContent = days;

    document.getElementById(
        "hoursLeft"
    ).textContent = hours;

    document.getElementById(
        "minutesLeft"
    ).textContent = minutes;

}


/* =====================================================
   HELPERS
===================================================== */

function formatMoney(number) {

    return Number(number || 0)
        .toLocaleString("en-IN", {
            maximumFractionDigits: 0
        });

}


function getInitial(name) {

    return String(name)
        .trim()
        .charAt(0)
        .toUpperCase();

}


function escapeHTML(text) {

    return String(text)
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;")
        .replaceAll("'","&#039;");

}


function escapeAttribute(text) {

    return escapeHTML(text);

}


/* =====================================================
   ENTER KEY
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Enter") return;


        const id =
            document.activeElement.id;


        if (id === "packingInput") {
            addPackingItem();
        }


        else if (id === "placeInput") {
            addPlace();
        }


        else if (id === "travellerInput") {
            addTraveller();
        }

    }
);

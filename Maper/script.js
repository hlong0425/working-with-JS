'use strict';

// prettier-ignore


const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');


/*******************************************************/
/*********  App Class                 ******************/
/*******************************************************/

class Workout {
    date = new Date();
    id = (Date.now() + "").slice(0, 10);
    constructor(coords, distance, duration) {
        this.coords = coords;
        this.distance = distance;
        this.duration = duration;
    }

    _setDescription() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December'];
        this.description = `
        ${this.type[0].toUpperCase()}${this.type.slice(1)} on
        ${months[this.date.getMonth()]}
        ${this.date.getDate()}`;
    }


}

class Running extends Workout {
    type = 'running';
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
        this._setDescription();
    }

    calcPace() {
        this.pace = this.duration / this.distance;
        return this;
    }

}

class Cycling extends Workout {
    type = 'cycling';
    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
        this._setDescription();
    }

    calcSpeed() {
        this.speed = this.distance / (this.duration / 60);
        return this;
    }
}

const run1 = new Running([39, -12], 5.2, 24, 178);
const run2 = new Cycling([39, -12], 27, 95, 523);

class App {

    #map;
    #mapEvent;
    #workouts = [];

    // CONSTRUCTOR
    constructor() {
        // Get user's postion
        this.__getPosition();

        // Get data from local storage;
        this._getLocalStorage();

        // Attach event handlers; 
        form.addEventListener('submit', this.__newWorkout.bind(this));

        inputType.addEventListener('change', this.__toggleElevationField)

        containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));

    }


    __getPosition() {
        if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition(this.__loadMap.bind(this), function () {
                alert("Could not get your current postion");
            })
    }

    __loadMap(pos) {
        const { latitude } = pos.coords;
        const { longitude } = pos.coords;
        console.log(`https://www.google.com/maps/@${latitude},${longitude}z`)

        const coords = [latitude, longitude];
        this.#map = L.map('map').setView(coords, 13);

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);


        this.#map.on('click', this.__showForm.bind(this));

        this.#workouts.forEach(work => {
            this._renderWorkoutMarker(work);
        })

    }


    __showForm(e) {
        form.classList.remove('hidden');
        inputDistance.focus();
        this.#mapEvent = e
        console.log(this.#mapEvent);
    }


    __toggleElevationField() {
        const eleva = inputElevation.parentElement;
        const cadence = inputCadence.parentElement;
        eleva.classList.toggle('form__row--hidden');
        cadence.classList.toggle('form__row--hidden');
    }


    __newWorkout(e) {
        const validInputs = (...inputs) => inputs.every(input => Number.isFinite(input));
        const arePostitive = (...inputs) => inputs.every(input => input >= 0);

        e.preventDefault();
        // Get date  from Form; 
        const type = inputType.value;
        const distance = Number(inputDistance.value);
        const duration = Number(inputDuration.value);
        const { lat, lng } = this.#mapEvent.latlng;
        let workout;

        if (type === "running") {
            const cadence = Number(inputCadence.value);
            if (!validInputs(distance, duration, cadence) || !arePostitive(distance, duration, cadence)) {
                return alert('Input have to positive number');
            }
            workout = new Running([lat, lng], distance, duration, cadence);
        }


        if (type === "cycling") {
            const elevation = Number(inputElevation.value);
            if (!validInputs(distance, duration, elevation) || !arePostitive(distance, duration, elevation)) {
                return alert('Input have to positive number');
            }
            workout = new Cycling([lat, lng], distance, duration, elevation);
        }



        this.#workouts.push(workout);

        this._renderWorkoutMarker(workout);

        // Render work out list
        this._renderWorkout(workout);

        this._hideForm();

        // Set local storage to all work out

        this._setLocalStorage();
    }

    _hideForm() {
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = "";
        form.style.display = "none";
        form.classList.add('hidden');

        setTimeout(() => {
            form.style.display = "grid";
        }, 1000);
    }

    _renderWorkoutMarker(workout) {
        L.marker(workout.coords).addTo(this.#map)
            .bindPopup(L.popup({
                maxWidth: 250,
                minWidth: 100,
                closeOnClick: false,
                autoClose: false,
                className: `${workout.type}-popup`
            }))
            .setPopupContent(String(workout.distance))
            .openPopup();
    }

    _renderWorkout(workout) {
        let html = `
            <li class="workout workout--${workout.type}" data-id="${workout.id}">
            <h2 class="workout__title">${workout.description}</h2>
            <div class="workout__details">
                <span class="workout__icon">${workout.type === "cycling" ? "🚴‍♀️" : "🏃‍♂️"}</span>
                <span class="workout__value">${workout.distance}</span>
                <span class="workout__unit">km</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">⏱</span>
                <span class="workout__value">${workout.duration}</span>
                <span class="workout__unit">min</span>
            </div>`;

        if (workout.type === 'running') {
            html += `
                <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.pace?.toFixed(1)}</span>
                <span class="workout__unit">min/km</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">🐱‍🚀</span>
                <span class="workout__value">${workout.cadence}</span>
                <span class="workout__unit">spm</span>
            </div>
            </li>`;
        }
        if (workout.type === 'cycling') {
            html += `
                <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.speed?.toFixed(1)}</span>
                <span class="workout__unit">km/h</span>
              </div>
              <div class="workout__details">
                <span class="workout__icon">⛰</span>
                <span class="workout__value">${workout.elevationGain}</span>
                <span class="workout__unit">m</span>
              </div>
            </li>`;
        }

        form.insertAdjacentHTML('afterend', html);

    }


    _moveToPopup(e) {
        const workoutEl = e.target.closest('.workout');
        if (!workoutEl) return
        const workout = this.#workouts.find(workout => workout.id = workoutEl.dataset.id);
        this.#map.setView(workout.coords, 13, {
            animate: true,
            duration: 3,
        });

    }

    _setLocalStorage() {
        localStorage.setItem('workouts', JSON.stringify(this.#workouts));

    }

    _getLocalStorage() {
        const data = JSON.parse(localStorage.getItem('workouts'));
        if (!data) return;
        console.log(data);
        this.#workouts = data;

        this.#workouts.forEach(work => {
            this._renderWorkout(work);
        })
    };

    reset() {
        localStorage.removeItem('workouts');
        location.reload();
    }
}

const app = new App();



// if (navigator.geolocation)
//     navigator.geolocation.getCurrentPosition(function success(pos) {
//         const { latitude } = pos.coords;
//         const { longitude } = pos.coords;
//         console.log(`https://www.google.com/maps/@${latitude},${longitude}z`)

//         const coords = [latitude, longitude];
//         map = L.map('map').setView(coords, 13);

//         L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
//             attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         }).addTo(map);


//         map.on('click', function (e) {
//             form.classList.remove('hidden');
//             inputDistance.focus();
//             mapEvent = e
//             console.log(mapEvent)

//         })
//     }, function () {
//         alert("Could not get your current postion");
//     })


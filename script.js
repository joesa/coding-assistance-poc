const solarSystem = document.getElementById('solar-system');
const pausePlayButton = document.getElementById('pause-play');
const speedControl = document.getElementById('speed-control');

let planets = [];
let animationFrameId;
let paused = false;
let speed = 1;

class Planet {
    constructor(name, radius, distance, color) {
        this.name = name;
        this.radius = radius;
        this.distance = distance;
        this.color = color;
        this.angle = Math.random() * 2 * Math.PI; // Random starting angle
    }

    updatePosition() {
        this.angle += speed * 0.01;
        const x = this.distance * Math.cos(this.angle);
        const y = this.distance * Math.sin(this.angle);
        return { x, y };
    }

    render() {
        const position = this.updatePosition();
        const planetElement = document.createElement('div');
        planetElement.classList.add('planet');
        planetElement.style.width = `${this.radius}px`;
        planetElement.style.height = `${this.radius}px`;
        planetElement.style.backgroundColor = this.color;
        planetElement.style.left = `${position.x + this.distance}px`; // Adjust for planet radius
        planetElement.style.top = `${position.y}px`;

        const nameElement = document.createElement('span');
        nameElement.textContent = this.name;
        planetElement.appendChild(nameElement);
        solarSystem.appendChild(planetElement);
    }
}

// Create planets
planets.push(new Planet('Mercury', 10, 50, 'gray'));
planets.push(new Planet('Venus', 15, 100, 'yellow'));
planets.push(new Planet('Earth', 20, 150, 'blue'));
planets.push(new Planet('Mars', 12, 200, 'red'));
planets.push(new Planet('Jupiter', 30, 250, 'orange'));
planets.push(new Planet('Saturn', 25, 300, 'brown'));
planets.push(new Planet('Uranus', 22, 350, 'lightblue'));
planets.push(new Planet('Neptune', 20, 400, 'darkblue'));

function animate() {
    solarSystem.innerHTML = ''; // Clear previous frame
    planets.forEach(planet => planet.render());

    if (!paused) {
        animationFrameId = requestAnimationFrame(animate);
    }
}

pausePlayButton.addEventListener('click', () => {
    paused = !paused;
    if (!paused) {
        animate();
    } else {
        cancelAnimationFrame(animationFrameId);
    }
});

speedControl.addEventListener('input', () => {
    speed = parseFloat(speedControl.value);
});

// Start animation
animate();
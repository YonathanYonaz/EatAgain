let selectedFood = '';
let selectedElement = null;

function checkName() {
    var name = document.getElementById('name').value;
    if (name.toLowerCase() === 'cilla') {
        document.getElementById('question1').classList.add('hidden');
        document.getElementById('question2').classList.remove('hidden');
    } else {
        alert('Sorry, this invitation is only for Cilla!');
    }
}

function selectFood(food, element) {
    selectedFood = food;
    document.getElementById('selectedFoodText').textContent = `Selected food: ${food.charAt(0).toUpperCase() + food.slice(1)}`;

    const foodOptions = document.querySelectorAll('.food-option');
    foodOptions.forEach(option => option.classList.remove('selected'));

    if (food !== 'others') {
        document.getElementById('otherFood').classList.add('hidden');
    }

    if (food === 'others') {
        document.getElementById('otherFood').classList.remove('hidden');
    }

    if (selectedElement) {
        selectedElement.classList.remove('selected');
    }
    element.classList.add('selected');
    selectedElement = element;
}

function goBackToQuestion2() {
    document.getElementById('question2').classList.remove('hidden');
    document.getElementById('question3').classList.add('hidden');
}

function checkFood() {
    if (!selectedFood) {
        alert("Please select a food option!");
        return;
    }

    document.getElementById('question2').classList.add('hidden');
    document.getElementById('question3').classList.remove('hidden');
}

function submitForm() {
    var otherFoodInput = document.getElementById('otherFood').value;
    var dineOption = document.getElementById('dineOption').value;

    var food = (selectedFood === 'others' && otherFoodInput) ? otherFoodInput : selectedFood;

    var summaryText = `Cilla\n ~ ${food}\n ~ ${dineOption === 'dinein' ? 'Dine In' : 'To Go'}`;

    document.getElementById('question3').classList.add('hidden');
    document.getElementById('summary').classList.remove('hidden');
    document.getElementById('summaryText').textContent = summaryText;
}

// Fungsi untuk menghasilkan PDF
function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const name = document.getElementById('name').value;
    const food = selectedFood === 'others' ? document.getElementById('otherFood').value : selectedFood;
    const dineOption = document.getElementById('dineOption').value;

    doc.text('Pilihan makan', 20, 20);
    doc.text(`Name: ${name}`, 20, 30);
    doc.text(`Food: ${food}`, 20, 40);
    doc.text(`Option: ${dineOption === 'dinein' ? 'Dine In' : 'To Go'}`, 20, 50);

    doc.save('receipt.pdf');
}

let isMuted = false;

// Fungsi untuk memulai musik
function playMusic() {
    const audio = document.getElementById('backgroundMusic');
    audio.volume = 0.25; // Set volume ke 25%
    audio.play(); // Memulai musik
    document.getElementById('playMusicBtn').style.display = 'none'; // Sembunyikan tombol Play setelah dipilih
}

// Fungsi untuk mute atau unmute musik
function toggleMute() {
    const audio = document.getElementById('backgroundMusic');
    isMuted = !isMuted;
    audio.muted = isMuted;
    document.getElementById('muteMusicBtn').textContent = isMuted ? 'Unmute' : 'Mute';
}

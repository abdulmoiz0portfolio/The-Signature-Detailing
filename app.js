document.getElementById('bookingForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;

    const bookingData = {
        name: name,
        service: service,
        date: date
    };

    fetch('http://localhost:3000/book-appointment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Booking Successful');
        document.getElementById('bookingForm').reset();
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

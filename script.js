document.addEventListener("DOMContentLoaded", function () {
    // Improved Mock Data with Existing Realistic Variation
    const temperatureData = [25.9, 11.1, 12.4, 23.6, 10.1, 17.2, 33.1, 10.6, 26.4, 21.2, 17.1, 25.6, 21.6, 20.6, 22.1, 30.6, 31.6, 33.1, 11.3, 17.7, 32.0, 32.7, 22.7, 12.2, 13.8, 14.0, 19.4, 21.0, 10.3, 12.1, 20.5, 34.0, 25.0, 14.9, 25.4, 33.3, 19.4, 23.5, 10.6, 29.9];
    const phData = [7.4, 6.7, 7.5, 7.2, 7.2, 6.2, 5.9, 7.3, 5.8, 6.8, 6.0, 6.2, 6.0, 6.3, 7.1, 6.7, 6.0, 7.1, 7.4, 6.8, 6.5, 5.8, 6.9, 7.0, 7.2, 6.3, 6.3, 6.2, 5.7, 5.6];
    const humidityData = [73.0, 54.0, 62.0, 78.0, 44.0, 53.0, 72.0, 46.0, 46.0, 40.0, 38.0, 60.0, 60.0, 45.0, 50.0, 32.0, 68.0, 44.0, 59.0, 79.0, 70.0, 32.0, 44.0, 57.0, 59.0, 54.0, 63.0, 37.0, 53.0, 45.0];
  
    const soilMoistureData = {
      October: Array.from({ length: 31 }, (_, i) => 45 + Math.floor(i / 2)),
      November: Array.from({ length: 30 }, (_, i) => 40 + Math.floor(i / 2)),
      December: Array.from({ length: 31 }, (_, i) => 50 + Math.floor(i / 2)),
    };
  
    // Enhanced Real-Time Data Generation with More Realistic Bounds
    // function generateRealTimeData() {
    //   return {
    //     temperature: Number((10 + Math.random() * 25).toFixed(1)), // Range: 10-35°C
    //     soilMoisture: Number((30 + Math.random() * 30).toFixed(0)), // Range: 30-60%
    //     phLevel: Number((5.5 + Math.random() * 2).toFixed(1)), // Range: 5.5-7.5
    //     humidity: Number((30 + Math.random() * 50).toFixed(0)), // Range: 30-80%
    //   };
    // }
    
  
    // Improved Error Handling for Real-Time Data Display
    function updateRealTimeData() {
      const data = generateRealTimeData();
  
      try {
        ['temperature', 'soilMoisture', 'phLevel', 'humidity'].forEach((metric) => {
          const element = document.getElementById(metric);
          if (element) {
            element.textContent =
              metric === 'temperature'
                ? `${data[metric]}°C`
                : metric === 'phLevel'
                ? data[metric].toFixed(1)
                : `${data[metric]}%`;
          }
        });
      } catch (error) {
        console.error('Error updating real-time data:', error);
      }
    }
    setInterval(updateRealTimeData, 1000);
    function createLineChart(elementId, labels, data, label, borderColor) {
        try {
          const ctx = document.getElementById(elementId).getContext('2d');
      
          // Extract a subset of data to prevent overwhelming the chart
          const displayData = data.slice(0, 30); 
          const displayLabels = labels.slice(0, 30);
      
          return new Chart(ctx, {
            type: 'line',
            data: {
              labels: displayLabels,
              datasets: [{
                label: label,
                data: displayData,
                borderColor: borderColor,
                borderWidth: 2,
                fill: true,
                tension: 0.1,
                pointRadius: 2.9,
                pointHoverRadius: 5
              }]
            },
            options: {
              responsive:true,
              maintainAspectRatio: true, // Allows the chart to scale properly
              plugins: {
                legend: {
                  labels: {
                    color: 'white'
                  }
                }
              },
              scales: {
                x: {
                  ticks: { color: 'white' },
                  grid: { color: 'rgba(255,255,255,0.2)' }
                },
                y: {
                  ticks: { color: 'white' },
                  grid: { color: 'rgba(255,255,255,0.2)' }
                }
              },
              layout: {
                padding: 1 // Optional: Adjust padding if needed
              }
            }
          });
        } catch (error) {
          console.error(`Error creating chart for ${elementId}:`, error);
          return null;
        }
      }
      
  
    // Create Charts with Improved Configuration and Error Handling
    createLineChart(
      'temperatureGraph',
      Array.from({ length: 30}, (_, i) => `${i + 1}`),
      temperatureData.slice(0, 30),
      'Temperature (°C)',
      'rgba(75, 192, 192, 1)'
    );
  
    createLineChart(
      'phGraph',
      Array.from({ length: 12 }, (_, i) => `${i + 1}`),
      phData.slice(0, 12),
      'pH Level',
      'rgba(153, 102, 255, 1)'
    );
  
    createLineChart(
      'humidityGraph',
      Array.from({ length: 24 }, (_, i) => `${i + 1}`),
      humidityData.slice(0, 24),
      'Humidity (%)',
      'rgba(255, 99, 132, 1)'
    );
  });
  document.addEventListener("DOMContentLoaded", function () {
    // Mock Data for Demonstration
    const soilMoistureData = {
      'October': [45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75],
      'November': [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
      'December': [50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80]
    };
  
    let currentMonth = 'October';
    const calendarElement = document.getElementById('soilMoistureCalendar');
    const currentMonthElement = document.getElementById('currentMonth');
  
    // Function to update the calendar display
    function updateCalendar(month) {
      currentMonth = month;
      currentMonthElement.textContent = month;
  
      calendarElement.innerHTML = soilMoistureData[month]
        .map((value, index) => 
          `<div style="margin: 5px; padding: 10px; border: 1px solid white; border-radius: 5px; text-align: center;">
            <strong>Day ${index + 1}:</strong> ${value}%
          </div>`
        ).join('');
    }
  
    // Previous Month Button Event
    document.getElementById('prevMonth').addEventListener('click', () => {
      if (currentMonth === 'November') updateCalendar('October');
      else if (currentMonth === 'December') updateCalendar('November');
    });
  
    // Next Month Button Event
    document.getElementById('nextMonth').addEventListener('click', () => {
      if (currentMonth === 'October') updateCalendar('November');
      else if (currentMonth === 'November') updateCalendar('December');
    });
  
    // Initialize the calendar with the current month
    updateCalendar(currentMonth);

    function updateDateTime() {
      const now = new Date();
      const datetimeString = now.toLocaleString();
      document.getElementById('datetime').textContent = `Current Date and Time: ${datetimeString}`;
  }
  setInterval(updateDateTime, 1000);
  });
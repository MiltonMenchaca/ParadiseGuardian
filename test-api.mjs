import fetch from 'node-fetch';

async function testGenerateLogs() {
  try {
    console.log("Testing POST /api/logs/generate");
    const response = await fetch('http://localhost:5000/api/logs/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ count: 5 })
    });
    
    const data = await response.json();
    console.log("Status:", response.status);
    console.log("Response:", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error:", error.message);
  }
}

testGenerateLogs(); 
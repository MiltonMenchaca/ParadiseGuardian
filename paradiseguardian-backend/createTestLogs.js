import dotenv from "dotenv";
import geoip from "geoip-lite";
import * as UAParser from "ua-parser-js";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

// Array of possible sources for logs
const sources = [
  "firewall",
  "application",
  "database",
  "server",
  "network",
  "authentication"
];

// Array of possible severities
const severities = ["low", "medium", "high", "critical"];

// Example messages by severity
const messagesByLevel = {
  low: [
    "Routine user activity detected",
    "Service restarted successfully",
    "Update completed",
    "Scheduled backup completed",
    "User logged in successfully"
  ],
  medium: [
    "Multiple failed login attempts",
    "Disk space below 20%",
    "High CPU usage detected (>80%)",
    "Elevated network latency",
    "Service automatically restarted"
  ],
  high: [
    "Possible attack detected in firewall",
    "Unauthorized access attempt blocked",
    "Critical service not responding",
    "Authentication service failure",
    "Recurring database system failures"
  ],
  critical: [
    "Security breach detected",
    "Denial of service attack (DDoS) in progress",
    "Databases inaccessible",
    "Critical system compromised",
    "Multiple intrusions detected in the system"
  ]
};

// Function to generate a random timestamp in the last 24 hours
function getRandomTimestamp() {
  const now = new Date();
  const hoursAgo = Math.floor(Math.random() * 24);
  const minutesAgo = Math.floor(Math.random() * 60);
  const secondsAgo = Math.floor(Math.random() * 60);
  
  now.setHours(now.getHours() - hoursAgo);
  now.setMinutes(now.getMinutes() - minutesAgo);
  now.setSeconds(now.getSeconds() - secondsAgo);
  
  return now;
}

// Function to generate random IP addresses
function generateRandomIP() {
  return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
}

// Function to enrich log data with additional information
function enrichLogData(logData) {
  // Add correlation ID for tracking related events
  logData.correlationId = uuidv4();
  
  // Generate random IP address
  const ip = generateRandomIP();
  logData.ipAddress = ip;
  
  // Get location data from IP using geoip-lite
  try {
    const geo = geoip.lookup(ip);
    if (geo) {
      logData.location = geo.city ? `${geo.city}, ${geo.region}` : 'Unknown';
      logData.country = geo.country;
    } else {
      // Generate random location if GeoIP doesn't have data
      const cities = ['New York', 'London', 'Tokyo', 'Sydney', 'Berlin', 'São Paulo', 'Mumbai', 'Cairo'];
      const countries = ['US', 'GB', 'JP', 'AU', 'DE', 'BR', 'IN', 'EG'];
      const cityIndex = Math.floor(Math.random() * cities.length);
      
      logData.location = cities[cityIndex];
      logData.country = countries[cityIndex];
    }
  } catch (error) {
    console.error('Error getting location data:', error.message);
  }
  
  // Generate random user agent information
  const devices = ['Desktop', 'Mobile', 'Tablet'];
  const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge'];
  const oses = ['Windows 10', 'macOS', 'Android', 'iOS'];
  
  logData.device = devices[Math.floor(Math.random() * devices.length)];
  logData.browser = browsers[Math.floor(Math.random() * browsers.length)];
  logData.os = oses[Math.floor(Math.random() * oses.length)];
  
  // Add additional data sometimes
  if (Math.random() > 0.7) {
    logData.additionalData = {
      processingTime: Math.floor(Math.random() * 1000),
      memoryUsage: Math.floor(Math.random() * 100) + 'MB',
      endpoint: ['api/users', 'api/auth', 'api/data', 'api/settings'][Math.floor(Math.random() * 4)]
    };
  }
  
  return logData;
}

// Function to generate a random log
function generateRandomLog() {
  const source = sources[Math.floor(Math.random() * sources.length)];
  const severity = severities[Math.floor(Math.random() * severities.length)];
  const message = messagesByLevel[severity][Math.floor(Math.random() * messagesByLevel[severity].length)];
  const timestamp = getRandomTimestamp();

  // Create base log data
  const logData = {
    source,
    severity,
    message,
    timestamp
  };
  
  // Enrich with additional data
  return enrichLogData(logData);
}

function createTestLogs() {
  try {
    console.log("*** Simulating Log Creation (No Database) ***");
    
    // Number of logs to create
    const logsCount = 20;
    
    console.log(`Generating ${logsCount} sample enriched logs...\n`);
    
    // Create logs one by one
    for (let i = 0; i < logsCount; i++) {
      const logData = generateRandomLog();
      console.log(`\n--- Log Example ${i+1} ---`);
      console.log(`Severity: [${logData.severity.toUpperCase()}]`);
      console.log(`Source: ${logData.source}`);
      console.log(`Message: ${logData.message}`);
      console.log(`Location: ${logData.location}, ${logData.country}`);
      console.log(`IP: ${logData.ipAddress}`);
      console.log(`Device: ${logData.device} | OS: ${logData.os} | Browser: ${logData.browser}`);
      console.log(`Correlation ID: ${logData.correlationId}`);
      if (logData.additionalData) {
        console.log(`Additional Data: ${JSON.stringify(logData.additionalData, null, 2)}`);
      }
    }
    
    console.log(`\n${logsCount} sample logs generated successfully!`);
    console.log("\nTo use these enriched logs in your application:");
    console.log("1. Start your PostgreSQL database");
    console.log("2. Run the backend server: npm run dev");
    console.log("3. Use the 'Generate test logs' button in the dashboard");
    
  } catch (error) {
    console.error("Error generating sample logs:", error);
  }
}

// Execute the function
createTestLogs(); 
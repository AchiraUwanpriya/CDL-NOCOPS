// This file provides mock data for demonstration purposes
// In a real application, this would be replaced with actual API calls

// Generate random number between min and max
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Generate mock network data
export const mockNetworkData = () => {
  return {
    bandwidth: getRandomNumber(50, 150),  // Mbps
    download: getRandomNumber(30, 120),   // Mbps
    upload: getRandomNumber(10, 50)       // Mbps
  }
}

// In a real application, you would have functions like:
// export const fetchNetworkData = async (ipAddress) => { ... }

// Simple toast implementation
export const toast = {
  success: (message) => {
    alert(`✅ ${message}`);
  },
  error: (message) => {
    alert(`❌ ${message}`);
  },
  info: (message) => {
    alert(`ℹ️ ${message}`);
  }
};



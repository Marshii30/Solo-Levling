// Asia/Kolkata date string
export function todayIST(){
  const now = new Date();
  // Convert to IST (UTC+5:30) string YYYY-MM-DD
  const istOffset = 5.5 * 60; // minutes
  const utc = now.getTime() + now.getTimezoneOffset()*60000;
  const ist = new Date(utc + istOffset*60000);
  return ist.toISOString().slice(0,10);
}

// MergX v8.53 – Baslogik
document.addEventListener("DOMContentLoaded", () => {
  console.log("MergX App initierad — Dashboard v8.53 laddad");

  const btn = document.getElementById("refreshDashboard");
  if (btn) {
    btn.addEventListener("click", () => {
      location.reload();
    });
  }

  // Här kan du senare koppla på AI-nav, ruttplanerare, CRM osv.
});

import './styles/main.css'

// Router sederhana
const routes = {
  '/': 'dashboard',
  '/products': 'products',
  '/inventory': 'inventory',
  '/shipping': 'shipping',
  '/ai': 'ai'
}

async function loadPage(page) {
  const app = document.getElementById('app')
  
  // Load komponen Navbar dan Sidebar
  const navbar = await import('./components/Navbar.js')
  const sidebar = await import('./components/Sidebar.js')
  
  // Load halaman yang diminta
  let pageModule
  try {
    pageModule = await import(`./pages/${page}.js`)
  } catch (error) {
    pageModule = await import('./pages/dashboard.js')
  }
  
  // Render semua komponen
  app.innerHTML = `
    ${navbar.default()}
    <div class="flex">
      ${sidebar.default()}
      <main class="flex-1 p-6 ml-64 mt-16">
        ${pageModule.default()}
      </main>
    </div>
  `
  
  // Tambahkan event listeners untuk navigasi
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      const path = e.target.getAttribute('href') || e.target.closest('a').getAttribute('href')
      window.history.pushState({}, '', path)
      loadPage(routes[path] || 'dashboard')
    })
  })
}

// Handle browser back/forward
window.addEventListener('popstate', () => {
  const path = window.location.pathname
  loadPage(routes[path] || 'dashboard')
})

// Load halaman berdasarkan URL saat ini
const currentPath = window.location.pathname
loadPage(routes[currentPath] || 'dashboard')
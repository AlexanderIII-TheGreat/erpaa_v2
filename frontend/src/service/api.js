// Data dummy untuk semua halaman
export const dummyData = {
  dashboard: {
    mainProblems: [
      {
        id: 1,
        title: "Penjualan turun 8% karena produk X kehabisan stok",
        severity: "high",
        impact: "Sales decline",
        suggestedAction: "Restock produk X dalam 2 hari akan memulihkan ±6% penjualan",
        products: ["Produk X"],
        deadline: "2 days"
      },
      {
        id: 2,
        title: "Marketplace A mengalami keterlambatan pengiriman 3 hari",
        severity: "medium",
        impact: "Customer complaints",
        suggestedAction: "Switch to alternative courier for Marketplace A orders",
        products: [],
        deadline: "Immediate"
      },
      {
        id: 3,
        title: "Produk B margin rendah (15%) meski penjualan tinggi",
        severity: "low",
        impact: "Profit erosion",
        suggestedAction: "Consider price adjustment or cost reduction",
        products: ["Produk B"],
        deadline: "1 week"
      }
    ],
    toCheck: [
      { id: 1, item: "Produk X", type: "product", reason: "Stok hampir habis", priority: "high" },
      { id: 2, item: "Marketplace A", type: "channel", reason: "Pengiriman terlambat", priority: "high" },
      { id: 3, item: "Gudang Utara", type: "inventory", reason: "Slow moving items", priority: "medium" },
      { id: 4, item: "Produk B", type: "product", reason: "Margin rendah", priority: "medium" }
    ],
    metrics: {
      sales: { value: "Rp 42.8jt", trend: "+8.2%" },
      orders: { value: "128", trend: "+12%" },
      profit: { value: "Rp 8.5jt", trend: "+5.1%" },
      customers: { value: "89", trend: "+3.4%" }
    }
  },
  
  products: {
    list: [
      {
        id: 1,
        name: "Smartphone X Pro",
        sku: "SPX-2024-001",
        category: "Electronics",
        stock: 12,
        price: "Rp 4,299,000",
        cost: "Rp 3,200,000",
        margin: "25.6%",
        status: "active",
        sales: 45,
        trend: "+18%",
        performance: "high"
      },
      {
        id: 2,
        name: "Wireless Earbuds Lite",
        sku: "WEB-2024-002",
        category: "Audio",
        stock: 56,
        price: "Rp 549,000",
        cost: "Rp 420,000",
        margin: "23.5%",
        status: "active",
        sales: 89,
        trend: "+32%",
        performance: "high"
      },
      {
        id: 3,
        name: "Laptop Business Edition",
        sku: "LBE-2024-003",
        category: "Computers",
        stock: 8,
        price: "Rp 12,999,000",
        cost: "Rp 10,500,000",
        margin: "19.2%",
        status: "active",
        sales: 12,
        trend: "+5%",
        performance: "medium"
      },
      {
        id: 4,
        name: "Smart Watch Series 3",
        sku: "SWS-2024-004",
        category: "Wearables",
        stock: 34,
        price: "Rp 1,299,000",
        cost: "Rp 1,100,000",
        margin: "15.3%",
        status: "active",
        sales: 23,
        trend: "-8%",
        performance: "low"
      },
      {
        id: 5,
        name: "Bluetooth Speaker Pro",
        sku: "BSP-2024-005",
        category: "Audio",
        stock: 67,
        price: "Rp 799,000",
        cost: "Rp 520,000",
        margin: "34.9%",
        status: "active",
        sales: 56,
        trend: "+22%",
        performance: "high"
      },
      {
        id: 6,
        name: "Tablet Mini Kids",
        sku: "TMK-2024-006",
        category: "Tablets",
        stock: 0,
        price: "Rp 2,499,000",
        cost: "Rp 1,800,000",
        margin: "28.0%",
        status: "inactive",
        sales: 34,
        trend: "+15%",
        performance: "medium"
      },
      {
        id: 7,
        name: "Gaming Mouse RGB",
        sku: "GMR-2024-007",
        category: "Gaming",
        stock: 45,
        price: "Rp 349,000",
        cost: "Rp 250,000",
        margin: "28.4%",
        status: "active",
        sales: 78,
        trend: "+41%",
        performance: "high"
      },
      {
        id: 8,
        name: "USB-C Hub 8-in-1",
        sku: "UCH-2024-008",
        category: "Accessories",
        stock: 89,
        price: "Rp 299,000",
        cost: "Rp 180,000",
        margin: "39.8%",
        status: "active",
        sales: 112,
        trend: "+28%",
        performance: "high"
      },
      {
        id: 9,
        name: "External SSD 1TB",
        sku: "ESS-2024-009",
        category: "Storage",
        stock: 23,
        price: "Rp 1,899,000",
        cost: "Rp 1,550,000",
        margin: "18.4%",
        status: "active",
        sales: 19,
        trend: "+3%",
        performance: "medium"
      },
      {
        id: 10,
        name: "Noise Cancelling Headphones",
        sku: "NCH-2024-010",
        category: "Audio",
        stock: 15,
        price: "Rp 3,499,000",
        cost: "Rp 2,800,000",
        margin: "20.0%",
        status: "active",
        sales: 27,
        trend: "+12%",
        performance: "medium"
      }
    ],
    insights: [
      "Produk B laku keras tapi margin rendah, berisiko jangka panjang",
      "Produk X memberikan margin tertinggi (39.8%)",
      "3 produk dengan stok kurang dari 10 unit"
    ]
  },
  
  inventory: {
    logs: [
      { id: 1, product: "Smartphone X Pro", type: "out", quantity: 5, reason: "E-commerce sale", date: "2024-01-15", user: "System" },
      { id: 2, product: "Wireless Earbuds Lite", type: "in", quantity: 50, reason: "Restock", date: "2024-01-14", user: "Admin" },
      { id: 3, product: "Tablet Mini Kids", type: "damaged", quantity: 2, reason: "Broken screen", date: "2024-01-14", user: "Warehouse" },
      { id: 4, product: "Gaming Mouse RGB", type: "out", quantity: 12, reason: "Offline sale", date: "2024-01-13", user: "POS" },
      { id: 5, product: "USB-C Hub 8-in-1", type: "out", quantity: 8, reason: "E-commerce sale", date: "2024-01-13", user: "System" },
      { id: 6, product: "Laptop Business Edition", type: "in", quantity: 20, reason: "New shipment", date: "2024-01-12", user: "Admin" },
      { id: 7, product: "Bluetooth Speaker Pro", type: "out", quantity: 15, reason: "Wholesale", date: "2024-01-12", user: "Sales" },
      { id: 8, product: "Smart Watch Series 3", type: "out", quantity: 7, reason: "E-commerce sale", date: "2024-01-11", user: "System" }
    ],
    signals: [
      { product: "Tablet Mini Kids", issue: "Stok habis", days: 5, impact: "High" },
      { product: "Smartphone X Pro", issue: "Stok menipis", days: 2, impact: "High" },
      { product: "External SSD 1TB", issue: "Slow moving", days: 60, impact: "Medium" },
      { product: "USB-C Hub 8-in-1", issue: "Fast moving", days: 7, impact: "Low" }
    ],
    summary: {
      totalItems: 356,
      lowStock: 5,
      outOfStock: 1,
      totalValue: "Rp 1.2M"
    }
  },
  
  shipping: {
    shipments: [
      { id: "SH-001", orderId: "ORD-2024-001", channel: "Marketplace A", status: "Delayed", customer: "Budi Santoso", eta: "2024-01-16", delay: "3 days" },
      { id: "SH-002", orderId: "ORD-2024-002", channel: "Marketplace B", status: "In Transit", customer: "Siti Nurhaliza", eta: "2024-01-15", delay: "0 days" },
      { id: "SH-003", orderId: "ORD-2024-003", channel: "Website", status: "Delivered", customer: "Andi Wijaya", eta: "2024-01-14", delay: "0 days" },
      { id: "SH-004", orderId: "ORD-2024-004", channel: "Marketplace A", status: "Delayed", customer: "Dewi Lestari", eta: "2024-01-17", delay: "2 days" },
      { id: "SH-005", orderId: "ORD-2024-005", channel: "Marketplace C", status: "Processing", customer: "Rudi Hartono", eta: "2024-01-18", delay: "0 days" },
      { id: "SH-006", orderId: "ORD-2024-006", channel: "Marketplace A", status: "Delayed", customer: "Maya Indah", eta: "2024-01-16", delay: "3 days" },
      { id: "SH-007", orderId: "ORD-2024-007", channel: "Marketplace B", status: "In Transit", customer: "Hendra Kurnia", eta: "2024-01-15", delay: "0 days" },
      { id: "SH-008", orderId: "ORD-2024-008", channel: "Website", status: "Delivered", customer: "Linda Sari", eta: "2024-01-13", delay: "0 days" }
    ],
    analysis: [
      { channel: "Marketplace A", totalShipments: 45, delayed: 12, delayRate: "26.7%", avgDelay: "2.3 days" },
      { channel: "Marketplace B", totalShipments: 32, delayed: 3, delayRate: "9.4%", avgDelay: "1.2 days" },
      { channel: "Website", totalShipments: 28, delayed: 2, delayRate: "7.1%", avgDelay: "1.0 days" },
      { channel: "Marketplace C", totalShipments: 19, delayed: 1, delayRate: "5.3%", avgDelay: "0.5 days" }
    ]
  },
  
  ai: {
    questions: [
      "Jika harga naik 5%?",
      "Jika tambah biaya gudang?",
      "Apa dampaknya ke profit?",
      "Jika buka channel baru?",
      "Jika stok dikurangi 20%?"
    ],
    simulations: [
      {
        question: "Jika harga naik 5%?",
        answer: "Revenue naik ±Rp 2.1jt/bulan, tapi sales bisa turun 3-8% tergantung produk. Produk dengan margin rendah lebih sensitif.",
        impact: "mixed",
        confidence: "85%"
      },
      {
        question: "Jika tambah biaya gudang?",
        answer: "Profit turun ±Rp 1.8jt/bulan. Rekomendasi: optimasi layout gudang dulu sebelum ekspansi.",
        impact: "negative",
        confidence: "92%"
      }
    ]
  }
}

// Fungsi untuk mengambil data
export function getDashboardData() {
  return dummyData.dashboard
}

export function getProductsData() {
  return dummyData.products
}

export function getInventoryData() {
  return dummyData.inventory
}

export function getShippingData() {
  return dummyData.shipping
}

export function getAIData() {
  return dummyData.ai
}

// Simulasi API call
export async function fetchData(endpoint) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyData[endpoint] || {})
    }, 300)
  })
}
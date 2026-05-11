# JomOrder

## MVP

Good — this is the right step. If you try to build “everything” like the big systems, you’ll get stuck. An MVP should be small, fast to build, and solves ONE painful problem clearly.

👉 “Customers can order without waiting for waiter”

Let’s design that properly.

---

## 🎯 1. Your MVP Goal

A customer sits at table → scans QR → orders → kitchen receives it instantly.

That’s it.

No inventory, no AI, no loyalty (yet).

---

## 🧩 2. Core MVP Features

### 👤 Customer Side (Mobile Web – no app install)

Features:

- 📷 Scan QR → open menu (browser)
- 🍽️ View menu
  - Item name
  - Price
  - Simple image
- ➕ Add to cart
- 📝 Add notes (e.g. “no chili”)
- ✅ Place order
- 🔢 Auto table number (from QR)

### 🏪 Restaurant Admin (Web dashboard)

Features:

- 📋 Manage menu
  - Add/edit/delete items
  - Set price
  - Upload photo
- 🪑 Generate QR code per table
- 📦 View incoming orders (live)

### 👨‍🍳 Kitchen View

Features:

- 🔔 New order notification
- 📺 Live order list
  - Table number
  - Items + notes
- ✔️ Mark as “Preparing” / “Done”

---

## ⚡ 3. Optional MVP+ Features

### 💬 WhatsApp Integration

- After order → send to WhatsApp
- Owner gets order even without system open

### 🔔 Customer Status Page

- Preparing
- Ready

---

## ❌ 4. Features to Avoid for MVP

- ❌ Payment gateway
- ❌ Inventory system
- ❌ Loyalty points
- ❌ Multi-branch
- ❌ Advanced analytics

---

## 🧱 5. MVP Architecture

### Recommended Stack

- Frontend: React / Vite
- Backend: Supabase
- Hosting: Vercel

### Why

- Real-time updates
- No server maintenance
- Fast deployment
- Cheap to run

---

## 🔄 6. User Flow

### Customer

1. Sit at table
2. Scan QR
3. Open menu
4. Add items
5. Place order

### Kitchen

1. Order appears instantly
2. Prepare food
3. Click “Done”

### Restaurant

1. See all orders
2. Manage menu anytime

---

## 💡 7. Differentiation for Terengganu

- 🇲🇾 Bahasa Melayu first
- 🧓 Simple for older owners
- 📶 Works on slow internet
- 💰 Cheap subscription (RM20–RM30)

---

## 🧪 8. MVP Success Test

Your MVP is successful if:

- Restaurants can use it without training
- Orders reach kitchen without error
- It reduces waiter workload

---

# Business Model Canvas (BMC)

## 🧠 1. Core Value Proposition

👉 “Kurangkan waiter, cepatkan order, tambah jualan — tanpa susah guna.”

English:

Reduce staff workload, faster ordering, increase revenue — without complexity.

---

## 🎯 2. Target Market

### Primary

- Warung / kedai makan
- Small cafés
- Nasi campur / tomyam shops

### Secondary

- Mid-range restaurants
- Tourist area eateries

---

## 💰 3. Pricing Strategy

### 🟢 FREE Plan

- Max 20 menu items
- 5 tables QR
- Basic ordering
- JomOrder branding

### 🔵 Basic Plan — RM29/month

- Unlimited menu
- Unlimited tables
- Remove branding
- Basic reports

### 🟣 Pro Plan — RM59/month

- WhatsApp integration
- Order status tracking
- Priority support

---

## 📦 4. Revenue Streams

### 💳 Payment Commission

- FPX / DuitNow integration
- Small transaction fee

### 📊 Upsell Features

- Advanced analytics
- Multi-branch dashboard

### 🧾 Hardware Bundle

- Tablet + setup package
- RM300–RM800 one-time

---

## 🚀 5. Go-To-Market Strategy

### Step 1: Ground Sales

- Visit restaurants physically
- Demo live on phone
- Show QR ordering flow

### Step 2: WhatsApp Marketing

- Demo video
- Before/after comparison
- Bahasa Melayu explanation

### Step 3: Pilot Program

- 1 month free
- Setup included
- Collect testimonials

### Step 4: Focus Area

Start with:

- Kuala Terengganu

Expand after traction.

---

## 🧩 6. Cost Structure

Main costs:

- Hosting
- Development time
- Sales & transport

Estimated infrastructure cost:

- Under RM200/month

---

## ⚖️ 7. Competitive Positioning

| JomOrder              | Others        |
| --------------------- | ------------- |
| Simple                | Complex       |
| Cheap                 | Expensive     |
| Bahasa Melayu focused | English-heavy |
| WhatsApp-friendly     | App-heavy     |

---

## 💡 8. Unique Advantage

### 🇲🇾 Localization

- Full Bahasa Melayu UI
- Local food categories

### 📱 Behavior-Based Design

- No login required
- Instant QR access

### 🤝 Human Support

- Help owners setup menu
- Simple onboarding

---

## 📈 9. Growth Projection

### Month 1–2

- 5–10 restaurants

### Month 3–6

- 30–50 restaurants
- Start referrals

### Month 6+

- Expand to other states

---

# Pitch Script

## 🎤 Opening

“Boss, saya nak tunjuk cara pelanggan boleh order guna phone je, tak perlu tunggu waiter. Boleh jimat masa dan kurangkan kerja pekerja.”

---

## 👀 Demo

“Contoh kalau saya duduk meja sini…”

(Scan QR → show menu → add item)

“Saya tekan order, terus masuk ke dapur. Tak perlu tulis kertas.”

---

## 😩 Pain Point

“Sekarang kalau ramai customer, mesti:

- waiter tak cukup
- order lambat
- kadang-kadang salah tulis order”

---

## 💡 Solution

“Dengan sistem ni:

- customer order sendiri
- order terus masuk dapur
- kurang salah, lebih cepat”

---

## 💰 Pricing

“Tak mahal boss, lebih kurang RM1 sehari je.”

---

## 🧪 Remove Risk

“Boss boleh cuba free dulu. Saya setup semua untuk boss.”

---

## 🤝 Soft Close

“Kalau boss ok, saya boleh setup satu meja dulu untuk test. Tengok customer suka tak.”

---

# Wireframe

## 📱 Customer Flow

### 🟢 Screen 1 — Landing Page

```text
┌──────────────────────────┐
│        ☕ JomCafe        │
│   Fresh Coffee & Meals   │
│                          │
│        Table 05          │
│                          │
│   Welcome to JomCafe 👋  │
│                          │
│ [      Lihat Menu      ] │
│                          │
└──────────────────────────┘
```

### 🟢 Screen 2 — Menu List

```text
┌──────────────────────────┐
│ 🔍 Search makanan...     │
├──────────────────────────┤
│ [ Semua ] [ Makanan ]    │
│ [ Minuman ] [ Dessert ]  │
├──────────────────────────┤
│ 🍛 Nasi Goreng           │
│ RM8                      │
│ [ Image ]                │
│             [ Lihat ]    │
├──────────────────────────┤
│ 🥤 Milo Ais              │
│ RM4                      │
│ [ Image ]                │
│             [ Lihat ]    │
├──────────────────────────┤
│ 🛒 Cart (2)              │
└──────────────────────────┘
```

### 🟢 Screen 3 — Food Details

```text
┌──────────────────────────┐
│      🍛 Nasi Goreng      │
├──────────────────────────┤
│                          │
│       [ Food Image ]     │
│                          │
├──────────────────────────┤
│ RM8                      │
│                          │
│ Fried rice with chicken  │
│ and vegetables           │
│                          │
├──────────────────────────┤
│ Quantity                 │
│ [-]   1   [+]            │
│                          │
│ Notes                    │
│ [ less spicy ]           │
│                          │
│ [    Add to Cart      ]  │
└──────────────────────────┘
```

### 🟢 Screen 4 — Cart

```text
┌──────────────────────────┐
│      🛒 Your Order       │
│        Table 05          │
├──────────────────────────┤
│ Nasi Goreng x2           │
│ RM16                     │
│ Note: less spicy         │
│                          │
│ Milo Ais x1              │
│ RM4                      │
├──────────────────────────┤
│ Total: RM20              │
├──────────────────────────┤
│ Payment Method           │
│                          │
│ ○ Pay at Counter         │
│                          │
│ [    Place Order      ]  │
└──────────────────────────┘
```

### 🟢 Screen 5 — Order Success

```text
┌──────────────────────────┐
│          ✅              │
│     Order Received!      │
│                          │
│        Table 05          │
│                          │
│ Your order has been sent │
│ to the kitchen.          │
│                          │
│ [   View Order Status ]  │
└──────────────────────────┘
```

### 🟢 Screen 6 — Order Status

#### Preparing State

```text
┌──────────────────────────┐
│      🍳 Order Status     │
├──────────────────────────┤
│ Table 05                 │
│                          │
│ 🟡 Preparing             │
│                          │
│ Your food is being       │
│ prepared.                │
│                          │
│ Please wait...           │
└──────────────────────────┘
```

#### Ready State

```text
┌──────────────────────────┐
│      🍳 Order Status     │
├──────────────────────────┤
│ Table 05                 │
│                          │
│ 🟢 Ready                 │
│                          │
│ Your order is ready.     │
│                          │
│ Please collect at        │
│ counter.                 │
└──────────────────────────┘
```

---

## 🔄 Final Customer Flow

```text
Scan QR
   ↓
Home
   ↓
Menu
   ↓
Food Details
   ↓
Cart / Checkout
   ↓
Order Success
   ↓
Order Status
```

---

## 📱 Navigation Structure

### Top Bar

```text
☕ JomCafe          Table 05
```

Purpose:

- Show restaurant name
- Show table number
- Consistent across screens

---

### Bottom Tab Bar

```text
🏠 Home   🍽️ Menu   🛒 Cart(2)
```

Navigation Tabs:

| Tab      | Purpose                 |
| -------- | ----------------------- |
| 🏠 Home  | Restaurant landing page |
| 🍽️ Menu | Browse foods & drinks   |
| 🛒 Cart  | Current order           |

---

---

## 👨‍🍳 Kitchen Screen

```text
--------------------------------
🔥 New Orders

[ Table 5 ]
- Nasi Goreng
  note: no chili
- Milo Ais

[ Start Preparing ] [ Done ]

------------------------------

[ Table 2 ]
- Nasi Ayam

[ Done ]
--------------------------------
```

---

## 🏪 Admin Dashboard

### Dashboard

```text
--------------------------------
Today Orders: 23
Revenue: RM320

[ Manage Menu ]
[ View Orders ]
[ QR Tables ]
--------------------------------
```

### Manage Menu

```text
--------------------------------
Menu Items

+ Add Item

- Nasi Goreng   RM8   [Edit]
- Nasi Ayam     RM7   [Edit]
- Milo Ais      RM3   [Edit]
--------------------------------
```

### Add/Edit Item

```text
--------------------------------
Item Name:
[ Nasi Goreng ]

Price:
[ 8 ]

Category:
[ Nasi ]

Upload Image

[ Save ]
--------------------------------
```

### QR Table Generator

```text
--------------------------------
Tables

Table 1   [Download QR]
Table 2   [Download QR]
Table 3   [Download QR]

+ Add Table
--------------------------------
```

---

# Design Principles

- Minimum text
- Bahasa Melayu friendly
- One action per screen
- Full rounded button


# InvoSync

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/Manavarya09/HomeStuco/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blue.svg)](https://github.com/Manavarya09/HomeStuco/pulls)
[![Stars](https://img.shields.io/github/stars/Manavarya09/HomeStuco?style=social)](https://github.com/Manavarya09/HomeStuco/stargazers)

> **🚧 Project Status: UNDER PROGRESS 🚧**
>
> This project is actively being developed. Major features and backend integration are in progress. Contributions and feedback are welcome!

---

![InvoSync Logo](https://dummyimage.com/600x150/222/fff&text=InvoSync+AI+Bookkeeping) <!-- Replace with your logo -->

## 📦 Overview
**InvoSync** is an AI-powered Invoice & Receipt Mapper for automated bookkeeping. Upload raw invoice/receipt text and get structured data for easy accounting, analytics, and export. Future versions will support PDF/image OCR and SaaS billing.

---

## 💡 Why InvoSync?
- Manual bookkeeping is slow, error-prone, and expensive.
- InvoSync automates extraction, mapping, and export of invoice/receipt data.
- Designed for freelancers, SMBs, accountants, and SaaS platforms.
- Open source, privacy-first, and extensible for custom workflows.

---

## 🚀 Tech Stack

| Frontend         | Backend           | Database    | Auth         | File Upload | Parsing      | Exports      |
|------------------|------------------|-------------|--------------|-------------|--------------|--------------|
| React, TailwindCSS, Framer Motion, Three.js | Node.js (Express) | PostgreSQL | Firebase Auth | Raw Text, PDF | Regex + NLP | JSON, CSV, Excel |

![Tech Stack](https://dummyimage.com/800x120/333/fff&text=React+Tailwind+Node+Postgres+Firebase+Stripe) <!-- Replace with your own diagram -->

---

## ✨ Highlights
- **AI-powered invoice/receipt parsing**
- **Modern 3D UI/UX** (Three.js, Framer Motion)
- **Export to JSON, CSV, Excel**
- **Secure authentication (Firebase)**
- **PostgreSQL for scalable data**
- **Open source & MIT licensed**

---

## 🎯 Features
- **Invoice Upload & Parsing**: Upload raw text, get structured JSON (vendor, date, line items, totals, currency)
- **Dashboard**: Table view, JSON viewer, 3D animated expense charts
- **Export**: Download as JSON, CSV, Excel
- **Auth**: Email & Google login (Firebase)
- **Modern UI**: 3D hero, glassmorphism auth, dark mode
- **Multi-user support**
- **Mobile responsive**
- **Planned: PDF/image OCR, API access, SaaS billing**

---

## 🗂️ Database Schema

```
User
├─ Invoice
   ├─ LineItem
```

---

## 🛣️ Roadmap
- [x] Frontend scaffolding
- [x] Backend API setup
- [x] Database schema
- [ ] Invoice parsing MVP
- [ ] File upload (PDF)
- [ ] 3D dashboard charts
- [ ] Export to CSV/Excel
- [ ] Mobile UI polish
- [ ] API docs
- [ ] SaaS billing (Stripe)
- [ ] PDF/image OCR
- [ ] Multi-language support

---

## 📸 Screenshots & Demo

> _Screenshots and demo GIFs coming soon!_
> [Demo Link](#) <!-- Add your live demo link here -->

---

## 🛠️ Setup & Development

```bash
# Clone the repo
$ git clone https://github.com/Manavarya09/HomeStuco.git

# Install dependencies
$ cd invoSync-main/frontend && npm install
$ cd ../backend && npm install

# Set up environment variables
# (edit .env files for backend: PostgreSQL, Firebase)

# Run backend migrations
$ npx prisma migrate dev

# Start backend
$ npm run dev

# Start frontend
$ npm run dev
```

---

## 🤝 Contributing

- Open issues for bugs/feature requests
- Submit PRs for improvements
- See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines
- Join our [Discussions](https://github.com/Manavarya09/HomeStuco/discussions)

---

## 🌍 Community & Support
- [GitHub Issues](https://github.com/Manavarya09/HomeStuco/issues)
- [Discussions](https://github.com/Manavarya09/HomeStuco/discussions)
- Email: manavarya.singh@gmail.com

---

## ❓ FAQ
**Q: Is this production-ready?**
A: Not yet! MVP is in progress. Watch/star for updates.

**Q: Can I use my own invoice format?**
A: Yes, the parser is extensible. Open an issue for custom mapping.

**Q: Will it support PDF/image OCR?**
A: Planned for future releases.

**Q: Is my data private?**
A: Yes, all data is stored securely and never shared.

---

## 📄 License
MIT

---

## 🔎 Keywords
`AI bookkeeping` `invoice parser` `receipt mapping` `React` `Node.js` `PostgreSQL` `Firebase` `Three.js` `SaaS` `CSV export` `Excel export` `open source` `OCR` `automation` `accounting` `startup` `cloud` `business` `finance` `data export` `analytics` `modern UI` `glassmorphism` `3D dashboard`

---

> **InvoSync** — AI-powered bookkeeping for modern businesses. _Made with ❤️ by Manavarya Singh and contributors._

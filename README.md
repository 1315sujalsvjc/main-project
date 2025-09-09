# main-project
budget tracker 
# 💰 Budget Planner

A simple and interactive finance dashboard that helps track income, expenses, and savings goals.  
Built with **Vue.js**, **Firebase**, and **Chart.js**, this project aims to make personal finance easy to visualize and manage.

---

## 🚀 Features
- Add, edit, and delete **income** and **expense** entries  
- Categorize transactions (e.g., Food, Travel, Rent, etc.)  
- Filter and view data by **category** or **month**  
- Visualize spending with **pie charts** and **bar graphs**  
- Track **savings goals** with progress indicators  
- Secure user authentication using **Firebase Auth**  
- Real-time data storage and sync with **Firestore**

---

## 🛠️ Tech Stack
- **Frontend:** Vue.js  
- **Charts:** Chart.js (or D3.js)  
- **Backend / Auth / Database:** Firebase (Auth + Firestore)  
- **Hosting:** Firebase Hosting (optional)

---

## 📂 Project Structure
budget-planner/
├── public/ # Static assets
├── src/
│ ├── components/ # Reusable Vue components
│ ├── views/ # Page-level components
│ ├── router/ # Vue Router setup
│ ├── store/ # State management
│ ├── firebase.js # Firebase configuration
│ └── App.vue # Root Vue component
├── package.json
└── README.md

yaml
Copy code

---

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/budget-planner.git
   cd budget-planner
Install dependencies

bash
Copy code
npm install
Configure Firebase

Create a Firebase project in Firebase Console.

Enable Firestore Database and Authentication (Email/Password or Google).

Copy your Firebase config and paste it into src/firebase.js.

Run the development server

bash
Copy code
npm run serve
Build for production

bash
Copy code
npm run build
📊 Screenshots (optional)
Add screenshots or GIFs of your app UI here.

🌱 Future Enhancements
Export data to CSV/Excel

Support for multiple currencies

Add recurring transactions

Dark mode toggle

📜 License
This project is open source and available under the MIT License.

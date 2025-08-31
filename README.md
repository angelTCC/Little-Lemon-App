
# 🍋 Little Lemon App

<p align="center">
  <img src='https://shields.io/badge/supabase-black?logo=supabase'/>
  <img src='https://img.shields.io/badge/SQLite-003B57?logo=SQLite' />
  <img src='https://img.shields.io/badge/Expo-000000?&logo=Expo&logoColor=white' />
  <img src='https://img.shields.io/badge/-React_Native-05122A?logo=react&logoColor=61DAFB' />
</p>

A mobile app for the restaurant Little Lemon. In this app, you can register and can browse the menu and discover the dishes that interest you most. The app includes filters to help you find what you like—for example, starters, mains, desserts, or drinks. You can also search by typing keywords in a bar.

At the moment, the app only lets you view the dishes and their prices. Soon, we will add features to place orders directly from the app and provide more detailed information about each dish, such as calories and ingredients.

To preview the app on your phone, follow these steps:

1. Download the **Expo Go** app on your phone.  
2. Scan the QR code below **or click the link** to see the QR in your browser:

<p align="center">
  <a>
    <img src="qr-app.svg" width="30%" alt="QR code to preview the app">
  </a>
</p>

<p align="center">
  Or open this link in your phone:  
  <a href="https://expo.dev/preview/update?message=%20end%20project%202&updateRuntimeVersion=1.0.0&createdAt=2025-06-26T15%3A30%3A12.343Z&slug=exp&projectId=990db8ea-645e-4f1d-ae6f-d1223e75ff80&group=fda8048a-a8ae-4339-9f24-b25850892a1f" target="_blank">
    Open in Web
  </a>
</p>

<p align='center'>
<img src="project.png" alt="Little Lemon Logo" width="80%" />
</p>

## ⚙️ Installation & Setup

Follow these steps to get the project running locally:

1. Install Node.js and npm
2. Install Expo CLI  
   ```bash
   npm install -g expo-cli
3. Clone the repository
4. Inside the project folder
    ```bash
    npm install
    ```
5. Run the project
    ```
    npx expo start
    ```

## ✨ Features

- 🔐 User authentication system (name + email)
- 📋 Home screen with full menu (from API)
- 🧠 Filter by category
- 💾 Local database with SQLite
- 🔍 Search by keyword

## 🚧 Upcoming Features

- 👤 **Personalized Profiles with Supabase**: Users will soon be able to update and manage their personal information (name, username, preferences) stored securely in Supabase. Currently, the profile UI is available, but editing functionality is under development.  
- 🛒 **Order Online**: Place orders directly from the app with a smooth checkout experience.  
- 📦 **Publish to Google Play & App Store**: Use **EAS Build** and **EAS Submit** to generate production-ready APK and IPA files for wider public access.


## 🧑‍💻 Author

Made by [Angel Chaico](https://github.com/angelchaico).


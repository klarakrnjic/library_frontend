# Library Frontend (Expo/React Native)

Mobile app for managing a library. The frontend is built with Expo/React Native and communicates with the backend service via a REST API.

**Technologies**
- Expo SDK 50
- React Native 0.73
- React 18
- React Navigation (native stack)
- Axios

**Requirements**
- Node.js (recommended 18+)
- npm or yarn
- Expo CLI (`npm i -g expo-cli`) or use `npx expo`

**Installation**
```bash
cd library_frontend
npm install
```

**Running**
```bash
npm run start
```

Options:
- `npm run android` - runs the app on an Android emulator/device
- `npm run ios` - runs the app on an iOS simulator (macOS)

**Backend configuration**
The API base URL is defined in `library_frontend/config/ApiClient.js`:
```
const API_BASE_URL = 'http://localhost:8080/api/books';
```
If the backend is not running on `localhost:8080`, update this value to match your environment (e.g., the computer's IP address on your local network).

**Project structure (short)**
- `App.js` - entry point, global context, and navigation
- `navigation/` - stack navigation definitions
- `screens/` - app screens
- `config/ApiClient.js` - Axios client and base URL

**Note**
If you run the app on a physical device, `localhost` refers to the device itself, not your computer. In that case, set `API_BASE_URL` to the IP address of the machine running the backend.

# ExpressNews - Stay Informed, Stay Ahead – Your News, Your Way! (ExpressJS + React Native)

ExpressNews is a news app where users can read the latest news.

--- 

## Project Overview

- **Backend**: Express 4.19.2
    - **Database**: MongoDB
    - **Caching**: Redis
    - **Message Broker**: RabbitMQ
- **Frontend**: React Native

## Installation & Setup

### Backend

1. Create your own .env file in backend folder. It should look like this:
```env
DATABASE_URL=mongodb://mongodb:27017/ExpressNews # -> It's an original url for docker-compose.
SESSIONS_SECRET= <YOUR_SESSIONS_SECRET_KEY>
REDIS_URL=redis://redis:6379 # -> It's an original url for docker-compose.
JWT_SECRET= <YOUR_JWT_SECRET_CODE>
EMAIL= <YOUR_GMAIL_FOR_EMAIL_MESSAGES>
PASSWORD=<YOUR_PASSWORD_FOR_EMAIL_MESSAGES>
PORT=8000
BASIC_URL=/api/v1
RABITMQ_URL=amqp://user:password@localhost:5672 # -> It's an original url for docker-compose.
NEWS_API_KEY= <YOUR_NEWSAPI_API_KEY>
RABBITMQ_USER=user # -> It's an original credentials for docker-compose.
RABBITMQ_PASSWORD=password # -> It's an original credentials for docker-compose.
```
2. Make sure you have Docker and docker-compose installed.
3. Run the following commands from the project root:
  ```bash
  cd backend
  docker compose up
  ```
4. Backend is ready.

### Frontend

1. Make sure you have `yarn` and `Expo CLI v51` installed.
2. Install the dependencies:
  ```bash
  cd front-end
  yarn add expo@51
  yarn install
  ```
3. Add .env file in frontend folder. It should look like this:
```env
GOOGLE_WEBCLIENT_ID = <YOUR_GOOGLE_WEBCLIENT_ID>
GOOGLE_IOSCLIENT_ID= <YOUR_GOOGLE_IOS_CLIENT_ID>
GOOGLE_CLIENT_SECRET= <YOUR_GOOGLE_CLIENT_SECRET>

SERVER_URL = 'http://localhost:8000/api/v1/' # -> Or any server you've configured.
```
4. Run this command in your console (you need to have your emulator or device available):
```bash
npx expo run:ios
```
5. Frontend is ready.


### Important Notices

- The project is for iOS users only. The project was tested on MacOS's iOS emulator.
- Backend uses free tier of NewsAPI, which means it has limited number of calls. I configured my fetching file to have limited calls for the sake of having sample data
- Prebuild command in frontend is needed to ensure google authorization works as needed.
- Backend API documentation URI: `/api-docs/`. It is Swagger Docs.
---

## Screenshots
<img src="https://github.com/user-attachments/assets/ac0ca71e-466a-4757-b17d-316a79d3eb58" width="300" height="650"/>
<img src="https://github.com/user-attachments/assets/64125a84-998c-4b71-9b17-d52bb87a109e" width="300" height="650" />

**Disclaimer:** A design template was used for visual inspiration only and was applied solely for educational purposes.
The template url: https://www.visily.ai/templates/news-app/

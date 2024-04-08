# tuf-2000-ui

Recommended use: Laptop or similar display. If used on smartphone, the functionality is better when used in landscape orientation.

Background and short technical description.
The app shows TUF-2000M measurement data. The data is mock data created with a python script and uploaded with the python script to firebase database. The data is stored in JSON format in the database. The app fetches the data of the chosen timestamp and shows the data to the user. The app is a NextJS app and is deployed in Vercel. Currently the app does not have authentication, so please use discretion in not passing the link to the app to prevent unauthorized use.

Short guide.

Starting the app
Navigate to https://tuf-2000-ui.vercel.app/ with your chosen device.

Start with the Calendar
When launching the app, begin by selecting a date or a date range from the calendar view. This is your starting point to see the measurements.

Selecting Timestamps
A list of timestamp(s) will appear in the sidebar. Tap on any timestamp to view the TUF-2000M measurement data in the main display area. The data is stored in cloud database and the data can not be modified from the app. You can scroll down the timestamp window.

Toggling Calendar View
Iif you choose to use smartphone to view the data, you should toggle the calendar off after choosing a date (or date range) to view the data. Use the "Show Calendar" or "Hide Calendar" button to manage its visibility according to your browsing needs.

Viewing Data
The data display shows data for the selected timestamp: including metrics like

- register number
- variable name,
- measurement value
- unit of measure

Adjusting Font Size
Use the "A+" and "A-" buttons at the top to adjust the font size in the data display area.-
Clearing Calendar Dates
The Clear calendar dates" button allows you to reset your date range selection to the current date with a quick way to start selection.

Navigating Data Rows
Separate measurement data rows alternate in shades of grey, making it easier to distinguish between different sets of information at a glance. You can scroll down the data window.

Design and architectural choices overview:
The application is built with Next.js and deployed on Vercel, presents TUF-2000M mock measurement data from stored in JSON format in Firebase Firestore. It uses React's Context API for global state management: sharing of user-selected data and fetched results without prop drilling. Local component states are managed with useState, and effects like API calls are handled with useEffect.

A custom hook abstracts API requests for data fetching and centralizes the logic to retrieve data. UX is designed for intuitive use. The UI is responsive adapting to various devices and orientations.

Firebase Firestore serves as the backend: chosen for scalability and ease of integration. Serverless functions in Next.js abstract direct database access, enhancing security. The architecture supports client-side rendering for dynamic content.

The application emphasizes modular design, separating concerns for maintainability and scalability. The app does not yet have authentication: Potential for future enhancement to secure access and data.

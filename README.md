
# EcoTech - Currently In Development

EcoTech began as a United Nations NGO Hackathon project with the mission of promoting responsible electronic waste (e-waste) recycling. While the initial version was not completed before the hackathon deadline, the project has since been completely rebuilt with a stronger foundation and enhanced functionality.



## Features

	•	🌍 Certified Recycling Center Locator – Connects users with verified e-waste recycling centers.
	•	📚 Educational Resources – Offers guides and information on responsible e-waste disposal.
	•	🏢 Business & Individual Tools – Helps businesses and individuals manage electronic waste efficiently.
	•	🔄 Sustainable Disposal Solutions – Encourages environmentally friendly recycling practices.

## Screenshots

![EcoTech Screenshot](./public/assets/screenshot.png)


## Tech Stack

- **Frontend**: React, React-Bootstrap
- **Routing**: React Router
- **Icons**: FontAwesome
- **Backend**: Java, Springboot
- **Maps & Geolocation**: HERE Maps API
- **Styling**: Custom CSS

## Installation

Frontend Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/xjohnsondev/EcoTech.git

2.	Navigate to the project directory:
    ```bash
    cd un-frontend

3. Install the dependencies:
    ```bash
    npm install

4. Run the development server:
    ```bash
    npm start

Backend Setup Instructions

1.	Navigate to the project directory:
    ```bash
    cd ewaste_backend

2. 	Setup environmantal variables:
    ```bash
    •   Create an .env file in the backend directory.
	•	Add necessary configurations such as database credentials, API keys, and authentication secrets.

3. Install the dependencies:
    ```bash
    ./mvnw clean install

4. Run the backend server:
    ```bash
    ./mvnw spring-boot:run

5. Verify the server is running:
    ```bash
    The API should be available at http://localhost:8080.

Alternatively - Launch IntelliJ, navigate to **src/EwasteBackendApplication**, Press Run.

## Contributing

Contributions are welcome! If you'd like to improve EcoTech, feel free to submit a pull request.


## License

[MIT](https://choosealicense.com/licenses/mit/)


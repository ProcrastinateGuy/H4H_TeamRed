# Ally - Secure Health Data Management for STD Patients

## Inspiration

Ally was created to address the growing need for a **confidential, secure, and accessible platform** for individuals seeking information and support related to sexually transmitted diseases (STDs). Our goal is to empower users by offering health tracking, appointment management, and resource guidance—without compromising their privacy.

## What It Does

Ally helps potential STD patients in the following ways:

- **Health Condition Tracking**: Patients can monitor their symptoms, test results, and medications.
- **Confidential Health Suggestions**: Ally offers personalized guidance based on the patient’s input, helping them make informed health decisions.
- **Appointment Management**: Users can schedule, track, and get reminders for medical appointments to ensure they stay on top of their care.
- **Secure Document Vault**: All sensitive health documents, including test results and medical records, are stored in a secure, encrypted vault for safe retrieval.
- **Resource Locator**: Ally helps users find local clinics, doctors, and support resources to get the help they need.

## How We Built It

### Backend: FastAPI  
The backend was built using **FastAPI**, a high-performance framework that allows us to handle user requests quickly and securely. We use **AES encryption** to secure sensitive data and **RSA encryption** to secure the encryption keys.

- **AES Encryption**: Used to encrypt patient files and sensitive health data. 
- **RSA Encryption**: Used to encrypt the AES encryption key, ensuring that even if an attacker gains access to the encrypted data, they cannot decrypt it without the private RSA key.
- **Data Deletion**: After encryption, the original unencrypted files are **deleted** to add an extra layer of security, reducing the risk of data compromise.

### Frontend: React  
The frontend is built with **React**, ensuring an intuitive and user-friendly interface for our users. It allows easy access to features such as appointments, test records, and the document vault.

### Key Features:
- **Appointments**: Schedule, manage, and track medical appointments, with automated reminders.
- **Test Records**: Track test results and record the status of health checks.
- **Timeline**: View a timeline of health events, appointments, and test results for a comprehensive overview.
- **Resource Locator**: Find local clinics, STD testing centers, and healthcare providers with ease.
- **Document Vault**: Securely store and access encrypted health documents like test results and medical records.

## Challenges We Ran Into

- **Ensuring Data Privacy and Security**: Encrypting sensitive health data using AES and securely managing RSA keys posed a significant challenge. We needed to make sure that all patient data is protected at rest and during transfer.
- **User Accessibility**: Designing a platform that is both secure and easy to use for people of all technical skill levels was crucial. We had to balance between security measures and user experience.
- **Integrating Health Data**: Finding reliable and up-to-date sources of STD-related health information that users can trust was essential.

## Accomplishments We’re Proud Of

- **Robust Encryption**: We successfully implemented AES and RSA encryption, ensuring that all sensitive patient data is protected at multiple levels.
- **Confidentiality**: By deleting unencrypted files after encryption, we are adding an extra layer of security to protect users from data breaches.
- **User-Centric Design**: Ally is designed with user-friendliness in mind. We ensured that individuals who may not be tech-savvy can still navigate the platform with ease.
- **End-to-End Solution**: Ally provides a comprehensive solution for managing health data, making it easier for patients to stay informed and on top of their care.

## What We Learned

- **Encryption and Security Best Practices**: Implementing AES and RSA taught us the importance of strong encryption in healthcare applications. Securing sensitive data is essential to maintaining trust.
- **User Experience in Sensitive Contexts**: We learned how to design platforms that cater to sensitive user needs. Empathy plays a key role in providing support for individuals dealing with potentially stigmatizing health issues.
- **Scalability and Performance**: FastAPI enabled us to scale the application to handle multiple user requests efficiently, while React allowed us to create an intuitive and responsive frontend.

## What's Next for Ally

- **Sharding Document Files**: To enhance performance and scalability, we plan to shard document files, ensuring efficient storage and retrieval of sensitive health data.
- **Multi-Language Support**: We will add language options depending on the user's region to ensure that everyone can access health resources in their preferred language.
- **Scraping for Updates**: We plan to scrape trusted medical sources to keep the health resources section up-to-date with the latest STD-related information.
- **Mobile App**: The next step is to develop a **mobile app** using Flutter so users can access their health records and appointment schedules on the go.

## Technologies Used
- **Backend**: FastAPI, Python
- **Frontend**: React
- **Encryption**: AES, RSA
- **Storage**: Secure cloud-based storage for health data
- **Authentication**: OAuth or custom authentication for user security
message.txt
6 KB

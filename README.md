🧾 Customer Management Dashboard
A full-stack customer management system with image upload support, built using ASP.NET Core 8, PostgreSQL, and React (TypeScript).


🔧 Backend

Framework: ASP.NET Core 8

Database: PostgreSQL

API: RESTful endpoints for customer CRUD operations and image upload

Architecture: Modular service-based design using Entity Framework Core


🎨 Frontend

Framework: React (TypeScript)

State Management: Redux Toolkit

Form Handling: React Hook Form

Routing: React Router

UI Library: React Bootstrap


📋 Key Features

Add Customer Create new customer records with form validation.

Edit Customer Inline or modal-based editing of customer details.

Delete Customer Confirmation-based deletion with state and backend sync.

Add Images Upload and preview customer-specific images using base64 encoding.


🖥️ Demo Page Overview

Displays a list of customers with action buttons: Edit, Delete, Add Image

Image upload section with preview support

Responsive layout styled with Bootstrap components

Feel free to copy and paste this into your README.md. If you want to add badges, screenshots, or setup instructions, I can help format those too!




⚙️ Getting Started

Update the Connection String Open appsettings.json and replace the default connection string with your PostgreSQL database credentials.

Apply Migrations Run the following command in the Package Manager Console to apply Entity Framework migrations: Update-Database

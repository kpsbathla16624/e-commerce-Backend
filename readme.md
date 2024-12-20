# E-commerce Backend API Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Routes](#routes)
    - [User Routes](#user-routes)
    - [Product Routes](#product-routes)
    - [Order Routes](#order-routes)
3. [Sample Data](#sample-data)

## Introduction
This document provides an overview of the API routes for the e-commerce backend, including sample data and explanations for each route.

## Routes

### User Routes
- **POST /api/users/register**
  - Registers a new user.
  - **Sample Request:**
    ```json
    {
      "username": "john_doe",
      "email": "john@example.com",
      "password": "securepassword123"
    }
    ```
  - **Sample Response:**
    ```json
    {
      "message": "User registered successfully",
      "userId": "12345"
    }
    ```

- **POST /api/users/login**
  - Authenticates a user.
  - **Sample Request:**
    ```json
    {
      "email": "john@example.com",
      "password": "securepassword123"
    }
    ```
  - **Sample Response:**
    ```json
    {
      "message": "Login successful",
      "token": "jwt-token"
    }
    ```

### Product Routes
- **GET /api/products**
  - Retrieves a list of all products.
  - **Sample Response:**
    ```json
    [
      {
        "id": "1",
        "name": "Product 1",
        "price": 29.99,
        "description": "Description of Product 1"
      },
      {
        "id": "2",
        "name": "Product 2",
        "price": 49.99,
        "description": "Description of Product 2"
      }
    ]
    ```

- **POST /api/products**
  - Adds a new product (Admin only).
  - **Sample Request:**
    ```json
    {
      "name": "New Product",
      "price": 39.99,
      "description": "Description of the new product"
    }
    ```
  - **Sample Response:**
    ```json
    {
      "message": "Product added successfully",
      "productId": "3"
    }
    ```

### Order Routes
- **POST /api/orders**
  - Creates a new order.
  - **Sample Request:**
    ```json
    {
      "userId": "12345",
      "products": [
        {
          "productId": "1",
          "quantity": 2
        },
        {
          "productId": "2",
          "quantity": 1
        }
      ],
      "totalPrice": 109.97
    }
    ```
  - **Sample Response:**
    ```json
    {
      "message": "Order created successfully",
      "orderId": "67890"
    }
    ```

## Sample Data
- **Users:**
  ```json
  [
    {
      "id": "12345",
      "username": "john_doe",
      "email": "john@example.com",
      "password": "hashedpassword"
    }
  ]
  ```

- **Products:**
  ```json
  [
    {
      "id": "1",
      "name": "Product 1",
      "price": 29.99,
      "description": "Description of Product 1"
    },
    {
      "id": "2",
      "name": "Product 2",
      "price": 49.99,
      "description": "Description of Product 2"
    }
  ]
  ```

- **Orders:**
  ```json
  [
    {
      "id": "67890",
      "userId": "12345",
      "products": [
        {
          "productId": "1",
          "quantity": 2
        },
        {
          "productId": "2",
          "quantity": 1
        }
      ],
      "totalPrice": 109.97
    }
  ]
  ```
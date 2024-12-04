# Courier Management System

The **Courier Management System** is a web application designed to efficiently manage and organize package details using advanced sorting and search algorithms. This system leverages `Merge Sort` for initial data organization and `Binary Search` for efficient data insertion, ensuring scalability and high performance.

---

## Features

1. **Package Management**: Add package details such as recipient name, package ID, weight, and delivery address.
2. **Real-time Validation**: Form inputs are validated to ensure data accuracy and consistency.
3. **Efficient Algorithms**:
   - **Merge Sort**: Ensures the package data is always ordered for optimal search and insertion performance.
   - **Binary Search**: Quickly determines the appropriate index to insert new data.
4. **Tracking Code Generator**: A unique tracking code is generated for each package using bitwise operations.
5. **Dynamic Table Updates**: Packages are displayed dynamically in a table, sorted by weight in ascending order.

---

## Installation and Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/crilver/Courier-Management-System.git
   cd courier-management-system

2. Open the `index.html` file in any modern web browser to run the application locally.

---

## Usage

### Validation Rules
- **Recipient Name**: Alphabetic characters and spaces only.
- **Package ID**: Positive numeric value (no leading zeros).
- **Weight**: Positive numeric value greater than 0.
- **Delivery Address**: Must contain at least one number and valid characters.

Errors are displayed if inputs do not meet the specified criteria.

---

## Algorithms Used

1. **Merge Sort**
Merge Sort is implemented to order package data during initialization, ensuring the system can handle large datasets efficiently. This divide-and-conquer algorithm splits data into smaller chunks, sorts them, and merges them back in order.

2. **Binary Search**
Binary Search is utilized to find the correct index for inserting a new package into the sorted list. It significantly reduces the time complexity compared to a linear search, especially for large datasets.

---

## Future Improvements

- Implement a backend API for persistent data storage.
- Add search functionality to filter packages by recipient name or tracking code.
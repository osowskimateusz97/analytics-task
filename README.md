# Analytics Project

This is a recruitment project that processes data and presents it in a human-readable format through charts and graphs.

## Prerequisites

Ensure you have Node.js and npm installed on your system.

## Running the Application

1. Install dependencies:

   ```bash
   npm i
   ```

2. Run the development server:
   ```bash
   npm start
   ```

## UI Layer

For rendering UI we use React along with [Shadcn](https://ui.shadcn.com/) and [Tailwind](https://tailwindcss.com/).

Shadcn is perfect library for creating MVPs, it gives a lot of reusable components which are fully customizable.

## Cache Strategy

**React Query**: This project uses [React Query](https://tanstack.com/query/latest/docs/framework/react/overview) for data fetching. Every time a request is made, it is stored in a memory cache. This improves performance, especially crucial in handling large volumes of data typical in analytics.

## Validating Data

**Zod**: A library used for data validation. It's crucial to validate data before display. If there are any changes in the data schema that we are not aware of, the correct error message should be displayed. This layer aids in debugging errors. Learn more about Zod [here](https://zod.dev/).

## TODO

1. Add tables which will help users track orders and sales.
2. Integrate a dashboard metric showing the percent increase in sales and orders compared to the previous 30 days.
3. Add unit & integration tests for the existing implementation.

## Available Commands

- `npm start` - Run the application in development mode.
- `npm build` - Build the project.
- `npm preview` - Preview the built project.
